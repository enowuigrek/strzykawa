/**
 * panel-mark-picked-up.js — Netlify Function
 * Oznacza zamówienie jako odebrane przez dodanie tagu 'odebrano' w Shopify.
 *
 * POST body: { orderId: number }
 */

const SHOPIFY_API_VERSION = '2023-10';

function verifyAuth(event) {
    const authHeader = event.headers['authorization'] || event.headers['Authorization'] || '';
    const token = authHeader.replace('Bearer ', '').trim();
    return token === process.env.PANEL_PASSWORD;
}

exports.handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Authorization, Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json',
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
    }

    if (!verifyAuth(event)) {
        return { statusCode: 401, headers, body: JSON.stringify({ error: 'Unauthorized' }) };
    }

    const domain = process.env.SHOPIFY_DOMAIN;
    const token = process.env.SHOPIFY_ADMIN_API_TOKEN;

    if (!token || !domain) {
        return { statusCode: 500, headers, body: JSON.stringify({ error: 'Missing environment variables' }) };
    }

    let orderId;
    try {
        const body = JSON.parse(event.body || '{}');
        orderId = body.orderId;
    } catch {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON body' }) };
    }

    if (!orderId) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing orderId' }) };
    }

    try {
        // 1. Pobierz aktualne tagi zamówienia
        const getRes = await fetch(
            `https://${domain}/admin/api/${SHOPIFY_API_VERSION}/orders/${orderId}.json?fields=id,tags`,
            { headers: { 'X-Shopify-Access-Token': token } }
        );

        if (!getRes.ok) {
            throw new Error(`Failed to fetch order: ${getRes.status}`);
        }

        const { order } = await getRes.json();
        const currentTags = (order.tags || '').split(',').map((t) => t.trim()).filter(Boolean);

        // 2. Dodaj tag 'odebrano' jeśli jeszcze nie ma
        if (!currentTags.includes('odebrano')) {
            currentTags.push('odebrano');
        }

        // 3. Zaktualizuj zamówienie z nowym tagiem
        const putRes = await fetch(
            `https://${domain}/admin/api/${SHOPIFY_API_VERSION}/orders/${orderId}.json`,
            {
                method: 'PUT',
                headers: {
                    'X-Shopify-Access-Token': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ order: { id: orderId, tags: currentTags.join(', ') } }),
            }
        );

        if (!putRes.ok) {
            throw new Error(`Failed to update order: ${putRes.status}`);
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ success: true, orderId, tags: currentTags }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
