/**
 * Netlify Edge Function — OG meta tagi dla social media botów
 *
 * Problem: Facebook, Messenger i inne boty NIE wykonują JavaScriptu,
 * więc react-helmet nie działa. Ta funkcja wykrywa boty po User-Agent
 * i zwraca im minimalne HTML z OG tagami.
 *
 * - /kawy/:handle  → dynamiczne OG z Shopify (tytuł, opis, zdjęcie produktu)
 * - Strony statyczne → predefiniowane OG tagi per strona
 * - Pliki statyczne / zwykli użytkownicy → passthrough (SPA obsługuje normalnie)
 *
 * Pokrywa: Facebook, Messenger, WhatsApp, Telegram, Twitter/X,
 * LinkedIn, Slack, Discord, iMessage, Pinterest.
 */

const SOCIAL_BOT_RE =
    /facebookexternalhit|Facebot|Twitterbot|WhatsApp|TelegramBot|LinkedInBot|Slackbot|Discordbot|Pinterest|Applebot/i;

const SITE_NAME = 'Strzykawa Coffee Shop';
const SITE_URL = 'https://strzykawa.com';
const OG_IMAGE = `${SITE_URL}/og-image.png`;
const OG_ICON = `${SITE_URL}/og-icon.png`;
const FALLBACK_DESC = 'Specialty coffee z Strzykawa Coffee Shop & Roastery, Częstochowa.';

// Predefiniowane OG tagi dla stron statycznych
const STATIC_PAGES = {
    '/': {
        title: 'Strzykawa – Palarnia Kawy i Kawiarnia Specialty Coffee Częstochowa',
        description:
            'Strzykawa — palarnia kawy i kawiarnia specialty coffee w centrum Częstochowy. Świeżo palona kawa z najlepszych ziaren. Odwiedź nas na ul. Dąbrowskiego 4.',
        image: OG_IMAGE,
    },
    '/kawy': {
        title: 'Sklep z kawą | Strzykawa — Palarnia Kawy Częstochowa',
        description:
            'Świeżo palona kawa specialty. 100% Arabica z najlepszych plantacji. Zamów online z dostawą pod drzwi.',
        image: OG_IMAGE,
    },
    '/o-nas': {
        title: 'O nas | Strzykawa — Palarnia Kawy Częstochowa',
        description:
            'Poznaj historię Strzykawa — palarni kawy i kawiarni specialty coffee w centrum Częstochowy.',
        image: OG_IMAGE,
    },
    '/kontakt': {
        title: 'Kontakt | Strzykawa — Palarnia Kawy Częstochowa',
        description:
            'Skontaktuj się z nami. Kawiarnia: ul. Dąbrowskiego 4, Częstochowa. Email: kontakt@strzykawa.com',
        image: OG_IMAGE,
    },
    '/b2b': {
        title: 'B2B | Strzykawa — Kawa dla firm i gastronomii',
        description:
            'Oferta kawy specialty dla firm, restauracji i kawiarni. Świeżo palona kawa z dostawą.',
        image: OG_IMAGE,
    },
};

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

function buildHtml({ title, description, imageUrl, imageWidth, imageHeight, pageUrl, type }) {
    const t   = escapeHtml(title);
    const d   = escapeHtml(description);
    const img = escapeHtml(imageUrl);
    const u   = escapeHtml(pageUrl);

    return `<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <title>${t}</title>
    <meta property="og:type" content="${type}" />
    <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />
    <meta property="og:locale" content="pl_PL" />
    <meta property="og:url" content="${u}" />
    <meta property="og:title" content="${t}" />
    <meta property="og:description" content="${d}" />
    <meta property="og:image" content="${img}" />
    <meta property="og:image:secure_url" content="${img}" />
    ${imageWidth ? `<meta property="og:image:width" content="${imageWidth}" />` : ''}
    ${imageHeight ? `<meta property="og:image:height" content="${imageHeight}" />` : ''}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${t}" />
    <meta name="twitter:description" content="${d}" />
    <meta name="twitter:image" content="${img}" />
    <meta http-equiv="refresh" content="0;url=${u}" />
</head>
<body>
    <p><a href="${u}">${t}</a></p>
</body>
</html>`;
}

export default async function handler(request, _context) {
    const userAgent = request.headers.get('user-agent') || '';

    // Przepuść zwykłych użytkowników — SPA obsługuje ich normalnie
    if (!SOCIAL_BOT_RE.test(userAgent)) {
        return;
    }

    const url = new URL(request.url);
    const pathname = url.pathname;
    const pageUrl = `${SITE_URL}${pathname}`;

    // ── Produkty /kawy/:handle ── dynamiczne OG z Shopify ──────────────────
    const productMatch = pathname.match(/^\/kawy\/([^/]+)\/?$/);
    if (productMatch) {
        const handle = productMatch[1];
        const shopifyDomain = Deno.env.get('VITE_SHOPIFY_DOMAIN');
        const shopifyToken = Deno.env.get('VITE_SHOPIFY_STOREFRONT_TOKEN');

        if (!shopifyDomain || !shopifyToken) return;

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

            if (!product) return;

            const imageNode = product.images?.edges?.[0]?.node;

            const html = buildHtml({
                title: `${product.title} | ${SITE_NAME} & Roastery`,
                description:
                    stripHtml(product.description || '').slice(0, 200) || FALLBACK_DESC,
                imageUrl: imageNode?.url || OG_IMAGE,
                imageWidth: imageNode?.width,
                imageHeight: imageNode?.height,
                pageUrl,
                type: 'product',
            });

            return new Response(html, {
                status: 200,
                headers: { 'Content-Type': 'text/html; charset=utf-8' },
            });
        } catch {
            return;
        }
    }

    // ── Strony statyczne ── predefiniowane OG tagi ──────────────────────────
    const staticPage = STATIC_PAGES[pathname];
    if (staticPage) {
        const html = buildHtml({
            title: staticPage.title,
            description: staticPage.description,
            imageUrl: staticPage.image,
            imageWidth: 1200,
            imageHeight: 630,
            pageUrl,
            type: 'website',
        });

        return new Response(html, {
            status: 200,
            headers: { 'Content-Type': 'text/html; charset=utf-8' },
        });
    }

    // Inne ścieżki — przepuść do SPA
    return;
}

export const config = {
    path: '/*',
    excludedPath: [
        '/assets/*',
        '/logo/*',
        '/icons/*',
        '/*.js',
        '/*.css',
        '/*.png',
        '/*.jpg',
        '/*.jpeg',
        '/*.svg',
        '/*.ico',
        '/*.woff',
        '/*.woff2',
        '/*.webp',
        '/sitemap.xml',
        '/robots.txt',
        '/manifest.json',
        '/favicon*',
    ],
};
