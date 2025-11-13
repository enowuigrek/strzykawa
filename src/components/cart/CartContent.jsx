import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { CartItem } from './CartItem';

/**
 * CartContent - Zawartość koszyka (lista produktów)
 * Używa CartItem który ma QuantitySelector
 */
export function CartContent({ items, isLoading, onUpdateQuantity, onRemove }) {
    return (
        <div className="flex-1 overflow-y-auto p-6 min-h-0">
            {items.length === 0 ? (
                <div className="text-center py-12">
                    {/* Empty state - sharp corners */}
                    <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
                        <FaShoppingCart className="w-8 h-8 text-muted" />
                    </div>
                    <h3 className="text-lg text-white mb-2">Koszyk jest pusty</h3>
                    <p className="text-muted">Dodaj produkty, aby kontynuować zakupy</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {items.map((item, index) => (
                        <CartItem
                            key={`${item.product.id}-${item.variantId}-${index}`}
                            item={item}
                            onUpdateQuantity={onUpdateQuantity}
                            onRemove={onRemove}
                            isLoading={isLoading}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}