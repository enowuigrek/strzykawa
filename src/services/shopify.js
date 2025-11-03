// Shopify Storefront API v2023-10 integration
class ShopifyService {
    constructor() {
        this.domain = import.meta.env.VITE_SHOPIFY_DOMAIN;
        this.storefrontToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
        this.apiUrl = `https://${this.domain}/api/2023-10/graphql.json`;

        if (!this.domain || !this.storefrontToken) {
            console.warn('Shopify credentials not found. Using mock data.');
            this.useMockData = true;
        }
    }

    async graphqlFetch(query, variables = {}) {
        if (this.useMockData) {
            return this.getMockResponse(query, variables);
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

    // Pobieranie produktów
    async fetchProducts(limit = 20) {
        const query = `
            query GetProducts($first: Int!) {
                products(first: $first) {
                    edges {
                        node {
                            id
                            handle
                            title
                            description
                            availableForSale
                            tags
                            images(first: 5) {
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
                                {namespace: "custom", key: "country"}
                                {namespace: "custom", key: "region"}
                                {namespace: "custom", key: "variety"}
                                {namespace: "custom", key: "processing"}
                                {namespace: "custom", key: "tasting_notes"}
                                {namespace: "custom", key: "roast_type"}
                                {namespace: "custom", key: "roast_level"}
                                {namespace: "custom", key: "altitude"}
                                {namespace: "custom", key: "farm"}
                                {namespace: "custom", key: "species"}
                            ]) {
                                key
                                value
                                type
                            }
                        }
                    }
                }
            }
        `;

        try {
            console.log('🔍 Fetching products from Shopify...');
            const response = await this.graphqlFetch(query, { first: limit });
            console.log('📦 Raw Shopify response:', response);

            const products = response.data.products.edges.map(edge => {
                console.log('🔄 Processing product:', edge.node.title);
                console.log('📋 Raw metafields:', edge.node.metafields);
                console.log('🏷️ Tags:', edge.node.tags);
                console.log('🎛️ Variants:', edge.node.variants);

                try {
                    return this.mapProduct(edge.node);
                } catch (error) {
                    console.error('❌ Error mapping product:', edge.node.title, error);
                    return null;
                }
            }).filter(Boolean);

            console.log('✅ All mapped products:', products);
            return products;
        } catch (error) {
            console.error('❌ Error fetching products:', error);
            throw error;
        }
    }

    // Pobieranie pojedynczego produktu
    async fetchProduct(handle) {
        const query = `
            query GetProduct($handle: String!) {
                productByHandle(handle: $handle) {
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
                        {namespace: "custom", key: "country"}
                        {namespace: "custom", key: "region"}
                        {namespace: "custom", key: "variety"}
                        {namespace: "custom", key: "processing"}
                        {namespace: "custom", key: "tasting_notes"}
                        {namespace: "custom", key: "roast_type"}
                        {namespace: "custom", key: "roast_level"}
                        {namespace: "custom", key: "altitude"}
                        {namespace: "custom", key: "farm"}
                        {namespace: "custom", key: "species"}
                    ]) {
                        key
                        value
                        type
                    }
                }
            }
        `;

        const response = await this.graphqlFetch(query, { handle });
        return response.data.productByHandle ? this.mapProduct(response.data.productByHandle) : null;
    }

    // Tworzenie koszyka
    async createCart() {
        const query = `
            mutation cartCreate($input: CartInput!) {
                cartCreate(input: $input) {
                    cart {
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
                                    id
                                    quantity
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
                                                images(first: 1) {
                                                    edges {
                                                        node {
                                                            url
                                                            altText
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    userErrors {
                        field
                        message
                    }
                }
            }
        `;

        const response = await this.graphqlFetch(query, {
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

    // Dodawanie produktów do koszyka
    async addToCart(cartId, lines) {
        const query = `
            mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
                cartLinesAdd(cartId: $cartId, lines: $lines) {
                    cart {
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
                                    id
                                    quantity
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
                                                images(first: 1) {
                                                    edges {
                                                        node {
                                                            url
                                                            altText
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    userErrors {
                        field
                        message
                    }
                }
            }
        `;

        const response = await this.graphqlFetch(query, { cartId, lines });

        if (response.data.cartLinesAdd.userErrors.length > 0) {
            throw new Error(response.data.cartLinesAdd.userErrors[0].message);
        }

        return response.data.cartLinesAdd.cart;
    }

    // Aktualizacja koszyka
    async updateCartLines(cartId, lines) {
        const query = `
            mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
                cartLinesUpdate(cartId: $cartId, lines: $lines) {
                    cart {
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
                                    id
                                    quantity
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
                                                images(first: 1) {
                                                    edges {
                                                        node {
                                                            url
                                                            altText
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    userErrors {
                        field
                        message
                    }
                }
            }
        `;

        const response = await this.graphqlFetch(query, { cartId, lines });

        if (response.data.cartLinesUpdate.userErrors.length > 0) {
            throw new Error(response.data.cartLinesUpdate.userErrors[0].message);
        }

        return response.data.cartLinesUpdate.cart;
    }

    // Usuwanie z koszyka
    async removeFromCart(cartId, lineIds) {
        const query = `
            mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
                cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
                    cart {
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
                                    id
                                    quantity
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
                                                images(first: 1) {
                                                    edges {
                                                        node {
                                                            url
                                                            altText
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    userErrors {
                        field
                        message
                    }
                }
            }
        `;

        const response = await this.graphqlFetch(query, { cartId, lineIds });

        if (response.data.cartLinesRemove.userErrors.length > 0) {
            throw new Error(response.data.cartLinesRemove.userErrors[0].message);
        }

        return response.data.cartLinesRemove.cart;
    }

    // Pobieranie koszyka
    async getCart(cartId) {
        const query = `
            query getCart($cartId: ID!) {
                cart(id: $cartId) {
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
                                id
                                quantity
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
                                            images(first: 1) {
                                                edges {
                                                    node {
                                                        url
                                                        altText
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `;

        const response = await this.graphqlFetch(query, { cartId });
        return response.data.cart;
    }

    // GŁÓWNA funkcja mapowania produktu - ZAKTUALIZOWANA!
    mapProduct(shopifyProduct) {
        console.log(`🔄 Mapping product: ${shopifyProduct.title}`);

        // Helper: Bezpieczne odczytywanie metafields
        const getMetafield = (key) => {
            if (!shopifyProduct.metafields || !Array.isArray(shopifyProduct.metafields)) {
                console.log(`⚠️ No metafields for product ${shopifyProduct.title}`);
                return null;
            }

            const metafield = shopifyProduct.metafields.find(field => field && field.key === key);
            const value = metafield?.value || null;

            if (value) {
                console.log(`✅ Found metafield ${key}:`, value);
            }

            return value;
        };

        // Helper: Parse comma-separated values to array
        const parseList = (value) => {
            if (!value) return [];
            return value.split(',').map(item => item.trim()).filter(Boolean);
        };

        // Helper: Bezpieczne pobieranie zagnieżdżonych wartości
        const safeGet = (obj, path, defaultValue = null) => {
            try {
                return path.split('.').reduce((current, key) => current?.[key], obj) || defaultValue;
            } catch {
                return defaultValue;
            }
        };

        // Wyciągnij metafields
        const country = getMetafield('country') || '';
        const region = getMetafield('region') || '';
        const variety = getMetafield('variety') || '';
        const processing = getMetafield('processing') || '';
        const tastingNotes = getMetafield('tasting_notes') || '';
        const roastType = getMetafield('roast_type') || 'Filter';
        const roastLevel = getMetafield('roast_level') || '';
        const altitude = getMetafield('altitude') || '';
        const farm = getMetafield('farm') || '';
        const species = getMetafield('species') || 'Arabica';

        console.log(`📋 Extracted metafields:`, {
            country, region, variety, processing, tastingNotes, roastType, roastLevel
        });

        // Build origin array (compatible with existing coffee model)
        const origin = [];
        if (country || region) {
            origin.push({
                country: country,
                region: region,
                farm: farm,
                variety: parseList(variety),
                altitudeMasl: altitude ? parseInt(altitude) : null,
                processing: processing,
                fermentation: '' // Can be added later if needed
            });
        }

        // Map product to our coffee model
        const mappedProduct = {
            // Podstawowe info
            id: shopifyProduct.id,
            shopifyHandle: shopifyProduct.handle || '',
            name: shopifyProduct.title || 'Unnamed Product',
            description: shopifyProduct.description || '',

            // Images
            image: safeGet(shopifyProduct, 'images.edges.0.node.url', ''),
            images: shopifyProduct.images?.edges?.map(edge => edge.node.url) || [],

            // Availability
            availableForSale: shopifyProduct.availableForSale || false,

            // Tags
            tags: shopifyProduct.tags || [],

            // Variants (warianty: gramatura + mielenie)
            variants: shopifyProduct.variants?.edges?.map(edge => ({
                id: edge.node.id,
                title: edge.node.title || 'Default',
                price: parseFloat(edge.node.price.amount) || 0,
                compareAtPrice: edge.node.compareAtPrice ?
                    parseFloat(edge.node.compareAtPrice.amount) : null,
                currencyCode: edge.node.price.currencyCode || 'PLN',
                availableForSale: edge.node.availableForSale || false,
                selectedOptions: edge.node.selectedOptions || []
            })) || [],

            // Coffee-specific fields (z metafields)
            origin: origin,
            species: parseList(species),
            roastLevel: roastLevel,
            roastType: roastType,
            roastDate: null, // Not in Shopify (can be added if needed)
            tastingNotes: parseList(tastingNotes),
            processing: processing,
            altitude: altitude,

            // Availability flags (based on tags)
            availability: {
                espressoGrinders: shopifyProduct.tags?.includes('espresso-grinders') || false,
                quickFilter: shopifyProduct.tags?.includes('quick-filter') || false,
                brewBar: shopifyProduct.tags?.includes('brew-bar') || false,
                retailShelf: shopifyProduct.tags?.includes('retail-shelf') || false,
            }
        };

        console.log('📦 Final mapped product:', mappedProduct);
        return mappedProduct;
    }

    // Mock data responses dla development
    getMockResponse(query, variables) {
        // Import local coffee data as fallback
        const coffees = [
            {
                id: "gid://shopify/Product/1",
                handle: "espresso-house-blend",
                title: "Espresso House Blend",
                description: "Autorski blend pod espresso – słodycz czekolady, orzechowe body i śliwkowy finisz.",
                availableForSale: true,
                tags: ["espresso-grinders", "retail-shelf", "Espresso"],
                images: { edges: [{ node: { url: "/src/assets/coffee-placeholder.jpg", altText: "Espresso House Blend" } }] },
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

        // Return mock product data
        if (query.includes('products')) {
            return Promise.resolve({
                data: {
                    products: {
                        edges: coffees.map(coffee => ({ node: coffee }))
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

        return Promise.resolve({ data: {} });
    }
}

// Export singleton instance
export const shopify = new ShopifyService();