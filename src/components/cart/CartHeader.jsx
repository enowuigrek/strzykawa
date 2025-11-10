import React from 'react';
import { FaTimes, FaShoppingCart } from 'react-icons/fa';

/**
 * CartHeader - Header koszyka
 * REDESIGN: Sharp corners - usuń rounded z close button
 */
export function CartHeader({ totalItems, onClose }) {
    return (
        <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
                {/* Icon box - sharp corners */}
                <div className="p-2 bg-accent/20 border border-accent/30">
                    <FaShoppingCart className="w-5 h-5 text-accent" />
                </div>
                <h2 className="text-xl font-bold text-white">
                    Koszyk ({totalItems})
                </h2>
            </div>

            {/* Close button - sharp corners */}
            <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 transition-colors duration-300"
                aria-label="Zamknij koszyk"
            >
                <FaTimes className="w-5 h-5 text-white" />
            </button>
        </div>
    );
}