import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { QuantitySelector } from '../atoms/QuantitySelector';

/**
 * CartItem - Produkt w koszyku
 * REDESIGN:
 * - Sharp corners
 * - QuantitySelector zamiast +/- buttons
 * - Auto-remove przy quantity=0
 */
export function CartItem({ item, onUpdateQuantity, onRemove, isLoading }) {
    const { product, quantity, lineItemId } = item;

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity === 0) {
            // Auto-remove przy 0
            onRemove(lineItemId);
        } else if (newQuantity > 0) {
            onUpdateQuantity(lineItemId, newQuantity);
        }
    };

    const handleRemove = () => {
        onRemove(lineItemId);
    };

    return (
        <div className="bg-gradient-to-r from-primary-light/30 to-primary/30 border border-white/10 p-4">
            {/* Product Info */}
            <div className="flex gap-4">
                {/* Image - sharp corners */}
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover border border-white/10"
                />

                <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white truncate">{product.name}</h4>

                    {/* Variant info - Gramatura + Typ jako pastylki */}
                    {item.selectedOptions && item.selectedOptions.length > 0 && (
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

                    {product.tastingNotes && product.tastingNotes.length > 0 && (
                        <p className="text-xs text-muted/80 truncate mt-1">
                            {product.tastingNotes.join(', ')}
                        </p>
                    )}
                </div>
            </div>

            {/* Quantity & Price Controls */}
            <div className="flex items-center justify-between mt-4">
                {/* QuantitySelector - pastylki (rounded-full) */}
                <QuantitySelector
                    quantity={quantity}
                    onQuantityChange={handleQuantityChange}
                    disabled={isLoading}
                    size="md"
                />

                {/* Price & Remove */}
                <div className="flex items-center gap-3">
                    <span className="font-semibold text-white">
                        {(parseFloat(product.price) * quantity).toFixed(2)} zł
                    </span>

                    {/* Remove button - sharp corners */}
                    <button
                        onClick={handleRemove}
                        disabled={isLoading}
                        className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 flex items-center justify-center transition-colors duration-300 disabled:opacity-50"
                        aria-label="Usuń z koszyka"
                    >
                        <FaTrash className="w-3 h-3" />
                    </button>
                </div>
            </div>
        </div>
    );
}