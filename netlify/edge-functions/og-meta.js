/**
 * Netlify Edge Function — OG meta tagi dla social media botów
 *
 * Problem: Facebook, Messenger i inne boty NIE wykonują JavaScriptu,
 * więc react-helmet nie działa. Ta funkcja wykrywa boty po User-Agent
 * i zwraca im minimalne HTML z OG tagami pobranymi z Shopify.
 * Zwykli użytkownicy przechodzą bez zmian do normalnej SPA.
 *
 * Pokrywa: Facebook, Messenger, WhatsApp, Telegram, Twitter/X,
 * LinkedIn, Slack, Discord, iMessage, Pinterest.
 */

const SOCIAL_BOT_RE =
    /facebookexternalhit|Facebot|Twitterbot|WhatsApp|TelegramBot|LinkedInBot|Slackbot|Discordbot|Pinterest|Applebot/i;

const SITE_NAME = 'Strzykawa Coffee Shop';
const SITE_URL = 'https://strzykawa.com';
const FALLBACK_IMAGE = `${SITE_URL}/og-image.png`;
const FALLBACK_DESC = 'Specialty coffee z Strzykawa Coffee Shop & Roastery, Częstochowa.';

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function stripHtml(str) {
    return String(str).replace(/<[^>]*>/g, '').trim();
}

export default async function handler(request, _context) {
    const userAgent = request.headers.get('user-agent') || '';

    // Przepuść zwykłych użytkowników — SPA obsługuje ich normalnie
    if (!SOCIAL_BOT_RE.test(userAgent)) {
        return;
    }

    const url = new URL(request.url);
    const match = url.pathname.match(/^\/kawy\/([^/]+)\/?$/);

    if (!match) {
        return; // Nie strona produktu
    }

    const handle = match[1];
    const shopifyDomain = Deno.env.get('VITE_SHOPIFY_DOMAIN');
    const shopifyToken = Deno.env.get('VITE_SHOPIFY_STOREFRONT_TOKEN');

    if (!shopifyDomain || !shopifyToken) {
        return;
    }

    try {
        const res = await fetch(`https://${shopifyDomain}/api/2023-10/graphql.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': shopifyToken,
            },
            body: JSON.stringify({
                query: `
                    query GetProductOG($handle: String!) {
                        productByHandle(handle: $handle) {
                            title
                            description
                            images(first: 1) {
                                edges { node { url width height } }
                            }
                        }
                    }
                `,
                variables: { handle },
            }),
        });

        const data = await res.json();
        const product = data?.data?.productByHandle;

        if (!product) {
            return; // Produkt nie znaleziony — SPA pokaże 404
        }

        const pageUrl = `${SITE_URL}${url.pathname}`;
        const title = escapeHtml(`${product.title} | ${SITE_NAME} & Roastery`);
        const description = escapeHtml(
            stripHtml(product.description || '').slice(0, 200) || FALLBACK_DESC
        );
        const imageNode = product.images?.edges?.[0]?.node;
        // Shopify zwraca width/height w węźle — używamy jeśli dostępne
        const imageUrl = escapeHtml(imageNode?.url || FALLBACK_IMAGE);
        const imageWidth = imageNode?.width;
        const imageHeight = imageNode?.height;

        const html = `<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <title>${title}</title>
    <meta property="og:type" content="product" />
    <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />
    <meta property="og:locale" content="pl_PL" />
    <meta property="og:url" content="${escapeHtml(pageUrl)}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:image:secure_url" content="${imageUrl}" />
    ${imageWidth ? `<meta property="og:image:width" content="${imageWidth}" />` : ''}
    ${imageHeight ? `<meta property="og:image:height" content="${imageHeight}" />` : ''}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${imageUrl}" />
    <meta http-equiv="refresh" content="0;url=${escapeHtml(pageUrl)}" />
</head>
<body>
    <p><a href="${escapeHtml(pageUrl)}">${title}</a></p>
</body>
</html>`;

        return new Response(html, {
            status: 200,
            headers: { 'Content-Type': 'text/html; charset=utf-8' },
        });
    } catch {
        return; // Przy błędzie — SPA obsługuje normalnie
    }
}

export const config = {
    path: '/kawy/:handle',
};
