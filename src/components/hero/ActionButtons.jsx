import React from 'react';
import { FaCoffee, FaShoppingBag } from 'react-icons/fa';
import { ActionButton } from './ActionButton.jsx';

export function ActionButtons() {
    return (
        <div className="mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center">
            <ActionButton
                href="/dostepne-w-kawiarni"
                icon={FaCoffee}
                text="Co dziś w kawiarni"
                colorClass="bg-accent/20 border border-accent/30 text-white"
            />

            {/* Vertical Divider - tylko na desktop */}
            <div className="hidden sm:block w-px h-12 bg-white/30"></div>

            <ActionButton
                href="/kawy"
                icon={FaShoppingBag}
                text="Sklep on-line"
                colorClass="bg-muted/20 border border-muted/30 text-white"
            />
        </div>
    );
}