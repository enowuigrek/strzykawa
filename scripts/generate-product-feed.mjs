/**
 * generate-product-feed.mjs
 * Generuje public/products.xml (Google Merchant Center / RSS 2.0)
 * automatycznie przy każdym buildzie.
 *
 * Uruchamiany: node scripts/generate-product-feed.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// Załaduj .env a potem .env.local jako nadpisanie (ten sam wzorzec co generate-sitemap.mjs)
dotenv.config({ path: path.join(ROOT, '.env') });
dotenv.config({ path: path.join(ROOT, '.env.local'), override: true });

const SITE_URL = 'https://strzykawa.com';
const BRAND = 'Strzykawa';
const SHOPIFY_DOMAIN = process.env.VITE_SHOPIFY_DOMAIN;
const SHOPIFY_TOKEN = process.env.VITE_SHOPIFY_STOREFRONT_TOKEN;

/**
 * Pobierz pełne dane produktów z Shopify Storefront API
 */
async function fetchProducts() {
    if (!SHOPIFY_DOMAIN || !SHOPIFY_TOKEN) {
        console.warn('⚠️  Brak VITE_SHOPIFY_DOMAIN lub VITE_SHOPIFY_STOREFRONT_TOKEN — generuję pusty feed.');
        return [];
    }

    const query = `
        query GetProductsForFeed($first: Int!) {
            products(first: $first) {
                edges {
                    node {
                        id
                        handle
                        title
                        description
                        availableForSale
                        images(first: 1) {
                            edges {
                                node {
                                    url
                                }
                            }
                        }
                        variants(first: 10) {
                            edges {
                                node {
                                    id
                                    title
                                    availableForSale
                                    price {
                                        amount
                                        currencyCode
                                    }
                                    selectedOptions {
                                        name
                                        value
                                    }
                                }
                            }
                        }
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
        body: JSON.stringify({ query, variables: { first: 250 } }),
    });

    if (!response.ok) {
        throw new Error(`Shopify API HTTP error: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
        throw new Error(`Shopify GraphQL error: ${data.errors[0]?.message}`);
    }

    return data.data.products.edges.map(({ node }) => node);
}

/**
 * Escaped XML — zapobiega złamaniu XML przez znaki specjalne w tytułach/opisach
 */
function xmlEscape(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

/**
 * Wyciągnij ID liczbowe z Shopify GID (gid://shopify/ProductVariant/12345 → 12345)
 */
function extractId(gid) {
    return gid ? gid.split('/').pop() : '';
}

/**
 * Buduj element <item> dla jednego wariantu produktu.
 * Każdy wariant to osobny wpis w feedzie — Google wymaga unikalnego g:id na wariant.
 */
function buildItem(product, variant) {
    const imageUrl = product.images?.edges?.[0]?.node?.url || '';
    const price = parseFloat(variant.price.amount).toFixed(2);
    const currency = variant.price.currencyCode || 'PLN';
    const availability = variant.availableForSale ? 'in stock' : 'out of stock';

    // Buduj czytelny tytuł: "Nazwa produktu — wariant" (np. "Ethiopia Guji — 250g / Ziarna")
    const variantLabel = variant.title && variant.title !== 'Default Title' ? ` — ${variant.title}` : '';
    const title = xmlEscape(`${product.title}${variantLabel}`);

    // Unikalny ID: handle produktu + ID wariantu liczbowe
    const itemId = `${product.handle}-${extractId(variant.id)}`;

    // Link do strony produktu (bez wskazania na konkretny wariant — prostszy URL)
    const link = `${SITE_URL}/kawy/${product.handle}`;

    // Opis — pierwsze 500 znaków, bez pustego ciągu
    const description = xmlEscape((product.description || product.title).substring(0, 500));

    return `
    <item>
      <g:id>${xmlEscape(itemId)}</g:id>
      <g:title>${title}</g:title>
      <g:description>${description}</g:description>
      <g:link>${link}</g:link>
      ${imageUrl ? `<g:image_link>${xmlEscape(imageUrl)}</g:image_link>` : ''}
      <g:price>${price} ${currency}</g:price>
      <g:availability>${availability}</g:availability>
      <g:brand>${xmlEscape(BRAND)}</g:brand>
      <g:condition>new</g:condition>
    </item>`;
}

/**
 * Zbuduj pełny XML feed
 */
function buildFeed(products) {
    const items = [];

    for (const product of products) {
        const variants = product.variants?.edges?.map((e) => e.node) || [];

        if (variants.length === 0) continue;

        for (const variant of variants) {
            items.push(buildItem(product, variant));
        }
    }

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>${xmlEscape(BRAND)} — Świeżo palona kawa specialty</title>
    <link>${SITE_URL}</link>
    <description>Świeżo palona kawa specialty z Częstochowy.</description>
${items.join('\n')}
  </channel>
</rss>
`;
}

/**
 * Główna funkcja
 */
async function main() {
    console.log('📦 Generowanie product feed (Google Merchant Center)...');

    let products = [];

    try {
        products = await fetchProducts();
        console.log(`✅ Pobrano ${products.length} produktów z Shopify.`);
    } catch (err) {
        console.warn(`⚠️  Nie udało się pobrać produktów z Shopify: ${err.message}`);
        console.warn('⚠️  Feed zostanie wygenerowany jako pusty.');
    }

    const variantCount = products.reduce((sum, p) => sum + (p.variants?.edges?.length || 0), 0);
    const feed = buildFeed(products);
    const outputPath = path.join(ROOT, 'public', 'products.xml');

    fs.writeFileSync(outputPath, feed, 'utf-8');
    console.log(`✅ Zapisano: public/products.xml (${products.length} produktów, ${variantCount} wariantów)`);
}

main();
