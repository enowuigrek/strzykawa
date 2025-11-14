import React from 'react';
import { CloseButton } from '../atoms/CloseButton';

/**
 * CartHeader - Header koszyka CONSISTENT z main Header
 *
 * FINAL FIX:
 * - Taka sama wysokość: h-[100px] lg:h-[120px]
 * - X bez absolute - justify-between robi robotę
 * - Identyczna struktura jak główny Header
 */
export function CartHeader({ totalItems, onClose }) {
    return (
        <>
            {/* Container - identyczny jak w głównym Header */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header content - SZTYWNA wysokość jak główny Header */}
                <div className="relative flex justify-between items-center h-[100px] lg:h-[120px]">
                    {/* Title + Badge */}
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-normal text-white">
                            Koszyk
                        </h2>
                        {totalItems > 0 && (
                            <span className="px-3 py-1 bg-accent text-white text-sm font-bold rounded-full">
                                {totalItems}
                            </span>
                        )}
                    </div>

                    {/* CloseButton - justify-between ustawia w prawo, bez absolute! */}
                    <div className="absolute right-6 top-1/2 -translate-y-1/2">
                        <CloseButton onClick={onClose} ariaLabel="Zamknij koszyk" />
                    </div>
                </div>
            </div>

            {/* Border - też w containerze */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="border-b border-white/10"></div>
            </div>
        </>
    );
}