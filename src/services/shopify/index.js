/**
 * Shopify Service - Main Export
 * Provides backward-compatible API with modular structure
 */

import ShopifyClient from './client.js';
import { fetchProducts, fetchProduct } from './products.js';
import { createCart, addToCart, updateCartLines, removeFromCart, getCart } from './cart.js';
import { mapProduct } from './mapper.js';
import { getMockResponse } from './mocks.js';

/**
 * Shopify Service Class
 * Combines all modules into single service
 */
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
        if (this.client.useMockData) {
            const mockData = await getMockResponse('products', { first: limit });
            return mockData.data.products.edges.map(edge => this.mapProduct(edge.node));
        }
        return fetchProducts(this.client, this.mapProduct, limit);
    }

    async fetchProduct(handle) {
        if (this.client.useMockData) {
            const mockData = await getMockResponse('products', {});
            const product = mockData.data.products.edges[0]?.node;
            return product ? this.mapProduct(product) : null;
        }
        return fetchProduct(this.client, this.mapProduct, handle);
    }

    // ========== CART ==========

    async createCart() {
        if (this.client.useMockData) {
            return getMockResponse('cartCreate', {}).then(r => r.data.cartCreate.cart);
        }
        return createCart(this.client);
    }

    async addToCart(cartId, lines) {
        if (this.client.useMockData) {
            throw new Error('Cart operations not supported in mock mode');
        }
        return addToCart(this.client, cartId, lines);
    }

    async updateCartLines(cartId, lines) {
        if (this.client.useMockData) {
            throw new Error('Cart operations not supported in mock mode');
        }
        return updateCartLines(this.client, cartId, lines);
    }

    async removeFromCart(cartId, lineIds) {
        if (this.client.useMockData) {
            throw new Error('Cart operations not supported in mock mode');
        }
        return removeFromCart(this.client, cartId, lineIds);
    }

    async getCart(cartId) {
        if (this.client.useMockData) {
            throw new Error('Cart operations not supported in mock mode');
        }
        return getCart(this.client, cartId);
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

    getMockResponse(query, variables) {
        return getMockResponse(query, variables);
    }

    get useMockData() {
        return this.client.useMockData;
    }
}

// Export singleton instance (backward compatible)
export const shopify = new ShopifyService();

// Export modules for direct access (future use)
export { ShopifyClient } from './client.js';
export { fetchProducts, fetchProduct } from './products.js';
export { createCart, addToCart, updateCartLines, removeFromCart, getCart } from './cart.js';
export { mapProduct } from './mapper.js';
export { getMockResponse } from './mocks.js';