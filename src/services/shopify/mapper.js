import { logger } from '../../utils/logger.js';

/**
 * Shopify Product Mapper
 * Maps Shopify product data to our internal format
 */

/**
 * Parse value that might be a JSON array or comma-separated string.
 * @param {string} value - Raw value from Shopify metafield
 * @param {boolean} asArray - If true returns array, if false returns joined string
 * @returns {string|Array} Parsed result
 */
function parseField(value, asArray = false) {
    if (!value) return asArray ? [] : '';
    if (value.startsWith('[')) {
        try {
            const arr = JSON.parse(value);
            return asArray ? arr : arr.join(', ');
        } catch {
            // Fallback to CSV parsing
        }
    }
    if (asArray) {
        return value.split(',').map(item => item.trim()).filter(Boolean);
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
    logger.log('Mapping product:', shopifyProduct.title);

    // Extract metafields - używamy polskich kluczy z Shopify
    const country = parseField(getMetafield(shopifyProduct, 'kraj'));
    const region = getMetafield(shopifyProduct, 'region') || '';
    const variety = getMetafield(shopifyProduct, 'odmiana') || '';
    const processing = parseField(getMetafield(shopifyProduct, 'obrobka'));
    const tastingNotes = getMetafield(shopifyProduct, 'profil_smakowy') || '';
    const altitude = getMetafield(shopifyProduct, 'wysokosc') || '';
    const farm = getMetafield(shopifyProduct, 'farma') || '';
    const species = getMetafield(shopifyProduct, 'gatunek') || 'Arabica';
    const producer = getMetafield(shopifyProduct, 'producent') || '';

    // Map przeznaczenie: "Przelew" → "Filter", "Espresso" → "Espresso"
    const roastTypeRaw = parseField(getMetafield(shopifyProduct, 'przeznaczenie'));
    const roastType = roastTypeRaw
        ? (roastTypeRaw === 'Przelew' ? 'Filter' : roastTypeRaw)
        : null;

    const roastLevel = getMetafield(shopifyProduct, 'stopien_palenia') || '';

    // Custom color - nadpisuje kolor z kraju (hex lub rgb)
    const customColor = getMetafield(shopifyProduct, 'kolor') || null;

    // Build origin array
    const origin = [];
    if (country || region) {
        origin.push({
            country: country,
            region: region,
            farm: farm,
            producer: producer,
            variety: parseField(variety, true),
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
        species: parseField(species, true),
        roastLevel: roastLevel,
        roastType: roastType, // "Filter" or "Espresso"
        roastDate: null,
        tastingNotes: parseField(tastingNotes, true),
        processing: processing,
        altitude: altitude,

        // Custom color override (hex lub rgb, np. "#FF5500" lub "rgb(255, 85, 0)")
        // Nadpisuje kolor z kraju - używane w CoffeeOverlay
        themeColor: customColor,

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