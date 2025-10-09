import { Button } from '../atoms/Button';
import { Chip } from '../atoms/Chip';

/**
 * CoffeeFilterBar - Sticky filter bar with main coffee type filters
 *
 * Główny pasek filtrów z:
 * - Podstawowymi filtrami (All/Espresso/Filter)
 * - Aktywnymi filtrami (chip-y z możliwością usunięcia)
 * - Przyciskiem "Więcej filtrów"
 * - Licznikiem wyników
 *
 * Z-index: 50 (wyższy niż header z-40, więc nie zasłania)
 *
 * @param {string} selectedRoastType - Wybrany typ palenia
 * @param {function} onRoastTypeChange - Handler zmiany typu
 * @param {string} selectedCountry - Wybrany kraj
 * @param {function} onCountryRemove - Handler usunięcia kraju
 * @param {string} selectedProcessing - Wybrana obróbka
 * @param {function} onProcessingRemove - Handler usunięcia obróbki
 * @param {function} onMoreFiltersClick - Handler otwarcia drawera
 * @param {function} onClearAdvanced - Handler czyszczenia zaawansowanych filtrów
 * @param {number} allCount - Liczba wszystkich kaw
 * @param {number} espressoCount - Liczba kaw espresso
 * @param {number} filterCount - Liczba kaw filter
 * @param {number} resultCount - Liczba wyników po filtrowaniu
 * @param {boolean} isSticky - Czy bar jest sticky (dla animacji)
 */
export function CoffeeFilterBar({
                                    selectedRoastType,
                                    onRoastTypeChange,
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
    const hasActiveAdvancedFilters = selectedCountry || selectedProcessing;

    return (
        <div
            className={`
                sticky 
                top-0
                z-50
                bg-primary
                border-white/10
                transition-all
                duration-300
                ${isSticky ? 'shadow-2xl shadow-black/50' : 'shadow-none'}
            `}
        >
            <div className="container mx-auto max-w-7xl px-4 py-4">
                {/* Main Filters - Always Visible */}
                <div className="flex flex-wrap items-center gap-3 mb-3">
                    <MainFilterButton
                        label="Espresso"
                        count={espressoCount}
                        isActive={selectedRoastType === 'Espresso'}
                        onClick={() => onRoastTypeChange('Espresso')}
                    />
                    <MainFilterButton
                        label="Przelew"
                        count={filterCount}
                        isActive={selectedRoastType === 'Filter'}
                        onClick={() => onRoastTypeChange('Filter')}
                    />
                    <MainFilterButton
                        label="Wszystkie"
                        count={allCount}
                        isActive={!selectedRoastType}
                        onClick={() => onRoastTypeChange('')}
                    />
                    {/*Narazie, chowam, bo niepotrzebne, jak wroce do tego, to trzeba inaczej wystylowac*/}
                    {/*/!* Vertical Divider *!/*/}
                    {/*<div className="hidden sm:block w-px h-8 bg-white/10" />*/}

                    {/*/!* More Filters Button *!/*/}
                    {/*<Button*/}
                    {/*    variant="ghost"*/}
                    {/*    size="sm"*/}
                    {/*    onClick={onMoreFiltersClick}*/}
                    {/*    className="text-white/70 hover:text-white justify-end"*/}
                    {/*>*/}
                    {/*    Więcej filtrów*/}
                    {/*    {hasActiveAdvancedFilters && (*/}
                    {/*        <span className="ml-2 bg-accent text-white text-xs px-2 py-0.5 rounded-full">*/}
                    {/*            {[selectedCountry, selectedProcessing].filter(Boolean).length}*/}
                    {/*        </span>*/}
                    {/*    )}*/}
                    {/*</Button>*/}
                </div>

                {/* Active Advanced Filters */}
                {hasActiveAdvancedFilters && (
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-white/50 text-sm">Aktywne filtry:</span>

                        {selectedCountry && (
                            <Chip
                                variant="filter"
                                onRemove={onCountryRemove}
                            >
                                {selectedCountry}
                            </Chip>
                        )}

                        {selectedProcessing && (
                            <Chip
                                variant="filter"
                                onRemove={onProcessingRemove}
                            >
                                {selectedProcessing}
                            </Chip>
                        )}

                        <button
                            onClick={onClearAdvanced}
                            className="text-xs text-white/50 hover:text-white transition-colors ml-2"
                        >
                            Wyczyść wszystkie
                        </button>
                    </div>
                )}

                {/* Results Count */}
                <div className="mt-3 pt-3 border-t border-white/5">
                    <p className="text-sm text-white/70">
                        Znaleziono <span className="font-semibold text-white">{resultCount}</span> {' '}
                        {resultCount === 1 ? 'kawę' : resultCount < 5 ? 'kawy' : 'kaw'}
                    </p>
                </div>
            </div>
        </div>
    );
}

/**
 * MainFilterButton - Button for main filter types
 */
function MainFilterButton({ label, count, isActive, onClick }) {
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
                duration-300
                ${isActive
                ? 'bg-accent text-white scale-105 shadow-lg'
                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
            }
            `}
        >
            {label}
            <span className={`
                ml-2 
                text-xs 
                ${isActive ? 'text-white/80' : 'text-white/50'}
            `}>
                ({count})
            </span>
        </button>
    );
}