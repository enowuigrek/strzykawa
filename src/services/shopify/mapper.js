/**
 * Shopify Product Mapper
 * Maps Shopify product data to our internal format
 */

/**
 * Parse comma-separated values to array
 */
function parseList(value) {
    if (!value) return [];
    // Jeśli wartość jest JSON arrayem (z Shopify list metafield)
    if (value.startsWith('[')) {
        try {
            return JSON.parse(value);
        } catch {
            // Jeśli nie da się sparsować, traktuj jako string
        }
    }
    return value.split(',').map(item => item.trim()).filter(Boolean);
}

/**
 * Parse value that might be JSON array or single value
 * Returns first value or joined string
 */
function parseValue(value) {
    if (!value) return '';
    // Jeśli wartość jest JSON arrayem
    if (value.startsWith('[')) {
        try {
            const arr = JSON.parse(value);
            return arr.join(', ');
        } catch {
            // Jeśli nie da się sparsować, zwróć as-is
        }
    }
    return value;
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
    // DEBUG: Zobacz surowe metafields z Shopify
    console.log('🔍 Raw metafields for:', shopifyProduct.title, shopifyProduct.metafields);

    // Extract metafields - używamy polskich kluczy z Shopify
    // Kraj: custom pole (może zawierać wiele krajów dla blendów)
    const country = parseValue(getMetafield(shopifyProduct, 'kraj'));
    const region = getMetafield(shopifyProduct, 'region') || '';
    const variety = getMetafield(shopifyProduct, 'odmiana') || '';
    const processing = parseValue(getMetafield(shopifyProduct, 'obrobka'));
    const tastingNotes = getMetafield(shopifyProduct, 'profil_smakowy') || '';
    const altitude = getMetafield(shopifyProduct, 'wysokosc') || '';
    const farm = getMetafield(shopifyProduct, 'farma') || '';
    const species = getMetafield(shopifyProduct, 'gatunek') || 'Arabica';

    // Map palenie: "Przelew" → "Filter", "Espresso" → "Espresso"
    const roastTypeRaw = getMetafield(shopifyProduct, 'palenie') || 'Filter';
    const roastType = roastTypeRaw === 'Przelew' ? 'Filter' : roastTypeRaw;

    const roastLevel = getMetafield(shopifyProduct, 'stopien_palenia') || '';

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

    return mappedProduct;
}