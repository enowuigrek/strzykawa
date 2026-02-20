import { useState, useRef, useEffect } from 'react';
import { FaSortAmountDown } from 'react-icons/fa';

const SORT_OPTIONS = [
    { value: 'newest', label: 'Najnowsze' },
    { value: 'price-asc', label: 'Cena: rosnąco' },
    { value: 'price-desc', label: 'Cena: malejąco' },
    { value: 'name-asc', label: 'Nazwa: A-Z' },
];

/**
 * SortSelector - Dropdown do sortowania produktów
 *
 * Prosty przycisk z dropdown menu.
 * Zamyka się po kliknięciu opcji lub kliknięciu poza.
 */
export function SortSelector({ value = 'newest', onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    // Zamknij dropdown po kliknięciu poza
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const currentLabel = SORT_OPTIONS.find(o => o.value === value)?.label || 'Sortuj';

    return (
        <div ref={ref} className="relative flex-shrink-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    flex items-center justify-center
                    w-9 h-9
                    md:w-auto md:h-auto
                    md:px-4 md:py-2 md:gap-2
                    rounded-full
                    text-sm font-medium
                    transition-all duration-150
                    ${isOpen ? 'bg-white/15 text-white' : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'}
                `}
                aria-label={`Sortowanie: ${currentLabel}`}
                aria-expanded={isOpen}
            >
                <FaSortAmountDown className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{currentLabel}</span>
            </button>

            {/* Dropdown menu - ostre rogi (Design System) */}
            {isOpen && (
                <div
                    className="
                        absolute right-0 top-full mt-2
                        min-w-[180px]
                        bg-primary-dark
                        border border-white/10
                        shadow-xl shadow-black/30
                        overflow-hidden
                        z-50
                    "
                >
                    {SORT_OPTIONS.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => {
                                onChange(option.value);
                                setIsOpen(false);
                            }}
                            className={`
                                w-full text-left
                                px-4 py-2.5
                                text-sm
                                transition-colors duration-100
                                ${value === option.value
                                    ? 'bg-white/15 text-white font-medium'
                                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                                }
                            `}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
