import React from 'react';

export function CartItemInfo({ product }) {
    return (
        <div className="flex gap-4">
            <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 object-cover border border-white/10 rounded"
            />

            <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-white truncate">{product.name}</h4>
                <p className="text-sm text-muted">{product.roastLevel}</p>

                {product.tastingNotes && product.tastingNotes.length > 0 && (
                    <p className="text-xs text-muted/80 truncate">
                        {product.tastingNotes.join(', ')}
                    </p>
                )}
            </div>
        </div>
    );
}