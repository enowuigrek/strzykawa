import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { shopify } from '../services/shopify.js';

export const useCartStore = create(
    persist(
        (set, get) => ({
            // State
            cart: null,
            items: [],
            isLoading: false,
            error: null,

            // Initialize cart
            initializeCart: async () => {
                const { cart } = get();

                // If we have a cart ID, try to fetch it
                if (cart?.id) {
                    try {
                        const updatedCart = await shopify.getCart(cart.id);
                        if (updatedCart) {
                            set({
                                cart: updatedCart,
                                items: get().mapCartToItems(updatedCart)
                            });
                            return;
                        }
                    } catch (error) {
                        console.warn('Could not fetch existing cart, creating new one');
                    }
                }

                // Create new cart
                try {
                    const newCart = await shopify.createCart();
                    set({
                        cart: newCart,
                        items: []
                    });
                } catch (error) {
                    console.error('Failed to create cart:', error);
                    set({ error: 'Nie udało się utworzyć koszyka' });
                }
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
                            { key: 'roast_level', value: product.roastLevel || '' }
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
                        error: 'Nie udało się usunąć produktu z koszyka',
                        isLoading: false
                    });
                }
            },

            // Update quantity
            updateQuantity: async (lineId, quantity) => {
                if (quantity <= 0) {
                    return get().removeItem(lineId);
                }

                set({ isLoading: true, error: null });

                try {
                    const { cart } = get();
                    if (!cart) throw new Error('Brak koszyka');

                    const lines = [{ id: lineId, quantity }];
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

            // Clear cart
            clearCart: () => {
                set({
                    cart: null,
                    items: [],
                    error: null
                });
            },

            // Go to checkout
            goToCheckout: () => {
                const { cart } = get();
                if (cart?.checkoutUrl) {
                    window.location.href = cart.checkoutUrl;
                } else {
                    set({ error: 'Nie można przejść do płatności' });
                }
            },

            // Clear error
            clearError: () => {
                set({ error: null });
            },

            // Helper function to map Shopify cart to our items format
            mapCartToItems: (cart) => {
                if (!cart?.lines?.edges) return [];

                return cart.lines.edges.map(edge => {
                    const line = edge.node;
                    const product = line.merchandise.product;
                    const variant = line.merchandise;

                    return {
                        lineItemId: line.id,
                        product: {
                            id: product.id,
                            shopifyHandle: product.handle,
                            name: product.title,
                            image: product.images?.edges?.[0]?.node?.url || '',
                            price: parseFloat(variant.price.amount),
                            currencyCode: variant.price.currencyCode
                        },
                        variantId: variant.id,
                        variantTitle: variant.title,
                        quantity: line.quantity
                    };
                });
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
                    // First try to get product from Shopify
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