import ShopifyClient from './client.js';
import { fetchProducts, fetchProduct } from './products.js';
import { createCart, addToCart, updateCartLines, removeFromCart, getCart, updateCartAttributes } from './cart.js';
import { mapProduct } from './mapper.js';
import {
    registerCustomer,
    loginCustomer,
    logoutCustomer,
    getCustomer,
    getCustomerOrders,
    validateAccessToken
} from './customer.js';

class ShopifyService {
    constructor() {
        this.client = new ShopifyClient();

        // Bind methods to preserve context
        this.fetchProducts = this.fetchProducts.bind(this);
        this.fetchProduct = this.fetchProduct.bind(this);
        this.createCart = this.createCart.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.updateCartLines = this.updateCartLines.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.getCart = this.getCart.bind(this);
        this.mapProduct = this.mapProduct.bind(this);
    }

    // ========== PRODUCTS ==========

    async fetchProducts(limit = 20) {
        return fetchProducts(this.client, this.mapProduct, limit);
    }

    async fetchProduct(handle) {
        return fetchProduct(this.client, this.mapProduct, handle);
    }

    // ========== CART ==========

    async createCart() {
        return createCart(this.client);
    }

    async addToCart(cartId, lines) {
        return addToCart(this.client, cartId, lines);
    }

    async updateCartLines(cartId, lines) {
        return updateCartLines(this.client, cartId, lines);
    }

    async removeFromCart(cartId, lineIds) {
        return removeFromCart(this.client, cartId, lineIds);
    }

    async getCart(cartId) {
        return getCart(this.client, cartId);
    }

    async updateCartAttributes(cartId, attributes) {
        return updateCartAttributes(this.client, cartId, attributes);
    }

    // ========== MAPPER ==========

    mapProduct(product) {
        return mapProduct(product);
    }

    // ========== LEGACY ==========

    // For backward compatibility with old code
    async graphqlFetch(query, variables) {
        return this.client.graphqlFetch(query, variables);
    }
}

// Export singleton instance (backward compatible)
export const shopify = new ShopifyService();

// Export modules for direct access (future use)
export { ShopifyClient } from './client.js';
export { fetchProducts, fetchProduct } from './products.js';
export { createCart, addToCart, updateCartLines, removeFromCart, getCart, updateCartAttributes } from './cart.js';
export { mapProduct } from './mapper.js';
export {
    registerCustomer,
    loginCustomer,
    logoutCustomer,
    getCustomer,
    getCustomerOrders,
    validateAccessToken
} from './customer.js';