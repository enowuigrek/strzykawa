import React from 'react';
import { FaTimes, FaShoppingCart, FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import { useCartStore } from '../store/cartStore';

const CartModal = ({ isOpen, onClose }) => {
    const {
        items,
        isLoading,
        removeItem,
        updateQuantity,
        goToCheckout,
        getTotalItems,
        getTotalPrice
    } = useCartStore();

    if (!isOpen) return null;

    const handleCheckout = () => {
        goToCheckout();
        onClose();
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed right-0 top-0 h-full w-full max-w-md bg-primary-dark border-l border-white/20 z-50 shadow-2xl">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-accent/20 border border-accent/30">
                            <FaShoppingCart className="w-5 h-5 text-accent" />
                        </div>
                        <h2 className="text-xl font-bold text-white">
                            Koszyk ({getTotalItems()})
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 transition-colors duration-300 rounded"
                        aria-label="Zamknij koszyk"
                    >
                        <FaTimes className="w-5 h-5 text-white" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex flex-col h-full">

                    {/* Items List */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {items.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 border border-white/20 mb-4 rounded-full">
                                    <FaShoppingCart className="w-8 h-8 text-muted" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">Koszyk jest pusty</h3>
                                <p className="text-muted">Dodaj produkty, aby kontynuować zakupy</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {items.map((item, index) => (
                                    <CartItem
                                        key={`${item.product.id}-${item.variantId}-${index}`}
                                        item={item}
                                        onUpdateQuantity={updateQuantity}
                                        onRemove={removeItem}
                                        isLoading={isLoading}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer with Total & Checkout */}
                    {items.length > 0 && (
                        <div className="border-t border-white/10 p-6 bg-gradient-to-r from-primary-light/30 to-primary/30">

                            {/* Total */}
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-lg font-semibold text-white">Suma:</span>
                                <span className="text-xl font-bold text-white">
                  {getTotalPrice()} zł
                </span>
                            </div>

                            {/* Checkout Button */}
                            <button
                                onClick={handleCheckout}
                                disabled={isLoading || items.length === 0}
                                className="w-full py-4 bg-gradient-to-r from-accent to-muted hover:from-muted hover:to-accent text-white font-semibold text-lg transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-accent/25 rounded-lg"
                            >
                                {isLoading ? 'Ładowanie...' : 'Przejdź do płatności'}
                            </button>

                            <p className="text-xs text-muted text-center mt-3">
                                Zostaniesz przekierowany do bezpiecznej płatności Shopify
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

// ================================
// 2. CART ITEM COMPONENT
// ================================

const CartItem = ({ item, onUpdateQuantity, onRemove, isLoading }) => {
    const { product, variantId, quantity, lineItemId } = item;

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

            {/* Product Info */}
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

            {/* Quantity & Price Controls */}
            <div className="flex items-center justify-between mt-4">

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handleQuantityChange(quantity - 1)}
                        disabled={isLoading || quantity <= 1}
                        className="w-8 h-8 bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors duration-300 disabled:opacity-50 rounded"
                    >
                        <FaMinus className="w-3 h-3" />
                    </button>

                    <span className="w-8 text-center font-semibold text-white">
            {quantity}
          </span>

                    <button
                        onClick={() => handleQuantityChange(quantity + 1)}
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
                        onClick={handleRemove}
                        disabled={isLoading}
                        className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 flex items-center justify-center transition-colors duration-300 disabled:opacity-50 rounded"
                    >
                        <FaTrash className="w-3 h-3" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export { CartModal };