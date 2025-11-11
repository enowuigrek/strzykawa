/**
 * Shopify Mock Data
 * Used when Shopify credentials are not configured
 */

const mockCoffees = [
    {
        id: "gid://shopify/Product/1",
        handle: "espresso-house-blend",
        title: "Espresso House Blend",
        description: "Autorski blend pod espresso – słodycz czekolady, orzechowe body i śliwkowy finisz.",
        availableForSale: true,
        tags: ["espresso-grinders", "retail-shelf", "Espresso"],
        images: {
            edges: [{
                node: {
                    url: "/src/assets/coffee-placeholder.jpg",
                    altText: "Espresso House Blend"
                }
            }]
        },
        variants: {
            edges: [{
                node: {
                    id: "gid://shopify/ProductVariant/1",
                    title: "Default",
                    price: { amount: "24.99", currencyCode: "PLN" },
                    compareAtPrice: null,
                    availableForSale: true,
                    selectedOptions: [{ name: "Title", value: "Default" }]
                }
            }]
        },
        metafields: [
            { key: "country", value: "Brazylia", type: "single_line_text_field" },
            { key: "region", value: "Cerrado", type: "single_line_text_field" },
            { key: "roast_level", value: "Średni", type: "single_line_text_field" },
            { key: "roast_type", value: "Espresso", type: "single_line_text_field" },
            { key: "tasting_notes", value: "czekolada, orzech, śliwka", type: "single_line_text_field" },
            { key: "processing", value: "Natural", type: "single_line_text_field" }
        ]
    }
];

/**
 * Get mock response based on query type
 * @param {string} query - GraphQL query
 * @param {object} variables - Query variables
 * @returns {Promise<object>} Mock response
 */
export function getMockResponse(query, variables) {
    console.warn('⚠️ Using mock data - Shopify credentials not configured');

    // Mock products list
    if (query.includes('products')) {
        return Promise.resolve({
            data: {
                products: {
                    edges: mockCoffees.map(coffee => ({ node: coffee }))
                }
            }
        });
    }

    // Mock cart creation
    if (query.includes('cartCreate')) {
        return Promise.resolve({
            data: {
                cartCreate: {
                    cart: {
                        id: 'gid://shopify/Cart/mock-cart-id',
                        checkoutUrl: 'https://checkout.shopify.com/mock',
                        totalQuantity: 0,
                        cost: { totalAmount: { amount: "0.00", currencyCode: "PLN" } },
                        lines: { edges: [] }
                    },
                    userErrors: []
                }
            }
        });
    }

    // Default empty response
    return Promise.resolve({ data: {} });
}