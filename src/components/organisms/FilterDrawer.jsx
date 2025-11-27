import React, { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { FiFilter } from 'react-icons/fi';
import { Button } from '../atoms/Button';
import { Chip } from '../atoms/Chip';
import { FilterSection } from '../molecules/FilterSection';
import { useBackdropClick } from '../../hooks/useBackdropClick.js';

/**
 * FilterDrawer Component - Mobile drawer z filtrami
 */
export function FilterDrawer({
                                 isOpen = false,
                                 onClose,
                                 filterSections = [],
                                 activeFilters = {},
                                 onFilterToggle,
                                 onApply,
                                 onClear,
                                 totalResults = 0,
                             }) {
    // Lock body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Count total active filters
    const totalActiveFilters = Object.values(activeFilters).flat().length;

    const handleBackdropClick = useBackdropClick(onClose);

    // Handle apply
    const handleApply = () => {
        if (onApply) onApply();
        onClose();
    };

    // Handle clear
    const handleClear = () => {
        if (onClear) onClear();
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className={`
          fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
                onClick={handleBackdropClick}
                aria-hidden={!isOpen}
            />

            {/* Drawer */}
            <div
                className={`
          fixed inset-x-0 bottom-0 z-50 bg-primary rounded-t-3xl shadow-2xl
          transform transition-transform duration-300 ease-out
          max-h-[85vh] flex flex-col
          ${isOpen ? 'translate-y-0' : 'translate-y-full'}
        `}
                role="dialog"
                aria-modal="true"
                aria-label="Filtry"
            >

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-accent/20">
                    <div className="flex items-center gap-3">
                        <FiFilter className="text-accent" size={24} />
                        <h2 className="text-white text-lg">
                            Filtry
                        </h2>
                        {totalActiveFilters > 0 && (
                            <span className="bg-accent text-white px-2 py-0.5 rounded-full text-xs">
                                {totalActiveFilters}
                            </span>
                        )}
                    </div>

                    <button
                        onClick={onClose}
                        className="text-muted hover:text-white transition-colors p-2 hover:bg-accent/10 rounded-full"
                        aria-label="Zamknij filtry"
                    >
                        <IoClose size={24} />
                    </button>
                </div>

                {/* Active Filters Summary (if any) */}
                {totalActiveFilters > 0 && (
                    <div className="p-4 bg-primary-light border-b border-accent/20">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-muted text-sm">Aktywne filtry:</span>
                            <button
                                onClick={handleClear}
                                className="text-accent text-sm hover:underline"
                            >
                                Wyczyść wszystko
                            </button>
                        </div>

                        {/* Active filters chips */}
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(activeFilters).map(([category, values]) =>
                                values.map((value) => (
                                    <Chip
                                        key={`${category}-${value}`}
                                        label={value}
                                        active={true}
                                        onToggle={() => onFilterToggle(category, value)}
                                        showRemove={true}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                )}

                {/* Scrollable Filter Sections */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {filterSections.map((section) => (
                        <FilterSection
                            key={section.id}
                            title={section.title}
                            options={section.options}
                            selectedValues={activeFilters[section.id] || []}
                            onToggle={(value) => onFilterToggle(section.id, value)}
                            showCounts={true}
                            layout="grid"
                            collapsible={true}
                            defaultOpen={section.defaultOpen !== false}
                        />
                    ))}
                </div>

                {/* Footer Actions */}
                <div className="p-4 border-t border-accent/20 bg-primary-light space-y-2">
                    {/* Results count */}
                    <p className="text-center text-muted text-sm mb-3">
                        Znaleziono: <span className="text-accent">{totalResults}</span> kaw
                    </p>

                    {/* Action buttons */}
                    <div className="flex gap-2">
                        <Button
                            variant="primary"
                            fullWidth
                            onClick={handleApply}
                            leftIcon={FiFilter}
                        >
                            Pokaż wyniki ({totalResults})
                        </Button>
                    </div>

                    {totalActiveFilters > 0 && (
                        <Button
                            variant="ghost"
                            fullWidth
                            onClick={handleClear}
                            size="sm"
                        >
                            Wyczyść wszystko
                        </Button>
                    )}
                </div>

            </div>
        </>
    );
}

export default FilterDrawer;