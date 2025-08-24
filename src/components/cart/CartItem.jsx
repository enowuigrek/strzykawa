import React from 'react';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import { CartItemInfo } from './CartItemInfo';
import { CartItemQuantity } from './CartItemQuantity';

export function CartItem({ item, onUpdateQuantity, onRemove, isLoading }) {
    const { product, quantity, lineItemId } = item;

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity > 0) {
            onUpdateQuantity(lineItemId, newQuantity);
        }
    };

    const handleRemove = () => {
        onRemove(lineItemId);
    };

    return (
        <div className="bg-gradient-to-r from-primary-light/30 to-primary/30 border border-white/10 p-4 rounded-lg">
            <CartItemInfo product={product} />

            <CartItemQuantity
                quantity={quantity}
                product={product}
                isLoading={isLoading}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemove}
            />
        </div>
    );
}