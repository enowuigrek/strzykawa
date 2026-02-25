/**
 * generate-sitemap.mjs
 * Generuje public/sitemap.xml automatycznie przy buildzie.
 * Pobiera produkty z Shopify Storefront API i łączy ze stronami statycznymi.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// Załaduj .env a potem .env.local jako nadpisanie
dotenv.config({ path: path.join(ROOT, '.env') });
dotenv.config({ path: path.join(ROOT, '.env.local'), override: true });

const SITE_URL = 'https://strzykawa.com';
const SHOPIFY_DOMAIN = process.env.VITE_SHOPIFY_DOMAIN;
const SHOPIFY_TOKEN = process.env.VITE_SHOPIFY_STOREFRONT_TOKEN;

// Strony statyczne
const STATIC_PAGES = [
    { loc: '/',                        changefreq: 'weekly',  priority: '1.0' },
    { loc: '/kawy',                    changefreq: 'daily',   priority: '0.9' },
    { loc: '/o-nas',                   changefreq: 'monthly', priority: '0.7' },
    { loc: '/kontakt',                 changefreq: 'monthly', priority: '0.6' },
    { loc: '/b2b',                     changefreq: 'monthly', priority: '0.5' },
    { loc: '/polityka-prywatnosci',    changefreq: 'yearly',  priority: '0.3' },
    { loc: '/polityka-cookies',        changefreq: 'yearly',  priority: '0.3' },
    { loc: '/regulamin',               changefreq: 'yearly',  priority: '0.3' },
];

/**
 * Pobierz wszystkie produkty z Shopify
 */
async function fetchProducts() {
    if (!SHOPIFY_DOMAIN || !SHOPIFY_TOKEN) {
        console.warn('⚠️  Brak VITE_SHOPIFY_DOMAIN lub VITE_SHOPIFY_STOREFRONT_TOKEN — pomijam produkty w sitemapie.');
        return [];
    }

    const query = `
        query {
            products(first: 250) {
                edges {
                    node {
                        handle
                        updatedAt
                    }
                }
            }
        }
    `;

    const response = await fetch(`https://${SHOPIFY_DOMAIN}/api/2023-10/graphql.json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': SHOPIFY_TOKEN,
        },
        body: JSON.stringify({ query }),
    });

    if (!response.ok) {
        throw new Error(`Shopify API HTTP error: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
        throw new Error(`Shopify GraphQL error: ${data.errors[0]?.message}`);
    }

    return data.data.products.edges.map(({ node }) => ({
        handle: node.handle,
        updatedAt: node.updatedAt,
    }));
}

/**
 * Formatuj datę do YYYY-MM-DD
 */
function formatDate(isoString) {
    return isoString.slice(0, 10);
}

/**
 * Generuj zawartość sitemap.xml
 */
function buildSitemap(products) {
    const staticUrls = STATIC_PAGES.map(
        ({ loc, changefreq, priority }) => `
  <url>
    <loc>${SITE_URL}${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    ).join('');

    const productUrls = products.map(
        ({ handle, updatedAt }) => `
  <url>
    <loc>${SITE_URL}/kawy/${handle}</loc>
    <lastmod>${formatDate(updatedAt)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    ).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${staticUrls}${productUrls}
</urlset>
`;
}

/**
 * Główna funkcja
 */
async function main() {
    console.log('🗺️  Generowanie sitemap.xml...');

    let products = [];

    try {
        products = await fetchProducts();
        console.log(`✅ Pobrano ${products.length} produktów z Shopify.`);
    } catch (err) {
        console.warn(`⚠️  Nie udało się pobrać produktów z Shopify: ${err.message}`);
        console.warn('⚠️  Sitemap zostanie wygenerowany tylko ze stronami statycznymi.');
    }

    const sitemap = buildSitemap(products);
    const outputPath = path.join(ROOT, 'public', 'sitemap.xml');

    fs.writeFileSync(outputPath, sitemap, 'utf-8');
    console.log(`✅ Zapisano: public/sitemap.xml (${STATIC_PAGES.length} stron statycznych + ${products.length} produktów)`);
}

main();
