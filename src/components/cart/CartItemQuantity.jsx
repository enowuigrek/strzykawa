import React from 'react';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

export function CartItemQuantity({ quantity, product, isLoading, onQuantityChange, onRemove }) {
    return (
        <div className="flex items-center justify-between mt-4">
            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
                <button
                    onClick={() => onQuantityChange(quantity - 1)}
                    disabled={isLoading || quantity <= 1}
                    className="w-8 h-8 bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors duration-300 disabled:opacity-50 rounded"
                >
                    <FaMinus className="w-3 h-3" />
                </button>

                <span className="w-8 text-center font-semibold text-white">
                    {quantity}
                </span>

                <button
                    onClick={() => onQuantityChange(quantity + 1)}
                    disabled={isLoading}
                    className="w-8 h-8 bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors duration-300 disabled:opacity-50 rounded"
                >
                    <FaPlus className="w-3 h-3" />
                </button>
            </div>

            {/* Price & Remove */}
            <div className="flex items-center gap-3">
                <span className="font-semibold text-white">
                    {(parseFloat(product.price) * quantity).toFixed(2)} zł
                </span>

                <button
                    onClick={onRemove}
                    disabled={isLoading}
                    className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 flex items-center justify-center transition-colors duration-300 disabled:opacity-50 rounded"
                >
                    <FaTrash className="w-3 h-3" />
                </button>
            </div>
        </div>
    );
}