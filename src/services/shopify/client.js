/**
 * Shopify API Client - Core
 * Handles authentication and GraphQL requests
 */

class ShopifyClient {
    constructor() {
        this.domain = import.meta.env.VITE_SHOPIFY_DOMAIN;
        this.storefrontToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
        this.apiUrl = `https://${this.domain}/api/2023-10/graphql.json`;

        if (!this.domain || !this.storefrontToken) {
            console.warn('⚠️ Shopify credentials not found. Using mock data.');
            this.useMockData = true;
        } else {
            console.log('✅ Shopify client initialized');
        }
    }

    /**
     * Execute GraphQL query/mutation
     * @param {string} query - GraphQL query
     * @param {object} variables - Query variables
     * @returns {Promise<object>} Response data
     */
    async graphqlFetch(query, variables = {}) {
        if (this.useMockData) {
            throw new Error('Mock mode - use getMockResponse from mocks.js');
        }

        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Storefront-Access-Token': this.storefrontToken,
                },
                body: JSON.stringify({ query, variables }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.errors) {
                console.error('GraphQL errors:', data.errors);
                throw new Error(data.errors[0]?.message || 'GraphQL error');
            }

            return data;
        } catch (error) {
            console.error('Shopify API error:', error);
            throw error;
        }
    }
}

export { ShopifyClient };
export default ShopifyClient;