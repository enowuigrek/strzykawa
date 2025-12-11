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
                    const grindMethod = line.attributes?.find(attr => attr.key === 'grind_method')?.value || null;

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
                        grindMethod: grindMethod,
                        quantity: line.quantity
                    };
                });
            },

            // Add item to cart
            addItem: async (product, variantId, quantity = 1, grindMethod = null) => {
                set({ isLoading: true, error: null });

                try {
                    await get().initializeCart();
                    const { cart } = get();

                    if (!cart) {
                        throw new Error('Brak koszyka');
                    }

                    const attributes = [
                        { key: 'product_name', value: product.name },
                        { key: 'roast_level', value: product.roastLevel || '' },
                    ];

                    // Dodaj grind_method tylko jeśli został wybrany
                    if (grindMethod) {
                        attributes.push({ key: 'grind_method', value: grindMethod });
                    }

                    const lines = [{
                        merchandiseId: variantId,
                        quantity: quantity,
                        attributes: attributes
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

            // Go to checkout (with optional user data for pre-fill)
            goToCheckout: (user = null) => {
                const { cart } = get();
                if (!cart?.checkoutUrl) {
                    logger.error('No checkout URL available');
                    return;
                }

                let checkoutUrl = cart.checkoutUrl;

                // Pre-fill checkout with user data if logged in
                if (user) {
                    const params = new URLSearchParams();

                    // Email
                    if (user.email) {
                        params.append('checkout[email]', user.email);
                    }

                    // Shipping address - first name and last name
                    if (user.firstName) {
                        params.append('checkout[shipping_address][first_name]', user.firstName);
                    }
                    if (user.lastName) {
                        params.append('checkout[shipping_address][last_name]', user.lastName);
                    }

                    // Default address (if exists)
                    if (user.defaultAddress) {
                        const addr = user.defaultAddress;
                        if (addr.address1) {
                            params.append('checkout[shipping_address][address1]', addr.address1);
                        }
                        if (addr.address2) {
                            params.append('checkout[shipping_address][address2]', addr.address2);
                        }
                        if (addr.city) {
                            params.append('checkout[shipping_address][city]', addr.city);
                        }
                        if (addr.province) {
                            params.append('checkout[shipping_address][province]', addr.province);
                        }
                        if (addr.zip) {
                            params.append('checkout[shipping_address][zip]', addr.zip);
                        }
                        if (addr.country) {
                            params.append('checkout[shipping_address][country]', addr.country);
                        }
                        // Phone from address (not from user.phone)
                        if (addr.phone) {
                            params.append('checkout[shipping_address][phone]', addr.phone);
                        }
                    }

                    // Append params to checkout URL
                    const separator = checkoutUrl.includes('?') ? '&' : '?';
                    checkoutUrl = `${checkoutUrl}${separator}${params.toString()}`;

                    logger.log('Pre-filling checkout with user data:', {
                        email: user.email,
                        name: `${user.firstName} ${user.lastName}`,
                        hasAddress: !!user.defaultAddress
                    });
                }

                // Clear cart BEFORE redirect to prevent "zombie cart" on return
                // Mark checkout as pending and redirect
                set({ cart: null, items: [], status: 'pending' });
                window.location.href = checkoutUrl;
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