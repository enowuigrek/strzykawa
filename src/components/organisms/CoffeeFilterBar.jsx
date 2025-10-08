import React from 'react';
import { FiFilter } from 'react-icons/fi';
import { Button } from '../atoms/Button';
import { Chip } from '../atoms/Chip';

/**
 * CoffeeFilterBar - Sticky filter bar with main filters
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
                                    isSticky = false,
                                }) {
    const activeAdvancedFilters = [selectedCountry, selectedProcessing].filter(Boolean).length;

    return (
        <div
            className={`
                sticky top-20 z-30 bg-primary border-b border-accent/20 py-4 transition-all
                ${isSticky ? 'shadow-xl backdrop-blur-sm bg-primary/95' : ''}
            `}
        >
            <div className="container mx-auto max-w-7xl px-4">

                {/* Main Filters Row */}
                <div className="flex items-center gap-3 flex-wrap">

                    {/* Primary Filters */}
                    <Chip
                        label="Wszystkie"
                        count={allCount}
                        active={!selectedRoastType}
                        onClick={() => onRoastTypeChange('')}
                        size="md"
                    />
                    <Chip
                        label="Espresso"
                        count={espressoCount}
                        active={selectedRoastType === 'Espresso'}
                        onClick={() => onRoastTypeChange('Espresso')}
                        size="md"
                    />
                    <Chip
                        label="Przelew"
                        count={filterCount}
                        active={selectedRoastType === 'Filter'}
                        onClick={() => onRoastTypeChange('Filter')}
                        size="md"
                    />

                    {/* Divider */}
                    <div className="h-6 w-px bg-accent/30 mx-2"></div>

                    {/* Advanced Filters Trigger */}
                    <Button
                        variant="ghost"
                        size="sm"
                        leftIcon={<FiFilter />}
                        onClick={onMoreFiltersClick}
                    >
                        Więcej filtrów
                        {activeAdvancedFilters > 0 && ` (${activeAdvancedFilters})`}
                    </Button>

                    {/* Results Counter */}
                    <span className="text-muted text-sm ml-auto">
                        {resultCount} {resultCount === 1 ? 'kawa' : 'kaw'}
                    </span>
                </div>

                {/* Active Advanced Filters Summary */}
                {activeAdvancedFilters > 0 && (
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-accent/10">
                        <span className="text-muted text-sm">Aktywne:</span>

                        {selectedCountry && (
                            <Chip
                                label={selectedCountry}
                                active={true}
                                removable={true}
                                onRemove={onCountryRemove}
                                size="sm"
                            />
                        )}

                        {selectedProcessing && (
                            <Chip
                                label={selectedProcessing}
                                active={true}
                                removable={true}
                                onRemove={onProcessingRemove}
                                size="sm"
                            />
                        )}

                        <button
                            onClick={onClearAdvanced}
                            className="text-accent text-sm hover:underline ml-auto"
                        >
                            Wyczyść
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}