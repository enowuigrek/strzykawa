import { Button } from '../atoms/Button';
import { Chip } from '../atoms/Chip';
import { FaSearch } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';

export function CoffeeFilterBar({
                                    selectedRoastType,
                                    onRoastTypeChange,
                                    onSearchChange, // NOWE: callback dla search
                                    selectedCountry,
                                    onCountryRemove,
                                    selectedProcessing,
                                    onProcessingRemove,
                                    onMoreFiltersClick,
                                    onClearAdvanced,
                                    allCount,
                                    espressoCount,
                                    filterCount,
                                    resultCount,
                                    isSticky
                                }) {
    // Lokalny state dla instant UI feedback
    const [localActiveType, setLocalActiveType] = useState(selectedRoastType);
    const [searchQuery, setSearchQuery] = useState(''); // NOWE: search state
    const isLocalChange = useRef(false);

    // Sync z props tylko gdy NIE jest to lokalna zmiana
    useEffect(() => {
        if (!isLocalChange.current) {
            setLocalActiveType(selectedRoastType);
        }
        isLocalChange.current = false;
    }, [selectedRoastType]);

    const handleFilterClick = (type) => {
        // Oznacz że to lokalna zmiana
        isLocalChange.current = true;
        // Instant UI update
        setLocalActiveType(type);
        // Async data update
        onRoastTypeChange(type);
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        // Przekaż do parent (jeśli handler istnieje)
        onSearchChange?.(value);
    };

    return (
        <div
            className={`
                sticky
                top-0
                z-50
                ${isSticky ? 'bg-primary-dark backdrop-blur-md shadow-2xl shadow-black/50' : 'bg-primary-light'}
                transition-all
                duration-500
                h-[100px]
                lg:h-[120px]
            `}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
                {/* Górna połowa - Wyszukiwarka */}
                <div className="flex items-center h-[50px]">
                    <div className="relative w-full max-w-xs">
                        <FaSearch className="absolute left-0 top-1/2 -translate-y-1/2 text-white text-sm" />
                        <input
                            type="text"
                            placeholder="Szukaj"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="
                                w-full
                                pl-7
                                pr-4
                                py-2
                                bg-transparent
                                border-none
                                border-b
                                border-white/5
                                text-white
                                placeholder-white
                                focus:outline-none
                                transition-all
                            "
                        />
                    </div>
                </div>

                {/* Dolna połowa - Filtry (50px) */}
                <div className="flex items-center gap-3 h-[50px]">
                    <MainFilterButton
                        label="Espresso"
                        count={espressoCount}
                        isActive={localActiveType === 'Espresso'}
                        onClick={() => handleFilterClick('Espresso')}
                    />
                    <MainFilterButton
                        label="Przelew"
                        count={filterCount}
                        isActive={localActiveType === 'Filter'}
                        onClick={() => handleFilterClick('Filter')}
                    />
                    {/*<MainFilterButton*/}
                    {/*    label="Akcesoria"*/}
                    {/*    count={0}*/}
                    {/*    isActive={localActiveType === 'Accessories'}*/}
                    {/*    onClick={() => handleFilterClick('Accessories')}*/}
                    {/*/>*/}
                    <MainFilterButton
                        label="Wszystkie"
                        count={allCount}
                        isActive={!localActiveType}
                        onClick={() => handleFilterClick('')}
                    />
                </div>
            </div>
        </div>
    );
}

/**
 * MainFilterButton - Button for main filter types
 *
 * Instant UI:
 * - isActive kontroluje wygląd (natychmiastowa zmiana)
 * - count pojawia się async gdy dane gotowe
 *
 * Mobile: tylko kółko z liczbą
 * Desktop: nazwa + kółko z liczbą
 */
function MainFilterButton({ label, count, isActive, onClick }) {
    const lowerLabel = (label || '').toLowerCase();
    let colorClass = 'bg-success';

    if (lowerLabel.includes('espresso')) {
        colorClass = 'bg-badge-orange';
    } else if (lowerLabel.includes('przelew') || lowerLabel.includes('filter')) {
        colorClass = 'bg-badge-blue';
    } else if (lowerLabel.includes('wszystkie') || lowerLabel.includes('all')) {
        colorClass = 'bg-success';
    }

    if (isActive) {
        // Active:
        // Desktop: kolorowy pill z nazwą i liczbą wewnątrz
        // Mobile: tylko kolorowe kółko z liczbą
        return (
            <button
                onClick={onClick}
                className={`
                    ${colorClass}
                    text-white
                    rounded-full
                    font-medium
                    transition-all
                    duration-150
                    flex
                    items-center
                    justify-center
                    md:px-4
                    md:py-2
                    md:gap-2
                    w-8
                    h-8
                    md:w-auto
                    md:h-auto
                    text-xs
                    md:text-sm
                    font-bold
                    md:font-medium
                    shadow-md
                    hover:scale-105
                `}
                aria-label={`${label}${count > 0 ? ` – ${count} kaw` : ''}`}
            >
                {/* Mobile: tylko liczba */}
                <span className="md:hidden">{count > 0 ? count : ''}</span>

                {/* Desktop: nazwa + liczba */}
                <span className="hidden md:inline">{label}</span>
                {count > 0 && (
                    <span className="hidden md:inline font-bold">{count}</span>
                )}
            </button>
        );
    }

    // Inactive: text pill
    return (
        <button
            onClick={onClick}
            className={`
                px-4
                py-2
                rounded-full
                font-medium
                text-sm
                transition-all
                duration-150
                bg-white/5
                text-white/70
                hover:bg-white/10
                hover:text-white
            `}
        >
            {label}
        </button>
    );
}