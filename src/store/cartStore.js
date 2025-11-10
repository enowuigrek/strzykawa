import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { shopify } from '../services/shopify';

/**
 * Cart Store - Zustand store dla koszyka
 * UPDATED: dodany selectedOptions dla wyświetlania wariantów w koszyku
 */
export const useCartStore = create(
    persist(
        (set, get) => ({
            cart: null,
            items: [],
            isLoading: false,
            error: null,

            // Initialize cart
            initializeCart: async () => {
                const { cart } = get();
                if (cart) return;

                set({ isLoading: true });
                try {
                    const newCart = await shopify.createCart();
                    set({ cart: newCart, isLoading: false });
                } catch (error) {
                    console.error('Error initializing cart:', error);
                    set({ error: 'Nie udało się utworzyć koszyka', isLoading: false });
                }
            },

            // Map Shopify cart to our items format - UPDATED z selectedOptions z attributes
            mapCartToItems: (cart) => {
                if (!cart?.lines?.edges) return [];

                return cart.lines.edges.map(({ node: line }) => {
                    const variant = line.merchandise;

                    // 🔥 Wyciągnij selectedOptions z attributes (zapisane przy dodawaniu)
                    const selectedOptionsAttr = line.attributes?.find(attr => attr.key === 'selected_options')?.value;
                    let selectedOptions = [];

                    if (selectedOptionsAttr) {
                        try {
                            selectedOptions = JSON.parse(selectedOptionsAttr);
                        } catch (e) {
                            console.error('Error parsing selectedOptions:', e);
                        }
                    }

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
                        selectedOptions: selectedOptions, // 🔥 Z attributes
                        quantity: line.quantity
                    };
                });
            },

            // Add item to cart - ZAPISZ selectedOptions w attributes
            addItem: async (product, variantId, quantity = 1) => {
                set({ isLoading: true, error: null });

                try {
                    await get().initializeCart();
                    const { cart } = get();

                    if (!cart) {
                        throw new Error('Brak koszyka');
                    }

                    // 🔥 Znajdź variant żeby dostać selectedOptions
                    const variant = product.variants?.find(v => v.id === variantId);
                    const selectedOptions = variant?.selectedOptions || [];

                    const lines = [{
                        merchandiseId: variantId,
                        quantity: quantity,
                        attributes: [
                            { key: 'product_name', value: product.name },
                            { key: 'roast_level', value: product.roastLevel || '' },
                            { key: 'selected_options', value: JSON.stringify(selectedOptions) } // 🔥 Zapisz selectedOptions
                        ]
                    }];

                    const updatedCart = await shopify.addToCart(cart.id, lines);

                    set({
                        cart: updatedCart,
                        items: get().mapCartToItems(updatedCart),
                        isLoading: false
                    });

                } catch (error) {
                    console.error('Error adding to cart:', error);
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
                    console.error('Error removing from cart:', error);
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
                    console.error('Error updating quantity:', error);
                    set({
                        error: 'Nie udało się zaktualizować ilości',
                        isLoading: false
                    });
                }
            },

            // Clear entire cart
            clearCart: () => {
                set({ cart: null, items: [] });
            },

            // Go to checkout
            goToCheckout: () => {
                const { cart } = get();
                if (cart?.checkoutUrl) {
                    window.location.href = cart.checkoutUrl;
                } else {
                    console.error('No checkout URL available');
                }
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

                // Fallback calculation
                const { items } = get();
                return items.reduce((total, item) => {
                    return total + (item.product.price * item.quantity);
                }, 0);
            },

            getCurrencyCode: () => {
                const { cart } = get();
                return cart?.cost?.totalAmount?.currencyCode || 'PLN';
            },

            // Quick add methods for coffee products
            addCoffeeToCart: async (coffeeId, quantity = 1) => {
                try {
                    const product = await shopify.fetchProduct(coffeeId);
                    if (product && product.variants.length > 0) {
                        await get().addItem(product, product.variants[0].id, quantity);
                    } else {
                        throw new Error('Produkt nie został znaleziony');
                    }
                } catch (error) {
                    console.error('Error adding coffee to cart:', error);
                    set({ error: 'Nie udało się dodać kawy do koszyka' });
                }
            },

            // Check if specific product is in cart
            isInCart: (productId) => {
                const { items } = get();
                return items.some(item => item.product.id === productId);
            },

            // Get quantity of specific product in cart
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
                items: state.items
            }),
            version: 1
        }
    )
);