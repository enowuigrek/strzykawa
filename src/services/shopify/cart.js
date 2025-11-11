/**
 * Shopify Cart API
 * Handles all cart operations (create, add, update, remove, get)
 */

// Fragment for cart line with attributes
const CART_LINE_FRAGMENT = `
    id
    quantity
    attributes {
        key
        value
    }
    merchandise {
        ... on ProductVariant {
            id
            title
            price {
                amount
                currencyCode
            }
            product {
                id
                handle
                title
                featuredImage {
                    url
                }
                images(first: 1) {
                    edges {
                        node {
                            url
                            altText
                        }
                    }
                }
            }
            image {
                url
            }
        }
    }
`;

// Fragment for cart response
const CART_FRAGMENT = `
    id
    checkoutUrl
    totalQuantity
    cost {
        totalAmount {
            amount
            currencyCode
        }
    }
    lines(first: 100) {
        edges {
            node {
                ${CART_LINE_FRAGMENT}
            }
        }
    }
`;

/**
 * Create new cart
 * @param {ShopifyClient} client - Shopify client instance
 * @returns {Promise<object>} Cart object
 */
export async function createCart(client) {
    const query = `
        mutation cartCreate($input: CartInput!) {
            cartCreate(input: $input) {
                cart {
                    ${CART_FRAGMENT}
                }
                userErrors {
                    field
                    message
                }
            }
        }
    `;

    const response = await client.graphqlFetch(query, {
        input: {
            lines: [],
            attributes: [
                { key: "source", value: "strzykawa-website" }
            ]
        }
    });

    if (response.data.cartCreate.userErrors.length > 0) {
        throw new Error(response.data.cartCreate.userErrors[0].message);
    }

    return response.data.cartCreate.cart;
}

/**
 * Add items to cart
 * @param {ShopifyClient} client - Shopify client instance
 * @param {string} cartId - Cart ID
 * @param {Array} lines - Line items to add
 * @returns {Promise<object>} Updated cart
 */
export async function addToCart(client, cartId, lines) {
    const query = `
        mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
            cartLinesAdd(cartId: $cartId, lines: $lines) {
                cart {
                    ${CART_FRAGMENT}
                }
                userErrors {
                    field
                    message
                }
            }
        }
    `;

    const response = await client.graphqlFetch(query, { cartId, lines });

    if (response.data.cartLinesAdd.userErrors.length > 0) {
        throw new Error(response.data.cartLinesAdd.userErrors[0].message);
    }

    return response.data.cartLinesAdd.cart;
}

/**
 * Update cart line quantities
 * @param {ShopifyClient} client - Shopify client instance
 * @param {string} cartId - Cart ID
 * @param {Array} lines - Lines to update
 * @returns {Promise<object>} Updated cart
 */
export async function updateCartLines(client, cartId, lines) {
    const query = `
        mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
            cartLinesUpdate(cartId: $cartId, lines: $lines) {
                cart {
                    ${CART_FRAGMENT}
                }
                userErrors {
                    field
                    message
                }
            }
        }
    `;

    const response = await client.graphqlFetch(query, { cartId, lines });

    if (response.data.cartLinesUpdate.userErrors.length > 0) {
        throw new Error(response.data.cartLinesUpdate.userErrors[0].message);
    }

    return response.data.cartLinesUpdate.cart;
}

/**
 * Remove items from cart
 * @param {ShopifyClient} client - Shopify client instance
 * @param {string} cartId - Cart ID
 * @param {Array} lineIds - Line item IDs to remove
 * @returns {Promise<object>} Updated cart
 */
export async function removeFromCart(client, cartId, lineIds) {
    const query = `
        mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
            cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
                cart {
                    ${CART_FRAGMENT}
                }
                userErrors {
                    field
                    message
                }
            }
        }
    `;

    const response = await client.graphqlFetch(query, { cartId, lineIds });

    if (response.data.cartLinesRemove.userErrors.length > 0) {
        throw new Error(response.data.cartLinesRemove.userErrors[0].message);
    }

    return response.data.cartLinesRemove.cart;
}

/**
 * Get cart by ID
 * @param {ShopifyClient} client - Shopify client instance
 * @param {string} cartId - Cart ID
 * @returns {Promise<object>} Cart object
 */
export async function getCart(client, cartId) {
    const query = `
        query getCart($cartId: ID!) {
            cart(id: $cartId) {
                ${CART_FRAGMENT}
            }
        }
    `;

    const response = await client.graphqlFetch(query, { cartId });
    return response.data.cart;
}