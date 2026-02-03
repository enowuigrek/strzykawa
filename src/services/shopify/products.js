/**
 * Shopify Products API
 * Handles product fetching and queries
 */

import { logger } from '../../utils/logger';

const PRODUCT_FRAGMENT = `
    id
    handle
    title
    description
    availableForSale
    tags
    images(first: 10) {
        edges {
            node {
                url
                altText
            }
        }
    }
    variants(first: 10) {
        edges {
            node {
                id
                title
                price {
                    amount
                    currencyCode
                }
                compareAtPrice {
                    amount
                    currencyCode
                }
                availableForSale
                selectedOptions {
                    name
                    value
                }
            }
        }
    }
    metafields(identifiers: [
        {namespace: "custom", key: "kraj"}
        {namespace: "custom", key: "region"}
        {namespace: "custom", key: "odmiana"}
        {namespace: "custom", key: "obrobka"}
        {namespace: "custom", key: "profil_smakowy"}
        {namespace: "custom", key: "palenie"}
        {namespace: "custom", key: "stopien_palenia"}
        {namespace: "custom", key: "wysokosc"}
        {namespace: "custom", key: "farma"}
        {namespace: "custom", key: "gatunek"}
        {namespace: "custom", key: "producent"}
        {namespace: "custom", key: "forma_kawy"}
        {namespace: "custom", key: "rozmiar_mielenia"}
        {namespace: "custom", key: "kolor"}
    ]) {
        key
        value
        type
        namespace
    }
`;

/**
 * Fetch all products
 * @param {ShopifyClient} client - Shopify client instance
 * @param {function} mapProduct - Product mapper function
 * @param {number} limit - Max products to fetch
 * @returns {Promise<Array>} Mapped products
 */
export async function fetchProducts(client, mapProduct, limit = 20) {
    const query = `
        query GetProducts($first: Int!) {
            products(first: $first) {
                edges {
                    node {
                        ${PRODUCT_FRAGMENT}
                    }
                }
            }
        }
    `;

    try {
        const response = await client.graphqlFetch(query, { first: limit });

        const products = response.data.products.edges.map(edge => {
            try {
                return mapProduct(edge.node);
            } catch (error) {
                logger.error('❌ Error mapping product:', edge.node.title, error);
                return null;
            }
        }).filter(Boolean);
        return products;
    } catch (error) {
        logger.error('❌ Error fetching products:', error);
        throw error;
    }
}


/**
 * Fetch single product by handle
 * @param {ShopifyClient} client - Shopify client instance
 * @param {function} mapProduct - Product mapper function
 * @param {string} handle - Product handle (slug)
 * @returns {Promise<object|null>} Mapped product or null
 */
export async function fetchProduct(client, mapProduct, handle) {
    const query = `
        query GetProduct($handle: String!) {
            productByHandle(handle: $handle) {
                ${PRODUCT_FRAGMENT}
            }
        }
    `;

    const response = await client.graphqlFetch(query, { handle });
    return response.data.productByHandle ? mapProduct(response.data.productByHandle) : null;
}