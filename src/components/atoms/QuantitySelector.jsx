import React from 'react';
import PropTypes from 'prop-types';
import { FiMinus, FiPlus } from 'react-icons/fi';

/**
 * QuantitySelector - Selector ilości produktu jako jedna pastylka
 * Minus (półkolo) | Liczba | Plus (półkolo)
 */
export function QuantitySelector({
                                     quantity = 1,
                                     onQuantityChange,
                                     min = 1,
                                     max = 99,
                                     disabled = false,
                                     size = 'md'
                                 }) {
    const handleDecrease = () => {
        if (quantity > min && !disabled) {
            onQuantityChange(quantity - 1);
        }
    };

    const handleIncrease = () => {
        if (quantity < max && !disabled) {
            onQuantityChange(quantity + 1);
        }
    };

    const handleInputChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= min && value <= max) {
            onQuantityChange(value);
        }
    };

    // Size variants
    const sizeClasses = {
        sm: 'h-8',
        md: 'h-10',
        lg: 'h-12'
    };

    const buttonSizeClasses = {
        sm: 'w-6',
        md: 'w-8',
        lg: 'w-10'
    };

    const inputSizeClasses = {
        sm: 'w-8 text-sm',
        md: 'w-10 text-base',
        lg: 'w-14 text-lg'
    };

    return (
        <div className={`inline-flex items-center bg-primary-light border border-accent/30 rounded-full overflow-hidden ${sizeClasses[size]}`}>
            {/* Decrease Button - Left semicircle */}
            <button
                type="button"
                onClick={handleDecrease}
                disabled={disabled || quantity <= min}
                className={`
                    ${buttonSizeClasses[size]} ${sizeClasses[size]}
                    flex items-center justify-center
                    text-white
                    hover:bg-accent/20
                    active:bg-accent/30
                    transition-all duration-200
                    disabled:opacity-40 disabled:cursor-not-allowed
                    disabled:hover:bg-transparent
                `}
                aria-label="Zmniejsz ilość"
            >
                <FiMinus className="w-4 h-4" />
            </button>

            {/* Quantity Input - Center */}
            <input
                type="number"
                value={quantity}
                onChange={handleInputChange}
                min={min}
                max={max}
                disabled={disabled}
                className={`
                    ${inputSizeClasses[size]} ${sizeClasses[size]}
                    bg-transparent
                    text-white text-center
                    focus:outline-none
                    [-moz-appearance:textfield]
                    [&::-webkit-outer-spin-button]:appearance-none
                    [&::-webkit-inner-spin-button]:appearance-none
                `}
                aria-label="Liczba"
            />

            {/* Increase Button - Right semicircle */}
            <button
                type="button"
                onClick={handleIncrease}
                disabled={disabled || quantity >= max}
                className={`
                    ${buttonSizeClasses[size]} ${sizeClasses[size]}
                    flex items-center justify-center
                    text-white
                    hover:bg-accent/20
                    active:bg-accent/30
                    transition-all duration-200
                    disabled:opacity-40 disabled:cursor-not-allowed
                    disabled:hover:bg-transparent
                `}
                aria-label="Zwiększ ilość"
            >
                <FiPlus className="w-4 h-4" />
            </button>
        </div>
    );
}

QuantitySelector.propTypes = {
    quantity: PropTypes.number,
    onQuantityChange: PropTypes.func.isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
};