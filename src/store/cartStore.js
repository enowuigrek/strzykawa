import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { shopify } from '../services/shopify';
import { logger } from '../utils/logger';

/**
 * Cart Store - Zustand store dla koszyka
 *
 * Persistence: tylko cartId + status.
 * cart i items są odtwarzane przy każdym starcie z Shopify (zawsze aktualne ceny/dostępność).
 */

// Module-level helper — mapuje Shopify cart lines na format UI
function mapCartToItems(cart) {
    if (!cart?.lines?.edges) return [];

    return cart.lines.edges.map(({ node: line }) => {
        const variant = line.merchandise;

        const selectedOptions = variant.selectedOptions || [];
        const formaKawyAttr = line.attributes?.find(attr => attr.key === 'Forma kawy')?.value;
        const coffeeForm = formaKawyAttr === 'Mielona' ? 'mielona' : 'ziarna';
        const grindMethod = line.attributes?.find(attr => attr.key === 'Mielenie')?.value || null;

        return {
            lineItemId: line.id,
            availableForSale: variant.availableForSale !== false,
            product: {
                id: variant.product.id,
                handle: variant.product.handle,
                name: variant.product.title,
                roastLevel: line.attributes?.find(attr => attr.key === 'roast_level')?.value || '',
                tastingNotes: [],
                image:
                    variant.image?.url ||
                    variant.product.featuredImage?.url ||
                    variant.product.images?.edges?.[0]?.node?.url ||
                    '',
                price: parseFloat(variant.price.amount),
                currencyCode: variant.price.currencyCode,
            },
            variantId: variant.id,
            variantTitle: variant.title,
            selectedOptions,
            coffeeForm,
            grindMethod,
            quantity: line.quantity,
        };
    });
}

