import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { QuantitySelector } from '../atoms/QuantitySelector';

/**
 * CartItem - Produkt w koszyku
 * REDESIGN:
 * - Sharp corners
 * - QuantitySelector zamiast +/- buttons
 * - Auto-remove przy quantity=0
 * - Neutral background (no rounded card)
 */
export function CartItem({ item, onUpdateQuantity, onRemove, isLoading }) {
    const { product, quantity, lineItemId } = item;

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity === 0) {
            onRemove(lineItemId);
        } else if (newQuantity > 0) {
            onUpdateQuantity(lineItemId, newQuantity);
        }
    };

    const handleRemove = () => onRemove(lineItemId);

    return (
        <div className="bg-primary-light/40 border border-white/5 px-4 py-3 lg:px-5 lg:py-4 mt-6">
            {/* Product row */}
            <div className="flex gap-4">
                {/* Image (sharp, no rounding) */}
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover bg-primary-dark/70 border border-white/10"
                />

                <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white truncate">{product.name}</h4>

                    {/* Variant pills */}
                    {item.selectedOptions?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {item.selectedOptions.map((option) => (
                                <span
                                    key={option.name}
                                    className="inline-flex items-center px-2 py-0.5 bg-accent/20 border border-accent/30 text-accent text-xs font-medium rounded-full"
                                >
                                    {option.value}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Tasting notes */}
                    {product.tastingNotes?.length > 0 && (
                        <p className="text-xs text-muted/80 truncate mt-1">
                            {product.tastingNotes.join(', ')}
                        </p>
                    )}
                </div>
            </div>

            {/* Bottom row */}
            <div className="flex items-center justify-between mt-4">

                {/* QuantitySelector */}
                <QuantitySelector
                    quantity={quantity}
                    onQuantityChange={handleQuantityChange}
                    disabled={isLoading}
                    size="md"
                />

                {/* Price + Remove */}
                <div className="flex items-center gap-3">
                    <span className="font-semibold text-white">
                        {(parseFloat(product.price) * quantity).toFixed(2)} zł
                    </span>

                    {/* Remove button */}
                    <button
                        onClick={handleRemove}
                        disabled={isLoading}
                        className="w-9 h-9 rounded-full bg-danger/15 hover:bg-danger/25 border border-danger/25 text-danger flex items-center justify-center transition-colors duration-200 disabled:opacity-50"
                        aria-label="Usuń z koszyka"
                    >
                        <FaTrash className="w-3 h-3" />
                    </button>
                </div>
            </div>
        </div>
    );
}