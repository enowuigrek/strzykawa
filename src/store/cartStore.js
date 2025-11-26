import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { shopify } from '../services/shopify';
import { logger } from '../utils/logger';

/**
 * Cart Store - Zustand store dla koszyka
 * FIXED: Używa variant.selectedOptions z GraphQL (dodane w cart.js)
 */
export const useCartStore = create(
    persist(
        (set, get) => ({
            cart: null,
            items: [],
            isLoading: false,
            error: null,
            // ✅ status checkoutu: 'idle' | 'pending' | 'completed'
            status: 'idle',

            // Initialize cart
            initializeCart: async () => {
                const { cart, status } = get();

                // ✅ jeśli mamy koszyk i nie jest oznaczony jako zakończony – używamy go dalej
                if (cart && status !== 'completed') return;

                set({ isLoading: true });
                try {
                    const newCart = await shopify.createCart();
                    set({ cart: newCart, isLoading: false, status: 'idle' });
                } catch (error) {
                    logger.error('Error initializing cart:', error);
                    set({ error: 'Nie udało się utworzyć koszyka', isLoading: false });
                }
            },

            // Map Shopify cart to our items format
            // 🔥 FIXED: Używa variant.selectedOptions z GraphQL (nie z attributes!)
            mapCartToItems: (cart) => {
                if (!cart?.lines?.edges) return [];

                return cart.lines.edges.map(({ node: line }) => {
                    const variant = line.merchandise;

                    const selectedOptions = variant.selectedOptions || [];

                    return {
                        lineItemId: line.id,
                        product: {
                            id: variant.product.id,
                            name: variant.product.title,
                            roastLevel: line.attributes?.find(attr => attr.key === 'roast_level')?.value || '',
                            tastingNotes: [],
                            image: variant.image?.url || variant.product.featuredImage?.url || variant.product.images?.edges?.[0]?.node?.url || '',
                            price: parseFloat(variant.price.amount),
                            currencyCode: variant.price.currencyCode
                        },
                        variantId: variant.id,
                        variantTitle: variant.title,
                        selectedOptions: selectedOptions,
                        quantity: line.quantity
                    };
                });
            },

            // Add item to cart
            addItem: async (product, variantId, quantity = 1) => {
                set({ isLoading: true, error: null });

                try {
                    await get().initializeCart();
                    const { cart } = get();

                    if (!cart) {
                        throw new Error('Brak koszyka');
                    }

                    const lines = [{
                        merchandiseId: variantId,
                        quantity: quantity,
                        attributes: [
                            { key: 'product_name', value: product.name },
                            { key: 'roast_level', value: product.roastLevel || '' },
                        ]
                    }];

                    const updatedCart = await shopify.addToCart(cart.id, lines);

                    set({
                        cart: updatedCart,
                        items: get().mapCartToItems(updatedCart),
                        isLoading: false
                    });

                } catch (error) {
                    logger.error('Error adding to cart:', error);
                    set({
                        error: 'Nie udało się dodać produktu do koszyka',
                        isLoading: false
                    });
                }
            },

            // Remove item from cart
            removeItem: async (lineId) => {
                set({ isLoading: true, error: null });

                try {
                    const { cart } = get();
                    if (!cart) throw new Error('Brak koszyka');

                    const updatedCart = await shopify.removeFromCart(cart.id, [lineId]);

                    set({
                        cart: updatedCart,
                        items: get().mapCartToItems(updatedCart),
                        isLoading: false
                    });
                } catch (error) {
                    logger.error('Error removing from cart:', error);
                    set({
                        error: 'Nie udało się usunąć produktu',
                        isLoading: false
                    });
                }
            },

            // Update item quantity
            updateQuantity: async (lineId, newQuantity) => {
                set({ isLoading: true, error: null });

                try {
                    const { cart } = get();
                    if (!cart) throw new Error('Brak koszyka');

                    const lines = [{
                        id: lineId,
                        quantity: newQuantity
                    }];

                    const updatedCart = await shopify.updateCartLines(cart.id, lines);

                    set({
                        cart: updatedCart,
                        items: get().mapCartToItems(updatedCart),
                        isLoading: false
                    });
                } catch (error) {
                    logger.error('Error updating quantity:', error);
                    set({
                        error: 'Nie udało się zaktualizować ilości',
                        isLoading: false
                    });
                }
            },

            // Clear entire cart
            clearCart: () => {
                // ✅ czyścimy też status
                set({ cart: null, items: [], status: 'idle' });
            },

            // Clear error
            clearError: () => {
                set({ error: null });
            },

            // Go to checkout
            goToCheckout: () => {
                const { cart } = get();
                if (cart?.checkoutUrl) {
                    // ✅ oznaczamy, że jesteśmy w trakcie checkoutu
                    set({ status: 'pending' });
                    window.location.href = cart.checkoutUrl;
                } else {
                    logger.error('No checkout URL available');
                }
            },

            // ✅ Wywołasz to na stronie /checkout/success
            markCheckoutCompleted: () => {
                set({ cart: null, items: [], status: 'completed' });
            },

            // ✅ Wywołasz to na stronie /checkout/canceled
            markCheckoutCanceled: () => {
                set({ status: 'idle' });
            },

            // Getters
            getTotalItems: () => {
                const { items } = get();
                return items.reduce((total, item) => total + item.quantity, 0);
            },

            getTotalPrice: () => {
                const { cart } = get();
                if (cart?.cost?.totalAmount) {
                    return parseFloat(cart.cost.totalAmount.amount);
                }

                const { items } = get();
                return items.reduce((total, item) => {
                    return total + (item.product.price * item.quantity);
                }, 0);
            },

            getCurrencyCode: () => {
                const { cart } = get();
                return cart?.cost?.totalAmount?.currencyCode || 'PLN';
            },

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

            isInCart: (productId) => {
                const { items } = get();
                return items.some(item => item.product.id === productId);
            },

            getItemQuantity: (productId) => {
                const { items } = get();
                const item = items.find(item => item.product.id === productId);
                return item ? item.quantity : 0;
            }
        }),
        {
            name: 'strzykawa-cart',
            partialize: (state) => ({
                cart: state.cart,
                items: state.items,
                // ✅ zapisujemy status checkoutu w localStorage
                status: state.status
            }),
            version: 1
        }
    )
);