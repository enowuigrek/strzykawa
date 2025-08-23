// ================================
// 1. SHOPIFY CLIENT SETUP
// ================================

// src/services/shopify.js
import Client from 'shopify-buy';

// Konfiguracja klienta Shopify
const client = Client.buildClient({
    domain: process.env.VITE_SHOPIFY_DOMAIN || 'strzykawa.myshopify.com',
    storefrontAccessToken: process.env.VITE_SHOPIFY_STOREFRONT_TOKEN
});

// ================================
// SHOPIFY API FUNCTIONS
// ================================

export const shopify = {
    // Pobieranie wszystkich produktów
    async fetchProducts() {
        try {
            const products = await client.product.fetchAll();
            return products.map(this.mapShopifyProduct);
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    },

    // Pobieranie pojedynczego produktu
    async fetchProduct(handle) {
        try {
            const product = await client.product.fetchByHandle(handle);
            return this.mapShopifyProduct(product);
        } catch (error) {
            console.error('Error fetching product:', error);
            return null;
        }
    },

    // Tworzenie checkout
    async createCheckout() {
        try {
            const checkout = await client.checkout.create();
            return checkout;
        } catch (error) {
            console.error('Error creating checkout:', error);
            return null;
        }
    },

    // Dodawanie produktów do checkout
    async addToCheckout(checkoutId, lineItemsToAdd) {
        try {
            const checkout = await client.checkout.addLineItems(checkoutId, lineItemsToAdd);
            return checkout;
        } catch (error) {
            console.error('Error adding to checkout:', error);
            return null;
        }
    },

    // Usuwanie z checkout
    async removeFromCheckout(checkoutId, lineItemIdsToRemove) {
        try {
            const checkout = await client.checkout.removeLineItems(checkoutId, lineItemIdsToRemove);
            return checkout;
        } catch (error) {
            console.error('Error removing from checkout:', error);
            return null;
        }
    },

    // Aktualizacja ilości
    async updateCheckout(checkoutId, lineItemsToUpdate) {
        try {
            const checkout = await client.checkout.updateLineItems(checkoutId, lineItemsToUpdate);
            return checkout;
        } catch (error) {
            console.error('Error updating checkout:', error);
            return null;
        }
    },

    // Customer authentication
    async createCustomerAccessToken(email, password) {
        try {
            const customerAccessToken = await client.customerAccessToken.create({
                email,
                password
            });
            return customerAccessToken;
        } catch (error) {
            console.error('Error logging in:', error);
            return null;
        }
    },

    // Tworzenie konta klienta
    async createCustomer(email, password, firstName, lastName) {
        try {
            const customer = await client.customer.create({
                email,
                password,
                firstName,
                lastName
            });
            return customer;
        } catch (error) {
            console.error('Error creating customer:', error);
            return null;
        }
    },

    // Mapowanie produktu Shopify na nasz format
    mapShopifyProduct(shopifyProduct) {
        if (!shopifyProduct) return null;

        return {
            id: shopifyProduct.id,
            shopifyHandle: shopifyProduct.handle,
            name: shopifyProduct.title,
            description: shopifyProduct.description,
            image: shopifyProduct.images?.[0]?.src || '',
            images: shopifyProduct.images?.map(img => img.src) || [],
            price: shopifyProduct.variants?.[0]?.price || 0,
            compareAtPrice: shopifyProduct.variants?.[0]?.compareAtPrice || null,
            available: shopifyProduct.availableForSale,
            variants: shopifyProduct.variants?.map(variant => ({
                id: variant.id,
                title: variant.title,
                price: variant.price,
                available: variant.available,
                sku: variant.sku,
                weight: variant.weight,
                selectedOptions: variant.selectedOptions
            })) || [],
            // Mapowanie metafields (dodatkowe dane o kawie)
            origin: this.getMetafield(shopifyProduct, 'origin'),
            roastLevel: this.getMetafield(shopifyProduct, 'roast_level'),
            tastingNotes: this.getMetafield(shopifyProduct, 'tasting_notes')?.split(',') || [],
            processing: this.getMetafield(shopifyProduct, 'processing'),
            // Dodajemy availability flags na podstawie tagów
            availability: {
                espressoGrinders: shopifyProduct.tags?.includes('espresso-grinders') || false,
                quickFilter: shopifyProduct.tags?.includes('quick-filter') || false,
                brewBar: shopifyProduct.tags?.includes('brew-bar') || false,
                retailShelf: shopifyProduct.tags?.includes('retail-shelf') || false,
            }
        };
    },

    // Helper do pobierania metafields
    getMetafield(product, key) {
        return product.metafields?.find(field => field.key === key)?.value;
    }
};

// ================================
// 2. CART STORE (ZUSTAND)
// ================================

// src/store/cartStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { shopify } from '../services/shopify';

export const useCartStore = create(
    persist(
        (set, get) => ({
            // Stan
            items: [],
            checkout: null,
            isLoading: false,

            // Inicjalizacja checkout
            initializeCheckout: async () => {
                const { checkout } = get();
                if (!checkout) {
                    const newCheckout = await shopify.createCheckout();
                    set({ checkout: newCheckout });
                }
            },

            // Dodawanie do koszyka
            addItem: async (product, variantId, quantity = 1) => {
                set({ isLoading: true });

                try {
                    await get().initializeCheckout();
                    const { checkout } = get();

                    const lineItemsToAdd = [{
                        variantId: variantId,
                        quantity: quantity,
                        customAttributes: [
                            { key: 'product_name', value: product.name },
                            { key: 'roast_level', value: product.roastLevel || '' }
                        ]
                    }];

                    const updatedCheckout = await shopify.addToCheckout(checkout.id, lineItemsToAdd);

                    // Aktualizujemy lokalny stan
                    const existingItem = get().items.find(item =>
                        item.product.id === product.id && item.variantId === variantId
                    );

                    if (existingItem) {
                        set({
                            items: get().items.map(item =>
                                item.product.id === product.id && item.variantId === variantId
                                    ? { ...item, quantity: item.quantity + quantity }
                                    : item
                            ),
                            checkout: updatedCheckout
                        });
                    } else {
                        set({
                            items: [...get().items, { product, variantId, quantity }],
                            checkout: updatedCheckout
                        });
                    }
                } catch (error) {
                    console.error('Error adding to cart:', error);
                } finally {
                    set({ isLoading: false });
                }
            },

            // Usuwanie z koszyka
            removeItem: async (lineItemId) => {
                set({ isLoading: true });

                try {
                    const { checkout } = get();
                    const updatedCheckout = await shopify.removeFromCheckout(checkout.id, [lineItemId]);

                    set({
                        items: get().items.filter(item => item.lineItemId !== lineItemId),
                        checkout: updatedCheckout
                    });
                } catch (error) {
                    console.error('Error removing from cart:', error);
                } finally {
                    set({ isLoading: false });
                }
            },

            // Aktualizacja ilości
            updateQuantity: async (lineItemId, quantity) => {
                set({ isLoading: true });

                try {
                    const { checkout } = get();
                    const lineItemsToUpdate = [{ id: lineItemId, quantity }];

                    const updatedCheckout = await shopify.updateCheckout(checkout.id, lineItemsToUpdate);

                    set({
                        items: get().items.map(item =>
                            item.lineItemId === lineItemId
                                ? { ...item, quantity }
                                : item
                        ),
                        checkout: updatedCheckout
                    });
                } catch (error) {
                    console.error('Error updating quantity:', error);
                } finally {
                    set({ isLoading: false });
                }
            },

            // Przejście do checkout
            goToCheckout: () => {
                const { checkout } = get();
                if (checkout?.webUrl) {
                    window.location.href = checkout.webUrl;
                }
            },

            // Wyczyszczenie koszyka
            clearCart: () => {
                set({ items: [], checkout: null });
            },

            // Gettery
            getTotalItems: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },

            getTotalPrice: () => {
                return get().checkout?.totalPrice || 0;
            }
        }),
        {
            name: 'strzykawa-cart',
            partialize: (state) => ({
                items: state.items,
                checkout: state.checkout
            })
        }
    )
);

