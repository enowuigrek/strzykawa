import React from 'react';
import PropTypes from 'prop-types';
import { FREE_SHIPPING_THRESHOLD, SHIPPING_COST, CURRENCY_SYMBOL } from '../../constants/shipping';
import { Spinner } from '../atoms/Spinner';

/**
 * CheckoutOrderSummary - Podsumowanie zamówienia w checkout
 * @param {Array} items - Lista produktów w koszyku
 * @param {String} deliveryMethod - Metoda dostawy ('kurier' | 'paczkomat')
 * @param {Function} onGoToPayment - Callback do przejścia do płatności
 * @param {Boolean} isProcessing - Stan przetwarzania
 * @param {Boolean} isReady - Czy formularz jest gotowy
 */
export function CheckoutOrderSummary({
    items,
    deliveryMethod,
    onGoToPayment,
    isProcessing,
    isReady,
}) {
    // ===== CALCULATE PRICES =====
    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    // Koszt wysyłki (jedna cena dla obu metod)
    const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;

    const total = subtotal + shippingCost;

    // ===== RENDER =====
    return (
        <div className="space-y-6">
            {/* PRODUKTY */}
            <div className="space-y-3">
                {items.map((item) => (
                    <div key={item.lineItemId} className="flex gap-3">
                        {/* Image */}
                        <div className="w-16 h-16 bg-primary rounded overflow-hidden flex-shrink-0">
                            {item.product.image && (
                                <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                            <h3 className="text-white text-sm  truncate">
                                {item.product.name}
                            </h3>
                            <p className="text-xs text-muted">{item.variantTitle}</p>
                            {item.grindMethod && (
                                <p className="text-xs text-muted">Mielenie: {item.grindMethod}</p>
                            )}
                            <p className="text-sm text-white  mt-1">
                                {item.quantity} × {item.product.price.toFixed(2)} {CURRENCY_SYMBOL}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* SEPARATOR */}
            <div className="border-t border-accent/20" />

            {/* PRICES */}
            <div className="space-y-2">
                {/* Subtotal */}
                <div className="flex justify-between text-sm">
                    <span className="text-muted">Suma częściowa:</span>
                    <span className="text-white">
                        {subtotal.toFixed(2)} {CURRENCY_SYMBOL}
                    </span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between text-sm">
                    <span className="text-muted">Dostawa ({deliveryMethod}):</span>
                    <span className="text-white">
                        {shippingCost === 0 ? (
                            <span className="text-success ">Gratis!</span>
                        ) : (
                            `${shippingCost.toFixed(2)} ${CURRENCY_SYMBOL}`
                        )}
                    </span>
                </div>

                {/* Free shipping progress */}
                {subtotal < FREE_SHIPPING_THRESHOLD && (
                    <div className="p-3 bg-accent/10 border border-accent/30 rounded-lg">
                        <p className="text-xs text-muted">
                            Do darmowej wysyłki brakuje:{' '}
                            <span className="text-white ">
                                {(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)} {CURRENCY_SYMBOL}
                            </span>
                        </p>
                    </div>
                )}

                {/* Free shipping achieved */}
                {subtotal >= FREE_SHIPPING_THRESHOLD && (
                    <div className="p-3 bg-success/10 border border-success rounded-lg">
                        <p className="text-xs text-success ">
                            🎉 Gratulacje! Masz darmową wysyłkę!
                        </p>
                    </div>
                )}
            </div>

            {/* SEPARATOR */}
            <div className="border-t border-accent/20" />

            {/* TOTAL */}
            <div className="flex justify-between items-center">
                <span className="text-lg  text-white">Razem:</span>
                <span className="text-2xl  text-white">
                    {total.toFixed(2)} {CURRENCY_SYMBOL}
                </span>
            </div>

            {/* GO TO PAYMENT BUTTON */}
            <button
                type="button"
                onClick={onGoToPayment}
                disabled={!isReady || isProcessing}
                className={`
                    w-full py-4
                    rounded-full
                     text-lg
                    transition-all duration-200
                    ${
                        isReady && !isProcessing
                            ? 'bg-cta text-white hover:bg-cta-hover hover:scale-[1.02]'
                            : 'bg-accent/30 text-muted cursor-not-allowed'
                    }
                `}
            >
                {isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                        <Spinner size="sm" />
                        Przetwarzanie...
                    </span>
                ) : (
                    'Przejdź do płatności'
                )}
            </button>

            {/* HINT */}
            {!isReady && (
                <p className="text-xs text-muted text-center">
                    Wypełnij wszystkie wymagane pola, aby przejść do płatności
                </p>
            )}
        </div>
    );
}

CheckoutOrderSummary.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            lineItemId: PropTypes.string.isRequired,
            product: PropTypes.shape({
                name: PropTypes.string.isRequired,
                price: PropTypes.number.isRequired,
                image: PropTypes.string,
            }).isRequired,
            variantTitle: PropTypes.string.isRequired,
            grindMethod: PropTypes.string,
            quantity: PropTypes.number.isRequired,
        })
    ).isRequired,
    deliveryMethod: PropTypes.oneOf(['kurier', 'paczkomat']).isRequired,
    onGoToPayment: PropTypes.func.isRequired,
    isProcessing: PropTypes.bool,
    isReady: PropTypes.bool,
};

CheckoutOrderSummary.defaultProps = {
    isProcessing: false,
    isReady: false,
};