export const useCartStore = create(
    persist(
        (set, get) => ({
            // ── State ─────────────────────────────────────────────────────────
            cartId: null,          // persystowane — jedyna rzecz z localStorage
            cart: null,            // NIE persystowane — odtwarzane z Shopify przy starcie
            items: [],             // NIE persystowane
            note: '',
            isLoading: false,
            isInitialized: false,  // true gdy initializeCart() zakończy działanie
            error: null,
            status: 'idle',        // 'idle' | 'pending' | 'completed' — persystowane

            // ── initializeCart ────────────────────────────────────────────────
            // Wywołaj raz przy mount aplikacji (App.jsx).
            // Jeśli cartId istnieje → pobierz koszyk z Shopify.
            // Jeśli Shopify zwróci null → zamówienie złożone lub koszyk wygasł → czyść cartId.
            // Jeśli brak cartId → nic nie rób (koszyk tworzony lazily w addItem).
            initializeCart: async () => {
                const { cartId } = get();

                if (!cartId) {
                    set({ isInitialized: true });
                    return;
                }

                set({ isLoading: true });
                try {
                    const cart = await shopify.getCart(cartId);
                    if (cart) {
                        set({
                            cart,
                            items: mapCartToItems(cart),
                            note: cart.note || '',
                            isInitialized: true,
                            isLoading: false,
                            status: 'idle',
                        });
                    } else {
                        // Koszyk usunięty po złożeniu zamówienia lub wygasł
                        set({ cartId: null, cart: null, items: [], isInitialized: true, isLoading: false });
                    }
                } catch (error) {
                    logger.warn('Cart init error, clearing cartId:', error);
                    set({ cartId: null, cart: null, items: [], isInitialized: true, isLoading: false });
                }
            },

            // ── addItem ───────────────────────────────────────────────────────
            // coffeeForm: 'ziarna' | 'mielona'
            // grindMethod: 'Ekspres' | 'Kawiarka' | 'Drip' | 'Ekspres Przelewowy' | null
            addItem: async (product, variantId, quantity = 1, coffeeForm = 'ziarna', grindMethod = null) => {
                set({ isLoading: true, error: null });

                const buildLines = () => {
                    // UWAGA: Klucze po polsku — Shopify checkout wyświetla je klientowi bezpośrednio
                    const attributes = [
                        { key: 'Forma kawy', value: coffeeForm === 'ziarna' ? 'Ziarna' : 'Mielona' },
                    ];
                    if (coffeeForm === 'mielona' && grindMethod) {
                        attributes.push({ key: 'Mielenie', value: grindMethod });
                    }
                    return [{ merchandiseId: variantId, quantity, attributes }];
                };

                try {
                    let { cartId } = get();
                    const lines = buildLines();
                    let updatedCart;

                    if (!cartId) {
                        // Lazy creation — twórz koszyk dopiero gdy user dodaje pierwszy produkt
                        const newCart = await shopify.createCart();
                        cartId = newCart.id;
                        set({ cartId, cart: newCart, status: 'idle' });
                        updatedCart = await shopify.addToCart(cartId, lines);
                    } else {
                        try {
                            updatedCart = await shopify.addToCart(cartId, lines);
                        } catch (cartError) {
                            // Koszyk wygasł na Shopify — stwórz nowy i spróbuj ponownie
                            logger.warn('Cart expired, creating new cart...', cartError);
                            const newCart = await shopify.createCart();
                            cartId = newCart.id;
                            set({ cartId, cart: newCart, status: 'idle' });
                            updatedCart = await shopify.addToCart(cartId, lines);
                        }
                    }

                    set({
                        cartId: updatedCart.id,
                        cart: updatedCart,
                        items: mapCartToItems(updatedCart),
                        isLoading: false,
                    });

                    // Animacja bounce na ikonce koszyka (opóźniona żeby modal QuickAdd zdążył się zamknąć)
                    setTimeout(() => {
                        window.dispatchEvent(new CustomEvent('cartBounce'));
                    }, 700);
                } catch (error) {
                    logger.error('Error adding to cart:', error);
                    set({ error: 'Nie udało się dodać produktu do koszyka', isLoading: false });
                }
            },

            // ── removeItem ────────────────────────────────────────────────────
            removeItem: async (lineId) => {
                set({ isLoading: true, error: null });
                try {
                    const { cart, cartId } = get();
                    const id = cart?.id || cartId;
                    if (!id) throw new Error('Brak koszyka');

                    const updatedCart = await shopify.removeFromCart(id, [lineId]);
                    set({ cart: updatedCart, items: mapCartToItems(updatedCart), isLoading: false });
                } catch (error) {
                    logger.error('Error removing from cart:', error);
                    set({ error: 'Nie udało się usunąć produktu', isLoading: false });
                }
            },

            // ── updateQuantity ────────────────────────────────────────────────
            updateQuantity: async (lineId, newQuantity) => {
                set({ isLoading: true, error: null });
                try {
                    const { cart, cartId } = get();
                    const id = cart?.id || cartId;
                    if (!id) throw new Error('Brak koszyka');

                    const updatedCart = await shopify.updateCartLines(id, [{ id: lineId, quantity: newQuantity }]);
                    set({ cart: updatedCart, items: mapCartToItems(updatedCart), isLoading: false });
                } catch (error) {
                    logger.error('Error updating quantity:', error);
                    set({ error: 'Nie udało się zaktualizować ilości', isLoading: false });
                }
            },

            // ── clearCart ─────────────────────────────────────────────────────
            clearCart: () => {
                set({ cartId: null, cart: null, items: [], note: '', status: 'idle' });
            },

            // ── clearError ────────────────────────────────────────────────────
            clearError: () => set({ error: null }),

            // ── removeUnavailableItems ─────────────────────────────────────────
            // Sprawdź i usuń niedostępne produkty z koszyka.
            // Zwraca tablicę nazw usuniętych produktów (do wyświetlenia w bannerze).
            removeUnavailableItems: async () => {
                const { items, cart, cartId } = get();
                const id = cart?.id || cartId;
                if (!id || items.length === 0) return [];

                const unavailable = items.filter(item => !item.availableForSale);
                if (unavailable.length === 0) return [];

                const names = unavailable.map(item => item.product.name);
                const lineIds = unavailable.map(item => item.lineItemId);

                try {
                    const updatedCart = await shopify.removeFromCart(id, lineIds);
                    set({ cart: updatedCart, items: mapCartToItems(updatedCart) });
                } catch (error) {
                    logger.error('Error removing unavailable items:', error);
                }

                return names;
            },

            // ── updateNote ────────────────────────────────────────────────────
            updateNote: async (noteText) => {
                const { cart, cartId } = get();
                const id = cart?.id || cartId;
                if (!id) return;

                set({ isLoading: true, error: null });
                try {
                    const updatedCart = await shopify.updateCartNote(id, noteText.trim());
                    set({ cart: updatedCart, note: noteText.trim(), isLoading: false });
                } catch (error) {
                    logger.error('Error updating cart note:', error);
                    set({ error: 'Nie udało się zapisać uwag', isLoading: false });
                }
            },

            // ── goToCheckout ──────────────────────────────────────────────────
            // WAŻNE: NIE czyścimy koszyka przed przekierowaniem.
            // Shopify samo usuwa koszyk po złożeniu zamówienia.
            // initializeCart() przy kolejnym uruchomieniu wykryje null i wyczyści cartId.
            goToCheckout: (user = null) => {
                const { cart } = get();
                if (!cart?.checkoutUrl) {
                    logger.error('No checkout URL available');
                    return;
                }

                let checkoutUrl = cart.checkoutUrl;

                // Pre-fill checkout z danymi zalogowanego użytkownika
                if (user) {
                    const params = new URLSearchParams();
                    if (user.email) params.append('checkout[email]', user.email);
                    if (user.firstName) params.append('checkout[shipping_address][first_name]', user.firstName);
                    if (user.lastName) params.append('checkout[shipping_address][last_name]', user.lastName);

                    if (user.defaultAddress) {
                        const addr = user.defaultAddress;
                        if (addr.address1) params.append('checkout[shipping_address][address1]', addr.address1);
                        if (addr.address2) params.append('checkout[shipping_address][address2]', addr.address2);
                        if (addr.city) params.append('checkout[shipping_address][city]', addr.city);
                        if (addr.province) params.append('checkout[shipping_address][province]', addr.province);
                        if (addr.zip) params.append('checkout[shipping_address][zip]', addr.zip);
                        if (addr.country) params.append('checkout[shipping_address][country]', addr.country);
                        if (addr.phone) params.append('checkout[shipping_address][phone]', addr.phone);
                    }

                    const separator = checkoutUrl.includes('?') ? '&' : '?';
                    checkoutUrl = `${checkoutUrl}${separator}${params.toString()}`;
                    logger.log('Pre-filling checkout with user data:', {
                        email: user.email,
                        name: `${user.firstName} ${user.lastName}`,
                        hasAddress: !!user.defaultAddress,
                    });
                }

                logger.log('Redirecting to checkout:', checkoutUrl);
                window.location.href = checkoutUrl;
            },

            // ── markCheckoutCompleted ─────────────────────────────────────────
            // Wywołaj na /checkout/success — czyści koszyk i cartId
            markCheckoutCompleted: () => {
                set({ cartId: null, cart: null, items: [], note: '', status: 'completed' });
            },

            // ── markCheckoutCanceled ──────────────────────────────────────────
            // Wywołaj na /checkout/canceled — zachowuje cartId, klient może dołożyć produkty
            markCheckoutCanceled: () => {
                set({ status: 'idle' });
            },

            // ── Getters ───────────────────────────────────────────────────────
            getTotalItems: () => {
                return get().cart?.totalQuantity || 0;
            },

            getTotalPrice: () => {
                const { cart } = get();
                if (cart?.cost?.subtotalAmount) {
                    return parseFloat(cart.cost.subtotalAmount.amount);
                }
                // Fallback: suma z items
                const { items } = get();
                return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
            },

            getCurrencyCode: () => {
                const { cart } = get();
                return cart?.cost?.subtotalAmount?.currencyCode || 'PLN';
            },

            isInCart: (productId) => {
                return get().items.some(item => item.product.id === productId);
            },

            getItemQuantity: (productId) => {
                const item = get().items.find(item => item.product.id === productId);
                return item ? item.quantity : 0;
            },

            // Zachowane dla backwards compatibility
            addCoffeeToCart: async (coffeeId, quantity = 1) => {
                try {
                    const product = await shopify.fetchProduct(coffeeId);
                    if (product && product.variants.length > 0) {
                        await get().addItem(product, product.variants[0].id, quantity);
                    } else {
                        throw new Error('Produkt nie został znaleziony');
                    }
                } catch (error) {
                    logger.error('Error adding coffee to cart:', error);
                    set({ error: 'Nie udało się dodać kawy do koszyka' });
                }
            },
        }),
        {
            name: 'strzykawa-cart',
            // KLUCZOWE: persystujemy TYLKO cartId i status
            // cart i items są odtwarzane z Shopify przy każdym starcie (zawsze świeże dane)
            partialize: (state) => ({
                cartId: state.cartId,
                status: state.status,
            }),
            version: 2, // Bump version — stara struktura (cart, items) zostanie zignorowana
        }
    )
);
