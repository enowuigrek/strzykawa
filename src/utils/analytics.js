/**
 * analytics.js — Centralny moduł śledzenia GA4
 *
 * Używa window.gtag załadowanego w index.html (przed React).
 * Wszystkie eventy: snake_case, pełne items[], currency: 'PLN'.
 * Bezpieczne: no-op jeśli gtag niedostępne (np. brak zgody).
 */

const CURRENCY = 'PLN';

/** Bezpieczne wywołanie window.gtag */
function fire(eventName, params) {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
    window.gtag('event', eventName, params);
}

/**
 * Buduje item w formacie GA4 ecommerce.
 * @param {Object} product  - dane produktu ze Shopify mapper
 * @param {Object|null} variant - wybrany wariant ({ id, price, title })
 * @param {number} quantity
 * @param {string|null} coffeeForm - 'ziarna' | 'mielona'
 * @param {string|null} grindMethod - 'Ekspres' | 'Drip' itp.
 */
function buildItem(product, variant = null, quantity = 1, coffeeForm = null, grindMethod = null) {
    const rawPrice = variant?.price ?? product?.price ?? 0;
    const price = typeof rawPrice === 'number' ? rawPrice : parseFloat(rawPrice) || 0;

    const variantParts = [coffeeForm, grindMethod].filter(Boolean);
    const itemVariant = variant?.title || (variantParts.length ? variantParts.join(' / ') : undefined);

    return {
        item_id: product?.handle || product?.id || '',
        item_name: product?.name || '',
        item_category: product?.roastType || '',
        price,
        quantity,
        ...(itemVariant ? { item_variant: itemVariant } : {}),
    };
}

/**
 * Buduje items[] z pozycji koszyka (ze struktury cartStore.items).
 */
function buildItemsFromCart(cartItems) {
    return (cartItems || []).map((item) => ({
        item_id: item.product?.handle || item.product?.id || '',
        item_name: item.product?.name || '',
        item_category: item.product?.roastLevel || '',
        price: item.product?.price || 0,
        quantity: item.quantity,
        ...(item.variantTitle ? { item_variant: item.variantTitle } : {}),
    }));
}

// ─── STANDARD GA4 E-COMMERCE EVENTS ──────────────────────────────────────────

/**
 * view_item — wyświetlenie strony produktu
 */
export function trackViewItem(product, variant = null) {
    if (!product) return;
    const rawPrice = variant?.price ?? product.price ?? 0;
    const value = typeof rawPrice === 'number' ? rawPrice : parseFloat(rawPrice) || 0;
    fire('view_item', {
        currency: CURRENCY,
        value,
        items: [buildItem(product, variant)],
    });
}

/**
 * add_to_cart — dodanie produktu do koszyka.
 * Wywoływane z cartStore.addItem (obejmuje CoffeeDetail i QuickAddModal).
 */
export function trackAddToCart(product, variantId, quantity = 1, coffeeForm = null, grindMethod = null) {
    if (!product) return;
    const variant = product.variants?.find((v) => v.id === variantId) || null;
    const rawPrice = variant?.price ?? product.price ?? 0;
    const price = typeof rawPrice === 'number' ? rawPrice : parseFloat(rawPrice) || 0;
    fire('add_to_cart', {
        currency: CURRENCY,
        value: price * quantity,
        items: [buildItem(product, variant, quantity, coffeeForm, grindMethod)],
    });
}

/**
 * view_cart — wyświetlenie koszyka (CartModal otwarty)
 */
export function trackViewCart(cartItems, totalValue = 0) {
    if (!cartItems?.length) return;
    fire('view_cart', {
        currency: CURRENCY,
        value: totalValue,
        items: buildItemsFromCart(cartItems),
    });
}

/**
 * begin_checkout — wejście na stronę finalizacji zamówienia
 */
export function trackBeginCheckout(cartItems, totalValue = 0) {
    if (!cartItems?.length) return;
    fire('begin_checkout', {
        currency: CURRENCY,
        value: totalValue,
        items: buildItemsFromCart(cartItems),
    });
}

/**
 * search — wyszukiwanie produktów (GA4 standard event name)
 * Debounce powinien być po stronie komponentu.
 */
export function trackViewSearchResults(searchQuery, resultsCount = 0) {
    if (!searchQuery?.trim()) return;
    fire('search', {
        search_term: searchQuery.trim(),
        results_count: resultsCount,
    });
}

// ─── CUSTOM BEHAVIORAL EVENTS ("KAWOWE") ─────────────────────────────────────

