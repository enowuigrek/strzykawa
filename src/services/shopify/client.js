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

        if (import.meta.env.DEV) {
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
                if (import.meta.env.DEV) {
                    console.error('GraphQL errors:', data.errors);
                }
                throw new Error(data.errors[0]?.message || 'GraphQL error');
            }

            return data;
        } catch (error) {
            if (import.meta.env.DEV) {
                console.error('Shopify API error:', error);
            }
            throw error;
        }
    }
}

export { ShopifyClient };
export default ShopifyClient;