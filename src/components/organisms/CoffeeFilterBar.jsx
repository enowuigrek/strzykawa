import { useState, useEffect, useRef } from 'react';
import { SortSelector } from '../molecules/SortSelector';

export function CoffeeFilterBar({
                                    selectedRoastType,
                                    onRoastTypeChange,
                                    onSearchChange,
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
                                    sortValue,
                                    onSortChange,
                                }) {
    // Lokalny state dla instant UI feedback
    const [localActiveType, setLocalActiveType] = useState(selectedRoastType);
    const [searchQuery, setSearchQuery] = useState('');
    const isLocalChange = useRef(false);

    // Sync z props tylko gdy NIE jest to lokalna zmiana
    useEffect(() => {
        if (!isLocalChange.current) {
            setLocalActiveType(selectedRoastType);
        }
        isLocalChange.current = false;
    }, [selectedRoastType]);

    const handleFilterClick = (type) => {
        isLocalChange.current = true;
        setLocalActiveType(type);
        onRoastTypeChange(type);
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        onSearchChange?.(value);
    };

    return (
        <div
            className={`
                sticky
                top-0
                z-40
                bg-primary
                h-[100px]
                lg:h-[120px]
            `}
        >
            {/* Kontener dopasowany do siatki kart (max-w-7xl px-4) */}
            <div className="container mx-auto max-w-7xl px-4 h-full flex flex-col justify-center gap-1.5 md:flex-row md:items-center md:justify-between md:gap-3">
                {/* Górny wiersz: [Espresso | Przelew] + Sort (prawa) */}
                <div className="flex items-center justify-between md:justify-start md:gap-3">
                    <div className="flex items-center gap-2 md:gap-3">
                        {/* Grupa: Kawy (Espresso + Przelew) */}
                        <div className="flex items-center gap-1 bg-white/5 rounded-full p-0.5">
                            <MainFilterButton
                                label="Espresso"
                                count={espressoCount}
                                isActive={localActiveType === 'Espresso'}
                                onClick={() => handleFilterClick('Espresso')}
                                isGrouped
                            />
                            <MainFilterButton
                                label="Przelew"
                                count={filterCount}
                                isActive={localActiveType === 'Filter'}
                                onClick={() => handleFilterClick('Filter')}
                                isGrouped
                            />
                        </div>

                        {/* Desktop: Akcesoria + Wszystko w tym samym wierszu */}
                        <div className="hidden md:flex items-center gap-3">
                            <MainFilterButton
                                label="Akcesoria"
                                count={0}
                                isActive={localActiveType === 'Accessories'}
                                onClick={() => handleFilterClick('Accessories')}
                            />
                            <MainFilterButton
                                label="Wszystko"
                                count={allCount}
                                isActive={!localActiveType}
                                onClick={() => handleFilterClick('')}
                            />
                        </div>
                    </div>

                    {/* Sortowanie - prawa strona */}
                    <SortSelector
                        value={sortValue}
                        onChange={onSortChange}
                    />
                </div>

                {/* Dolny wiersz (mobile only): Akcesoria + Wszystko */}
                <div className="flex items-center gap-2 md:hidden">
                    <MainFilterButton
                        label="Akcesoria"
                        count={0}
                        isActive={localActiveType === 'Accessories'}
                        onClick={() => handleFilterClick('Accessories')}
                    />
                    <MainFilterButton
                        label="Wszystko"
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
 *
 * Standalone buttons (Akcesoria, Wszystko) mają taką samą wysokość
 * jak grupa Espresso/Przelew dzięki dopasowanym padding/height.
 */
function MainFilterButton({ label, count, isActive, onClick, isGrouped = false }) {
    const lowerLabel = (label || '').toLowerCase();
    let colorClass = 'bg-success';

    if (lowerLabel.includes('espresso')) {
        colorClass = 'bg-badge-orange';
    } else if (lowerLabel.includes('przelew') || lowerLabel.includes('filter')) {
        colorClass = 'bg-badge-blue';
    } else if (lowerLabel.includes('wszystko') || lowerLabel.includes('wszystkie') || lowerLabel.includes('all')) {
        colorClass = 'bg-success';
    }

    // Standalone buttons: py-2 = ta sama wysokość co grupa (p-0.5 + py-1.5)
    // Grouped buttons: py-1.5 (wewnątrz wrappera z p-0.5)
    const paddingY = isGrouped ? 'py-1.5' : 'py-2';

    if (isActive) {
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
                    flex-shrink-0
                    md:px-4
                    ${paddingY}
                    md:gap-2
                    w-9 h-9
                    md:w-auto md:h-auto
                    text-xs md:text-sm
                    font-bold md:font-medium
                    shadow-md
                    hover:scale-105
                `}
                aria-label={`${label}${count > 0 ? ` – ${count} kaw` : ''}`}
            >
                {/* Mobile: tylko liczba */}
                <span className="md:hidden">{count}</span>
                {/* Desktop: nazwa + liczba */}
                <span className="hidden md:inline">{label}</span>
                {count > 0 && (
                    <span className="hidden md:inline font-bold">{count}</span>
                )}
            </button>
        );
    }

    // Inactive
    return (
        <button
            onClick={onClick}
            className={`
                px-4
                ${paddingY}
                rounded-full
                font-medium
                text-sm
                whitespace-nowrap flex-shrink-0
                transition-all
                duration-150
                ${isGrouped ? 'bg-transparent hover:bg-white/5' : 'bg-white/5 hover:bg-white/10'}
                text-white/70
                hover:text-white
            `}
        >
            {label}
        </button>
    );
}
