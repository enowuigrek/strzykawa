import React from 'react';
import { FaCoffee, FaShoppingBag } from 'react-icons/fa';
import { ActionButton } from './ActionButton.jsx';

export function ActionButtons() {
    return (
        <div className="mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center">
            <ActionButton
                href="/kawy"
                icon={FaShoppingBag}
                text="Sklep on-line"
            />
        </div>
    );
}