// ================================
// 3. USER AUTHENTICATION STORE
// ================================

// src/store/authStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { shopify } from '../services/shopify';

export const useAuthStore = create(
    persist(
        (set, get) => ({
            // Stan
            user: null,
            customerAccessToken: null,
            isLoading: false,
            isLoggedIn: false,

            // Logowanie
            login: async (email, password) => {
                set({ isLoading: true });

                try {
                    const tokenResult = await shopify.createCustomerAccessToken(email, password);

                    if (tokenResult?.customerAccessToken?.accessToken) {
                        const token = tokenResult.customerAccessToken.accessToken;

                        // Pobierz dane użytkownika (opcjonalnie)
                        // const customer = await shopify.getCustomer(token);

                        set({
                            customerAccessToken: token,
                            isLoggedIn: true,
                            user: { email } // Można rozszerzyć o więcej danych
                        });

                        return { success: true };
                    } else {
                        return {
                            success: false,
                            error: tokenResult?.customerUserErrors?.[0]?.message || 'Błąd logowania'
                        };
                    }
                } catch (error) {
                    console.error('Login error:', error);
                    return { success: false, error: 'Wystąpił błąd podczas logowania' };
                } finally {
                    set({ isLoading: false });
                }
            },

            // Rejestracja
            register: async (email, password, firstName, lastName) => {
                set({ isLoading: true });

                try {
                    const result = await shopify.createCustomer(email, password, firstName, lastName);

                    if (result?.customer) {
                        // Po rejestracji automatycznie zaloguj
                        const loginResult = await get().login(email, password);
                        return loginResult;
                    } else {
                        return {
                            success: false,
                            error: result?.customerUserErrors?.[0]?.message || 'Błąd rejestracji'
                        };
                    }
                } catch (error) {
                    console.error('Registration error:', error);
                    return { success: false, error: 'Wystąpił błąd podczas rejestracji' };
                } finally {
                    set({ isLoading: false });
                }
            },

            // Wylogowanie
            logout: () => {
                set({
                    user: null,
                    customerAccessToken: null,
                    isLoggedIn: false
                });
            }
        }),
        {
            name: 'strzykawa-auth',
            partialize: (state) => ({
                user: state.user,
                customerAccessToken: state.customerAccessToken,
                isLoggedIn: state.isLoggedIn
            })
        }
    )
);

