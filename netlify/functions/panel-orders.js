/**
 * panel-orders.js — Netlify Function
 * Zwraca listę zamówień z Shopify Admin API dla wewnętrznego panelu kawiarni.
 * Obsługuje dwie zakładki: "odbior" (odbiór osobisty) i "wysylka" (kurier/paczkomat).
 *
 * Wymagane zmienne środowiskowe (Netlify dashboard):
 *   SHOPIFY_ADMIN_API_TOKEN — Admin API access token (read_orders + write_orders)
 *   SHOPIFY_DOMAIN          — np. bew92i-nu.myshopify.com
 *   PANEL_PASSWORD          — hasło dostępu do panelu
 */

const SHOPIFY_API_VERSION = '2023-10';

/**
 * Weryfikuje hasło z nagłówka Authorization: Bearer <password>
 */
function verifyAuth(event) {
    const authHeader = event.headers['authorization'] || event.headers['Authorization'] || '';
    const token = authHeader.replace('Bearer ', '').trim();
    return token === process.env.PANEL_PASSWORD;
}

/**
 * Pobiera zamówienia z Shopify Admin REST API
 * @param {string} tag - tag do filtrowania ('odbiór-osobisty' lub 'wysylka')
 */
async function fetchOrdersByTag(tag) {
    const domain = process.env.SHOPIFY_DOMAIN;
    const token = process.env.SHOPIFY_ADMIN_API_TOKEN;

    const url = `https://${domain}/admin/api/${SHOPIFY_API_VERSION}/orders.json?tag=${encodeURIComponent(tag)}&status=any&limit=50&order=created_at+desc`;

    const response = await fetch(url, {
        headers: {
            'X-Shopify-Access-Token': token,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Shopify API error ${response.status}: ${text}`);
    }

    const data = await response.json();
    return data.orders || [];
}

/**
 * Pobiera zamówienia BEZ konkretnego tagu (do zakładki "wysyłka" — bez tagu odbioru)
 * Filtruje zamówienia które NIE mają tagu 'odbiór-osobisty'
 */
async function fetchShippingOrders() {
    const domain = process.env.SHOPIFY_DOMAIN;
    const token = process.env.SHOPIFY_ADMIN_API_TOKEN;

    // Pobieramy ostatnie 100 zamówień i filtrujemy po stronie serwera
    const url = `https://${domain}/admin/api/${SHOPIFY_API_VERSION}/orders.json?status=any&limit=100&order=created_at+desc`;

    const response = await fetch(url, {
        headers: {
            'X-Shopify-Access-Token': token,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Shopify API error ${response.status}: ${text}`);
    }

    const data = await response.json();
    const orders = data.orders || [];

    // Filtruj: tylko zamówienia BEZ tagu 'odbiór-osobisty'
    return orders.filter((order) => {
        const tags = (order.tags || '').split(',').map((t) => t.trim());
        return !tags.includes('odbiór-osobisty');
    });
}

/**
 * Mapuje zamówienie Shopify na uproszczony obiekt dla panelu
 */
function mapOrder(order) {
    const tags = (order.tags || '').split(',').map((t) => t.trim());

    // Pobierz telefon klienta — z profilu lub z note_attributes
    const notePhone = (order.note_attributes || []).find((a) => a.name === 'customer_phone')?.value;
    const phone = order.customer?.phone || notePhone || order.billing_address?.phone || '—';

    // Adres dostawy
    const shipping = order.shipping_address;
    const shippingAddress = shipping
        ? `${shipping.address1}${shipping.address2 ? ' ' + shipping.address2 : ''}, ${shipping.zip} ${shipping.city}`
        : null;

    // Paczkomat (z note_attributes)
    const paczkomatName = (order.note_attributes || []).find((a) => a.name === 'paczkomat_name')?.value;
    const paczkomatCity = (order.note_attributes || []).find((a) => a.name === 'paczkomat_city')?.value;
    const paczkomatStreet = (order.note_attributes || []).find((a) => a.name === 'paczkomat_street')?.value;
    const deliveryMethod = (order.note_attributes || []).find((a) => a.name === 'delivery_method')?.value;

    // Produkty
    const items = (order.line_items || []).map((item) => ({
        title: item.title,
        variantTitle: item.variant_title && item.variant_title !== 'Default Title' ? item.variant_title : null,
        quantity: item.quantity,
        image: item.properties?.find((p) => p.name === '_image')?.value || null,
    }));

    return {
        id: order.id,
        orderNumber: order.order_number,
        createdAt: order.created_at,
        customerFirstName: order.customer?.first_name || order.billing_address?.first_name || '',
        customerLastName: order.customer?.last_name || order.billing_address?.last_name || '',
        phone,
        email: order.email || order.customer?.email || '',
        financialStatus: order.financial_status, // paid | pending | voided | refunded
        fulfillmentStatus: order.fulfillment_status, // fulfilled | null | partial
        totalPrice: parseFloat(order.total_price || 0),
        currency: order.currency || 'PLN',
        isPaid: order.financial_status === 'paid',
        isPickedUp: tags.includes('odebrano'),
        isShipped: tags.includes('wysłano'),
        shippingAddress,
        paczkomatName,
        paczkomatCity,
        paczkomatStreet,
        deliveryMethod,
        items,
        tags,
    };
}

// ===== HANDLER =====
exports.handler = async (event) => {
    // CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Authorization, Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Content-Type': 'application/json',
    };

    // Obsługa OPTIONS (preflight)
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    // Tylko GET
    if (event.httpMethod !== 'GET') {
        return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
    }

    // Weryfikacja hasła
    if (!verifyAuth(event)) {
        return { statusCode: 401, headers, body: JSON.stringify({ error: 'Unauthorized' }) };
    }

    // Sprawdź zmienne środowiskowe
    if (!process.env.SHOPIFY_ADMIN_API_TOKEN || !process.env.SHOPIFY_DOMAIN) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Missing environment variables' }),
        };
    }

    // Pobierz parametr zakładki: ?tab=odbior lub ?tab=wysylka
    const tab = event.queryStringParameters?.tab || 'odbior';

    try {
        let rawOrders;

        if (tab === 'odbior') {
            // Zakładka odbioru osobistego — zamówienia z tagiem 'odbiór-osobisty'
            rawOrders = await fetchOrdersByTag('odbiór-osobisty');
        } else {
            // Zakładka wysyłki — wszystkie pozostałe zamówienia
            rawOrders = await fetchShippingOrders();
        }

        const orders = rawOrders.map(mapOrder);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ orders, tab }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
