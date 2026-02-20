import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { QuantitySelector } from '../atoms/QuantitySelector';

/**
 * Helper: Kapitalizuje pierwszy wyraz w liście
 */
const capitalizeFirst = (items) => {
    if (!items || items.length === 0) return '';
    const capitalized = items.map((item, index) =>
        index === 0 ? item.charAt(0).toUpperCase() + item.slice(1) : item
    );
    return capitalized.join(', ');
};

/**
 * CartItem - Produkt w koszyku
 * REDESIGN v3:
 * - Zmniejszony QuantitySelector (size="sm")
 * - Ciemniejsze zielone pastylki (jak na przykładzie)
 * - Biały tekst na ciemnym tle
 * - Klikalne zdjęcie i nazwa (przejście do produktu)
 */
export function CartItem({ item, onUpdateQuantity, onRemove, isLoading, onCloseCart }) {
    const { product, quantity, lineItemId } = item;
    const navigate = useNavigate();

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity === 0) {
            onRemove(lineItemId);
        } else if (newQuantity > 0) {
            onUpdateQuantity(lineItemId, newQuantity);
        }
    };

    const handleRemove = () => onRemove(lineItemId);

    const handleNavigateToProduct = () => {
        if (product.handle) {
            if (onCloseCart) onCloseCart();
            navigate(`/kawy/${product.handle}`);
        }
    };

    const isClickable = !!product.handle;

    return (
        <div className="relative bg-primary-light/40 px-4 py-3 lg:px-5 lg:py-4 mt-6">
            {/* Remove button — top right corner */}
            <button
                onClick={handleRemove}
                disabled={isLoading}
                className="absolute top-2 right-2 w-7 h-7 text-white/30 hover:text-danger flex items-center justify-center transition-colors duration-200 disabled:opacity-50"
                aria-label="Usuń z koszyka"
            >
                <FaTrash className="w-2.5 h-2.5" />
            </button>

            {/* Product row */}
            <div className="flex gap-4 pr-6">
                {/* Image (sharp, no rounding) - clickable */}
                <img
                    src={product.image}
                    alt={product.name}
                    onClick={handleNavigateToProduct}
                    className={`w-16 h-16 object-cover bg-primary-dark/70 border border-white/10 ${isClickable ? 'cursor-pointer hover:opacity-80 transition-opacity duration-200' : ''}`}
                />

                <div className="flex-1 min-w-0">
                    <h4
                        onClick={handleNavigateToProduct}
                        className={`text-white truncate ${isClickable ? 'cursor-pointer hover:text-accent transition-colors duration-200' : ''}`}
                    >
                        {product.name}
                    </h4>

                    {/* Variant pills - ciemny zielony jak na przykładzie */}
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {/* Gramatura - zawsze pokazuj (z Shopify lub domyślna 250g) */}
                        {(() => {
                            const gramatura = item.selectedOptions?.find(opt => opt.name === 'Gramatura')?.value || '250g';
                            return (
                                <span className="inline-flex items-center px-3 py-1 bg-primary-light text-white text-sm font-medium rounded-full">
                                    {gramatura}
                                </span>
                            );
                        })()}
                        {/* Forma kawy: "Ziarna" lub sam sposób mielenia */}
                        {item.coffeeForm === 'ziarna' ? (
                            <span className="inline-flex items-center px-3 py-1 bg-primary-light text-white text-sm font-medium rounded-full">
                                Ziarna
                            </span>
                        ) : item.grindMethod ? (
                            <span className="inline-flex items-center px-3 py-1 bg-primary-light text-white text-sm font-medium rounded-full">
                                {item.grindMethod}
                            </span>
                        ) : null}
                    </div>

                    {/* Tasting notes - z wielką literą na początku */}
                    {product.tastingNotes?.length > 0 && (
                        <p className="text-sm text-muted/80 truncate mt-1">
                            {capitalizeFirst(product.tastingNotes)}
                        </p>
                    )}
                </div>
            </div>

            {/* Bottom row */}
            <div className="flex items-center justify-between mt-4">

                {/* QuantitySelector - SIZE SM (mniejszy!) */}
                <QuantitySelector
                    quantity={quantity}
                    onQuantityChange={handleQuantityChange}
                    disabled={isLoading}
                    size="sm"
                />

                {/* Price */}
                <div className="text-right">
                    <span className="text-white">
                        {(parseFloat(product.price) * quantity).toFixed(2)} zł
                    </span>
                    {quantity > 1 && (
                        <p className="text-xs text-white/50">
                            {quantity} × {parseFloat(product.price).toFixed(2)} zł
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

CartItem.propTypes = {
    item: PropTypes.shape({
        lineItemId: PropTypes.string.isRequired,
        product: PropTypes.shape({
            name: PropTypes.string.isRequired,
            handle: PropTypes.string,
            image: PropTypes.string,
            price: PropTypes.number.isRequired,
            tastingNotes: PropTypes.arrayOf(PropTypes.string),
        }).isRequired,
        quantity: PropTypes.number.isRequired,
        selectedOptions: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
                value: PropTypes.string,
            })
        ),
    }).isRequired,
    onUpdateQuantity: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    onCloseCart: PropTypes.func,
};
