import React from 'react';
import { CloseButton } from '../atoms/CloseButton';

export function CartHeader({ totalItems, onClose }) {
    return (
        <>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative flex justify-between items-center h-[100px] lg:h-[120px] border-b border-white/10">
                    {/* Title + Badge */}
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-normal px-2 text-white">
                            Koszyk
                        </h2>
                        {totalItems > 0 && (
                            <span className="px-3 py-1 bg-success text-white text-sm font-bold rounded-full">
                                {totalItems}
                            </span>
                        )}
                    </div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2">
                        <CloseButton onClick={onClose} ariaLabel="Zamknij koszyk" />
                    </div>
                </div>
            </div>
        </>
    );
}