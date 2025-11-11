/**
 * Shopify Product Mapper
 * Maps Shopify product data to our internal format
 */

/**
 * Parse comma-separated values to array
 */
function parseList(value) {
    if (!value) return [];
    return value.split(',').map(item => item.trim()).filter(Boolean);
}

/**
 * Safe nested object access
 */
function safeGet(obj, path, defaultValue = null) {
    try {
        return path.split('.').reduce((current, key) => current?.[key], obj) || defaultValue;
    } catch {
        return defaultValue;
    }
}

/**
 * Get metafield value by key
 */
function getMetafield(product, key) {
    if (!product.metafields || !Array.isArray(product.metafields)) {
        return null;
    }

    const metafield = product.metafields.find(field => field && field.key === key);
    return metafield?.value || null;
}

/**
 * Map Shopify product to internal format
 * @param {object} shopifyProduct - Raw Shopify product
 * @returns {object} Mapped product
 */
export function mapProduct(shopifyProduct) {
    console.log(`🔄 Mapping product: ${shopifyProduct.title}`);

    // Extract metafields
    const country = getMetafield(shopifyProduct, 'country') || '';
    const region = getMetafield(shopifyProduct, 'region') || '';
    const variety = getMetafield(shopifyProduct, 'variety') || '';
    const processing = getMetafield(shopifyProduct, 'processing') || '';
    const tastingNotes = getMetafield(shopifyProduct, 'tasting_notes') || '';
    const altitude = getMetafield(shopifyProduct, 'altitude') || '';
    const farm = getMetafield(shopifyProduct, 'farm') || '';
    const species = getMetafield(shopifyProduct, 'species') || 'Arabica';

    // Map roast_type: "Przelew" → "Filter"
    const roastTypeRaw = getMetafield(shopifyProduct, 'roast_type') || 'Filter';
    const roastType = roastTypeRaw === 'Przelew' ? 'Filter' : roastTypeRaw;
    console.log(`🎨 Roast type mapping: "${roastTypeRaw}" → "${roastType}"`);

    const roastLevel = getMetafield(shopifyProduct, 'roast_level') || '';

    // Build origin array
    const origin = [];
    if (country || region) {
        origin.push({
            country: country,
            region: region,
            farm: farm,
            variety: parseList(variety),
            altitudeMasl: altitude ? parseInt(altitude) : null,
            processing: processing,
            fermentation: ''
        });
    }

    // Map and sort variants by price (ascending)
    const variants = (shopifyProduct.variants?.edges?.map(edge => ({
        id: edge.node.id,
        title: edge.node.title || 'Default',
        price: parseFloat(edge.node.price.amount) || 0,
        compareAtPrice: edge.node.compareAtPrice ?
            parseFloat(edge.node.compareAtPrice.amount) : null,
        currencyCode: edge.node.price.currencyCode || 'PLN',
        availableForSale: edge.node.availableForSale || false,
        selectedOptions: edge.node.selectedOptions || []
    })) || []).sort((a, b) => a.price - b.price);

    console.log('💰 Sorted variants:', variants.map(v => `${v.title}: ${v.price} zł`));

    // Map to internal format
    const mappedProduct = {
        // Basic info
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

        // Variants (sorted by price)
        variants: variants,

        // Coffee-specific fields
        origin: origin,
        species: parseList(species),
        roastLevel: roastLevel,
        roastType: roastType, // "Filter" or "Espresso"
        roastDate: null,
        tastingNotes: parseList(tastingNotes),
        processing: processing,
        altitude: altitude,

        // Availability flags
        availability: {
            espressoGrinders: shopifyProduct.tags?.includes('espresso-grinders') || false,
            quickFilter: shopifyProduct.tags?.includes('quick-filter') || false,
            brewBar: shopifyProduct.tags?.includes('brew-bar') || false,
            retailShelf: shopifyProduct.tags?.includes('retail-shelf') || false,
        }
    };

    console.log('✅ Mapped product:', mappedProduct.name);
    return mappedProduct;
}