// ================================
// 4. UPDATED HEADER COMPONENT
// ================================

// src/components/Header.jsx - Fragment z dodatkami
import { FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';

// Dodaj do istniejącego Header.jsx w sekcji Desktop Navigation:

const HeaderCartAndAuth = () => {
    const totalItems = useCartStore(state => state.getTotalItems());
    const { isLoggedIn, user, logout } = useAuthStore();
    const [showUserMenu, setShowUserMenu] = useState(false);

    return (
        <div className="flex items-center space-x-4 ml-6">
            {/* Cart Icon */}
            <button
                onClick={() => setShowCartModal(true)}
                className="relative p-2 text-white hover:text-muted transition-colors duration-300 hover:scale-110"
                aria-label={`Koszyk - ${totalItems} produktów`}
            >
                <FaShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
            {totalItems}
          </span>
                )}
            </button>

            {/* User Menu */}
            <div className="relative">
                <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 p-2 text-white hover:text-muted transition-colors duration-300 hover:scale-110"
                >
                    <FaUser className="w-5 h-5" />
                    {isLoggedIn && <span className="text-sm">{user?.email?.split('@')[0]}</span>}
                </button>

                {/* User Dropdown */}
                {showUserMenu && (
                    <div className="absolute right-0 top-12 w-48 bg-primary-dark/95 backdrop-blur-md border border-white/20 shadow-2xl z-50">
                        {isLoggedIn ? (
                            <>
                                <div className="px-4 py-3 border-b border-white/10">
                                    <p className="text-sm text-muted">Zalogowany jako:</p>
                                    <p className="text-white font-medium">{user?.email}</p>
                                </div>
                                <button
                                    onClick={() => {
                                        logout();
                                        setShowUserMenu(false);
                                    }}
                                    className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors flex items-center gap-2"
                                >
                                    <FaSignOutAlt className="w-4 h-4" />
                                    Wyloguj się
                                </button>
                            </>
                        ) : (
                            <div className="p-2">
                                <button
                                    onClick={() => {
                                        setShowLoginModal(true);
                                        setShowUserMenu(false);
                                    }}
                                    className="w-full px-3 py-2 text-white hover:bg-white/10 transition-colors rounded mb-1"
                                >
                                    Zaloguj się
                                </button>
                                <button
                                    onClick={() => {
                                        setShowRegisterModal(true);
                                        setShowUserMenu(false);
                                    }}
                                    className="w-full px-3 py-2 text-white hover:bg-white/10 transition-colors rounded"
                                >
                                    Utwórz konto
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};