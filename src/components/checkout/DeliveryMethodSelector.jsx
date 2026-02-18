import React from 'react';
import PropTypes from 'prop-types';
import { FaTruck, FaBox, FaStore } from 'react-icons/fa';
import { SHIPPING_COST, FREE_SHIPPING_THRESHOLD } from '../../constants/shipping';

/**
 * DeliveryMethodSelector - Wybór metody dostawy (Kurier / Paczkomat / Odbiór osobisty)
 * @param {String} selectedMethod - Aktualna metoda ('kurier' | 'paczkomat' | 'odbior')
 * @param {Function} onChange - Callback do zmiany metody
 * @param {Number} subtotal - Suma produktów (do wyliczenia czy wysyłka gratis)
 */
export function DeliveryMethodSelector({ selectedMethod, onChange, subtotal = 0 }) {
    const methods = [
        {
            id: 'kurier',
            name: 'InPost Kurier',
            description: 'Dostawa kurierem InPost pod wskazany adres',
            price: SHIPPING_COST,
            alwaysFree: false,
            icon: FaTruck,
        },
        {
            id: 'paczkomat',
            name: 'InPost Paczkomat',
            description: 'Odbiór z paczkomatu InPost',
            price: SHIPPING_COST,
            alwaysFree: false,
            icon: FaBox,
        },
        {
            id: 'odbior',
            name: 'Odbiór osobisty',
            description: 'Kawiarnia Strzykawa · ul. Dąbrowskiego 4, Częstochowa · Pon–Pt 9–17, Sob 10–15',
            price: 0,
            alwaysFree: true,
            icon: FaStore,
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {methods.map((method) => {
                const Icon = method.icon;
                const isSelected = selectedMethod === method.id;

                return (
                    <button
                        key={method.id}
                        type="button"
                        onClick={() => onChange(method.id)}
                        className={`
                            p-6 border-2 transition-all duration-200
                            text-left hover:scale-[1.02]
                            ${
                                isSelected
                                    ? 'border-success bg-success/10'
                                    : 'border-accent/30 bg-primary hover:border-accent/50'
                            }
                        `}
                    >
                        <div className="flex items-start gap-4">
                            {/* ICON */}
                            <div
                                className={`
                                p-3
                                ${isSelected ? 'bg-success text-white' : 'bg-accent/20 text-accent'}
                            `}
                            >
                                <Icon size={24} />
                            </div>

                            {/* CONTENT */}
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="text-lg text-white">{method.name}</h3>
                                    <span
                                        className={`
                                        text-sm
                                        ${isSelected ? 'text-success' : 'text-muted'}
                                    `}
                                    >
                                        {method.alwaysFree || subtotal >= FREE_SHIPPING_THRESHOLD ? (
                                            <span className="text-success">Gratis!</span>
                                        ) : (
                                            `${method.price.toFixed(2)} zł`
                                        )}
                                    </span>
                                </div>
                                <p className="text-sm text-muted">{method.description}</p>
                            </div>

                            {/* CHECKMARK */}
                            {isSelected && (
                                <div className="flex-shrink-0">
                                    <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
                                        <svg
                                            className="w-4 h-4 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </div>
                    </button>
                );
            })}
        </div>
    );
}

DeliveryMethodSelector.propTypes = {
    selectedMethod: PropTypes.oneOf(['kurier', 'paczkomat', 'odbior']).isRequired,
    onChange: PropTypes.func.isRequired,
    subtotal: PropTypes.number,
};

DeliveryMethodSelector.defaultProps = {
    subtotal: 0,
};