/**
 * wybor_metody_parzenia — kliknięcie metody parzenia (Ekspres, Drip, Kawiarka itp.)
 */
export function trackBrewingMethodSelected(method, roastType = null) {
    if (!method) return;
    fire('wybor_metody_parzenia', {
        metoda_parzenia: method,
        ...(roastType ? { roast_type: roastType } : {}),
    });
}

/**
 * zmiana_mielenia — zmiana sposobu mielenia w selektorze
 */
export function trackGrindChanged(newMethod, previousMethod = null) {
    if (!newMethod) return;
    fire('zmiana_mielenia', {
        mielenie: newMethod,
        ...(previousMethod ? { poprzednie_mielenie: previousMethod } : {}),
    });
}

/**
 * copy_product_name — skopiowanie nazwy produktu (H1)
 */
export function trackCopyProductName(productName) {
    if (!productName) return;
    fire('copy_product_name', {
        product_name: productName,
    });
}

/**
 * widocznosc_nut_smakowych — sekcja profilu smakowego widoczna ≥ 2s w viewport
 */
export function trackTastingNotesVisible(productName, tastingNotes = []) {
    if (!productName) return;
    fire('widocznosc_nut_smakowych', {
        product_name: productName,
        tasting_notes: Array.isArray(tastingNotes) ? tastingNotes.join(', ') : '',
    });
}

/**
 * click_out_of_stock — kliknięcie niedostępnego produktu
 */
export function trackClickOutOfStock(product, variantId = null) {
    if (!product) return;
    fire('click_out_of_stock', {
        item_id: product.handle || product.id || '',
        item_name: product.name || '',
        ...(variantId ? { variant_id: variantId } : {}),
    });
}

/**
 * checkout_form_error — błędy walidacji podczas finalizacji zamówienia
 */
export function trackCheckoutFormError(errors, deliveryMethod = null) {
    const errorFields = Object.keys(errors || {});
    if (!errorFields.length) return;
    fire('checkout_form_error', {
        error_fields: errorFields.join(', '),
        error_count: errorFields.length,
        ...(deliveryMethod ? { delivery_method: deliveryMethod } : {}),
    });
}

// ─── DODATKOWE EVENTY ─────────────────────────────────────────────────────────

/**
 * select_item — kliknięcie karty produktu (link do detalu lub QuickAdd)
 */
export function trackSelectItem(product, listName = 'Product Grid') {
    if (!product) return;
    fire('select_item', {
        item_list_name: listName,
        items: [buildItem(product)],
    });
}

/**
 * purchase — złożenie zamówienia (na stronie /checkout/success)
 * @param {string} transactionId - numer zamówienia z Shopify
 * @param {Array} cartItems      - pozycje koszyka sprzed wyczyszczenia
 * @param {number} totalValue    - wartość zamówienia
 * @param {number} shippingValue - koszt dostawy (opcjonalnie)
 */
export function trackPurchase(transactionId, cartItems, totalValue = 0, shippingValue = 0) {
    if (!cartItems?.length && !transactionId) return;
    fire('purchase', {
        transaction_id: transactionId || 'unknown',
        currency: CURRENCY,
        value: totalValue,
        shipping: shippingValue,
        items: buildItemsFromCart(cartItems || []),
    });
}

/**
 * login — zalogowanie użytkownika (GA4 standard)
 */
export function trackLogin(method = 'email') {
    fire('login', { method });
}

/**
 * sign_up — rejestracja nowego użytkownika (GA4 standard)
 */
export function trackSignUp(method = 'email') {
    fire('sign_up', { method });
}

// ─── CONTACT INTENT EVENTS (weryfikacja: strona → kawiarnia) ────────────────

/**
 * click_phone — kliknięcie w numer telefonu (tel: link)
 */
export function trackPhoneClick(location = 'unknown') {
    fire('click_phone', { link_location: location });
}

/**
 * click_email — kliknięcie w adres email (mailto: link)
 */
export function trackEmailClick(location = 'unknown') {
    fire('click_email', { link_location: location });
}

/**
 * click_social — kliknięcie w link social media
 */
export function trackSocialClick(platform, location = 'unknown') {
    if (!platform) return;
    fire('click_social', { platform, link_location: location });
}

/**
 * click_maps — otwarcie Google Maps (szuka trasy do kawiarni)
 */
export function trackMapsClick(location = 'unknown') {
    fire('click_maps', { link_location: location });
}
