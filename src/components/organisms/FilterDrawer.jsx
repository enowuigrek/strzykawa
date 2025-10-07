import React, { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { FiFilter } from 'react-icons/fi';
import Button from '../atoms/Button';
import Chip from '../atoms/Chip';
import FilterSection from '../molecules/FilterSection';

/**
 * FilterDrawer Component - Mobile drawer z filtrami
 *
 * Slide-in drawer od dołu ekranu na mobile
 * Zawiera wszystkie sekcje filtrów + action buttons
 *
 * @param {boolean} isOpen - Czy drawer jest otwarty
 * @param {function} onClose - Callback przy zamknięciu
 * @param {Array} filterSections - Tablica sekcji filtrów
 *   [{
 *     id: 'countries',
 *     title: 'Kraj pochodzenia',
 *     options: [{id: 'etiopia', label: 'Etiopia', count: 5}]
 *   }]
 * @param {Object} activeFilters - Obiekt z aktywnymi filtrami
 *   { countries: ['etiopia'], processing: ['natural'] }
 * @param {function} onFilterToggle - Callback przy toggle (sectionId, filterId)
 * @param {function} onApply - Callback przy "Zastosuj"
 * @param {function} onClear - Callback przy "Wyczyść wszystko"
 * @param {number} totalResults - Liczba wyników po filtrach
 */
const FilterDrawer = ({
                          isOpen = false,
                          onClose,
                          filterSections = [],
                          activeFilters = {},
                          onFilterToggle,
                          onApply,
                          onClear,
                          totalResults = 0,
                      }) => {
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

    // Handle backdrop click
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

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
                        <h2 className="text-white text-lg font-bold">
                            Filtry
                        </h2>
                        {totalActiveFilters > 0 && (
                            <span className="bg-accent text-white px-2 py-0.5 rounded-full text-xs font-bold">
                {totalActiveFilters}
              </span>
                        )}
                    </div>

                    <button
                        onClick={onClose}
                        className="text-muted hover:text-white transition-colors p-2 hover:bg-accent/10 rounded-lg"
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
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(activeFilters).map(([sectionId, filters]) => {
                                const section = filterSections.find(s => s.id === sectionId);
                                if (!section || filters.length === 0) return null;

                                return filters.map(filterId => {
                                    const option = section.options.find(opt => opt.id === filterId);
                                    if (!option) return null;

                                    return (
                                        <Chip
                                            key={`${sectionId}-${filterId}`}
                                            label={option.label}
                                            active={true}
                                            removable={true}
                                            onRemove={() => onFilterToggle(sectionId, filterId)}
                                            size="sm"
                                        />
                                    );
                                });
                            })}
                        </div>
                    </div>
                )}

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {filterSections.map((section) => (
                        <FilterSection
                            key={section.id}
                            title={section.title}
                            options={section.options}
                            activeFilters={activeFilters[section.id] || []}
                            onFilterToggle={(filterId) => onFilterToggle(section.id, filterId)}
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
                        Znaleziono: <span className="text-accent font-bold">{totalResults}</span> kaw
                    </p>

                    {/* Action buttons */}
                    <div className="flex gap-2">
                        <Button
                            variant="primary"
                            fullWidth
                            onClick={handleApply}
                            leftIcon={<FiFilter size={18} />}
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
};

export default FilterDrawer;

// Demo with trigger button
export const FilterDrawerDemo = () => {
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
    const [activeFilters, setActiveFilters] = React.useState({
        countries: ['etiopia'],
        processing: [],
        roastType: ['espresso'],
    });

    // Sample data
    const filterSections = [
        {
            id: 'countries',
            title: 'Kraj pochodzenia',
            options: [
                { id: 'etiopia', label: 'Etiopia', count: 5 },
                { id: 'kolumbia', label: 'Kolumbia', count: 3 },
                { id: 'brazylia', label: 'Brazylia', count: 2 },
                { id: 'kostaryka', label: 'Kostaryka', count: 1 },
                { id: 'peru', label: 'Peru', count: 2 },
            ],
            defaultOpen: true,
        },
        {
            id: 'processing',
            title: 'Obróbka',
            options: [
                { id: 'natural', label: 'Natural', count: 4 },
                { id: 'washed', label: 'Washed', count: 6 },
                { id: 'honey', label: 'Honey', count: 3 },
                { id: 'anaerobic', label: 'Anaerobic', count: 2 },
            ],
            defaultOpen: false,
        },
        {
            id: 'roastType',
            title: 'Typ parzenia',
            options: [
                { id: 'espresso', label: 'Espresso', count: 7 },
                { id: 'filter', label: 'Przelew', count: 6 },
            ],
            defaultOpen: false,
        },
        {
            id: 'roastLevel',
            title: 'Stopień palenia',
            options: [
                { id: 'light', label: 'Jasny', count: 5 },
                { id: 'medium', label: 'Średni', count: 6 },
                { id: 'dark', label: 'Ciemny', count: 2 },
            ],
            defaultOpen: false,
        },
    ];

    // Toggle filter
    const handleFilterToggle = (sectionId, filterId) => {
        setActiveFilters(prev => {
            const sectionFilters = prev[sectionId] || [];
            const newFilters = sectionFilters.includes(filterId)
                ? sectionFilters.filter(f => f !== filterId)
                : [...sectionFilters, filterId];

            return {
                ...prev,
                [sectionId]: newFilters,
            };
        });
    };

    // Clear all filters
    const handleClearAll = () => {
        setActiveFilters({
            countries: [],
            processing: [],
            roastType: [],
            roastLevel: [],
        });
    };

    // Calculate total results (mock)
    const totalActiveFilters = Object.values(activeFilters).flat().length;
    const mockResults = 13 - totalActiveFilters * 2; // fake calculation

    return (
        <div className="min-h-screen bg-primary p-4">
            <div className="max-w-md mx-auto">

                {/* Page Header */}
                <div className="mb-6">
                    <h1 className="text-white text-2xl font-bold mb-2">Nasze Kawy</h1>
                    <p className="text-muted">
                        Znaleziono: <span className="text-accent font-bold">{mockResults}</span> kaw
                    </p>
                </div>

                {/* Trigger Button */}
                <Button
                    variant="secondary"
                    fullWidth
                    leftIcon={<FiFilter />}
                    onClick={() => setIsDrawerOpen(true)}
                >
                    Filtry {totalActiveFilters > 0 && `(${totalActiveFilters})`}
                </Button>

                {/* Active Filters Preview */}
                {totalActiveFilters > 0 && (
                    <div className="mt-4 p-3 bg-primary-light rounded-lg">
                        <p className="text-muted text-sm mb-2">Aktywne filtry:</p>
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(activeFilters).map(([sectionId, filters]) => {
                                const section = filterSections.find(s => s.id === sectionId);
                                return filters.map(filterId => {
                                    const option = section.options.find(opt => opt.id === filterId);
                                    return (
                                        <Chip
                                            key={`${sectionId}-${filterId}`}
                                            label={option.label}
                                            active={true}
                                            removable={true}
                                            onRemove={() => handleFilterToggle(sectionId, filterId)}
                                            size="sm"
                                        />
                                    );
                                });
                            })}
                        </div>
                    </div>
                )}

                {/* Mock Coffee List */}
                <div className="mt-6 space-y-3">
                    {[...Array(mockResults)].map((_, i) => (
                        <div key={i} className="bg-primary-light p-4 rounded-lg">
                            <div className="h-4 bg-accent/20 rounded w-3/4 mb-2"></div>
                            <div className="h-3 bg-accent/10 rounded w-1/2"></div>
                        </div>
                    ))}
                </div>

                {/* Filter Drawer */}
                <FilterDrawer
                    isOpen={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                    filterSections={filterSections}
                    activeFilters={activeFilters}
                    onFilterToggle={handleFilterToggle}
                    onApply={() => console.log('Apply filters', activeFilters)}
                    onClear={handleClearAll}
                    totalResults={mockResults}
                />

            </div>
        </div>
    );
};