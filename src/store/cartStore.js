import { create } from 'zustand';
import coffees from '../data/coffees.js';

// Generate mock line item IDs
const generateLineItemId = () => `line-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const useCartStore = create((set, get) => ({
    // State
    items: [],
    isLoading: false,
    checkoutUrl: null,

    // Actions
    addItem: (productId, variantId = 'default', quantity = 1) => {
        const product = coffees.find(c => c.id === productId);
        if (!product) return;

        const { items } = get();
        const existingItemIndex = items.findIndex(
            item => item.product.id === productId && item.variantId === variantId
        );

        if (existingItemIndex >= 0) {
            // Update existing item quantity
            const updatedItems = [...items];
            updatedItems[existingItemIndex].quantity += quantity;
            set({ items: updatedItems });
        } else {
            // Add new item
            const newItem = {
                lineItemId: generateLineItemId(),
                product: {
                    id: product.id,
                    name: product.name,
                    image: product.image,
                    price: '24.99', // Mock price in PLN
                    roastLevel: product.roastLevel,
                    tastingNotes: product.tastingNotes
                },
                variantId,
                quantity
            };

            set({ items: [...items, newItem] });
        }
    },

    removeItem: (lineItemId) => {
        const { items } = get();
        const updatedItems = items.filter(item => item.lineItemId !== lineItemId);
        set({ items: updatedItems });
    },

    updateQuantity: (lineItemId, newQuantity) => {
        if (newQuantity <= 0) {
            get().removeItem(lineItemId);
            return;
        }

        const { items } = get();
        const updatedItems = items.map(item =>
            item.lineItemId === lineItemId
                ? { ...item, quantity: newQuantity }
                : item
        );
        set({ items: updatedItems });
    },

    clearCart: () => {
        set({ items: [] });
    },

    // Getters
    getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
    },

    getTotalPrice: () => {
        const { items } = get();
        const total = items.reduce((sum, item) => {
            return sum + (parseFloat(item.product.price) * item.quantity);
        }, 0);
        return total.toFixed(2);
    },

    // Mock Shopify checkout
    goToCheckout: async () => {
        set({ isLoading: true });

        try {
            // Mock API delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            const { items } = get();
            if (items.length === 0) {
                throw new Error('Koszyk jest pusty');
            }

            // In real Shopify integration, this would create checkout session
            const mockCheckoutUrl = `https://strzykawa.myshopify.com/checkout?items=${encodeURIComponent(JSON.stringify(items))}`;

            set({
                checkoutUrl: mockCheckoutUrl,
                isLoading: false
            });

            // Simulate redirect to checkout
            alert(`Przekierowanie do płatności...\nSuma: ${get().getTotalPrice()} zł\nProdukty: ${get().getTotalItems()}`);

            // In real app, you would redirect:
            // window.location.href = mockCheckoutUrl;

        } catch (error) {
            set({ isLoading: false });
            console.error('Błąd podczas przechodzenia do płatności:', error);
        }
    },

    // Quick add methods for coffee products
    addCoffeeToCart: (coffeeId, quantity = 1) => {
        get().addItem(coffeeId, 'default', quantity);
    },

    // Check if specific coffee is in cart
    isInCart: (coffeeId) => {
        const { items } = get();
        return items.some(item => item.product.id === coffeeId);
    },

    // Get quantity of specific coffee in cart
    getItemQuantity: (coffeeId) => {
        const { items } = get();
        const item = items.find(item => item.product.id === coffeeId);
        return item ? item.quantity : 0;
    }
}));