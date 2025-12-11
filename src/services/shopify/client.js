import { logger } from '../../utils/logger';

class ShopifyClient {
    constructor() {
        this.domain = import.meta.env.VITE_SHOPIFY_DOMAIN;
        this.storefrontToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
        this.apiUrl = `https://${this.domain}/api/2023-10/graphql.json`;

        if (!this.domain || !this.storefrontToken) {
            throw new Error(
                '❌ Shopify credentials not configured!\n' +
                'Check .env file and ensure VITE_SHOPIFY_DOMAIN and VITE_SHOPIFY_STOREFRONT_TOKEN are set.'
            );
        }

        logger.log('✅ Shopify client initialized');
    }

    /**
     * Execute GraphQL query/mutation
     * @param {string} query - GraphQL query
     * @param {object} variables - Query variables
     * @returns {Promise<object>} Response data
     */
    async graphqlFetch(query, variables = {}) {
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
                logger.error('GraphQL errors:', data.errors);
                throw new Error(data.errors[0]?.message || 'GraphQL error');
            }

            // Return the GraphQL data object (not the full response)
            return data.data ? { data: data.data } : data;
        } catch (error) {
            logger.error('Shopify API error:', error);
            throw error;
        }
    }
}

// Export class for direct instantiation
export { ShopifyClient };
export default ShopifyClient;

// Export singleton instance for convenience
export const shopifyClient = new ShopifyClient();