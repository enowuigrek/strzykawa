import React from 'react';
import { Chip } from '../atoms/Chip.jsx';

/**
 * FilterSection Component - Sekcja filtrów z tytułem i listą opcji
 */
export function FilterSection({
                                  title,
                                  options = [],
                                  activeFilters = [],
                                  onFilterToggle,
                                  showCounts = true,
                                  layout = 'row',
                                  collapsible = false,
                                  defaultOpen = true,
                                  className = '',
                              }) {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);

    // Check if filter is active
    const isActive = (filterId) => activeFilters.includes(filterId);

    // Handle filter click
    const handleFilterClick = (filterId) => {
        if (onFilterToggle) {
            onFilterToggle(filterId);
        }
    };

    // Layout classes
    const layoutClasses = {
        row: 'flex flex-wrap gap-2',
        grid: 'grid grid-cols-2 sm:grid-cols-3 gap-2',
    };

    // Count active filters in this section
    const activeCount = options.filter(opt => isActive(opt.id)).length;

    return (
        <div className={`filter-section ${className}`}>

            {/* Section Header */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <h3 className="text-white font-semibold text-sm uppercase tracking-wide">
                        {title}
                    </h3>

                    {/* Active count badge */}
                    {activeCount > 0 && (
                        <span className="bg-accent/20 text-accent px-2 py-0.5 rounded-full text-xs font-bold">
                            {activeCount}
                        </span>
                    )}
                </div>

                {/* Collapse button (mobile) */}
                {collapsible && (
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-muted hover:text-white transition-colors p-1"
                        aria-label={isOpen ? 'Zwiń' : 'Rozwiń'}
                    >
                        <svg
                            className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Filters List */}
            {(!collapsible || isOpen) && (
                <div className={layoutClasses[layout]}>
                    {options.length === 0 ? (
                        <p className="text-muted text-sm italic">Brak opcji</p>
                    ) : (
                        options.map((option) => (
                            <Chip
                                key={option.id}
                                label={option.label}
                                count={showCounts ? option.count : null}
                                active={isActive(option.id)}
                                onClick={() => handleFilterClick(option.id)}
                                variant="filter"
                                size="md"
                            />
                        ))
                    )}
                </div>
            )}

        </div>
    );
}

// Demo examples (for testing)
export function FilterSectionExamples() {
    const [activeCountries, setActiveCountries] = React.useState(['etiopia']);
    const [activeProcessing, setActiveProcessing] = React.useState([]);
    const [activeRoast, setActiveRoast] = React.useState(['espresso']);

    // Sample data
    const countries = [
        { id: 'etiopia', label: 'Etiopia', count: 5 },
        { id: 'kolumbia', label: 'Kolumbia', count: 3 },
        { id: 'brazylia', label: 'Brazylia', count: 2 },
        { id: 'kostaryka', label: 'Kostaryka', count: 1 },
        { id: 'peru', label: 'Peru', count: 2 },
    ];

    const processing = [
        { id: 'natural', label: 'Natural', count: 4 },
        { id: 'washed', label: 'Washed', count: 6 },
        { id: 'honey', label: 'Honey', count: 3 },
    ];

    const roastTypes = [
        { id: 'espresso', label: 'Espresso', count: 7 },
        { id: 'filter', label: 'Przelew', count: 6 },
    ];

    // Toggle handlers
    const toggleCountry = (id) => {
        setActiveCountries(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        );
    };

    const toggleProcessing = (id) => {
        setActiveProcessing(prev =>
            prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
        );
    };

    const toggleRoast = (id) => {
        setActiveRoast(prev =>
            prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
        );
    };

    return (
        <div className="p-8 bg-primary min-h-screen">
            <div className="max-w-4xl mx-auto space-y-8">

                <h2 className="text-white text-2xl font-bold mb-6">FilterSection Examples</h2>

                {/* Desktop layout (row) */}
                <div className="space-y-6">
                    <h3 className="text-accent text-lg font-semibold">Desktop Layout (row)</h3>

                    <FilterSection
                        title="Kraj pochodzenia"
                        options={countries}
                        activeFilters={activeCountries}
                        onFilterToggle={toggleCountry}
                        showCounts={true}
                        layout="row"
                    />

                    <FilterSection
                        title="Obróbka"
                        options={processing}
                        activeFilters={activeProcessing}
                        onFilterToggle={toggleProcessing}
                        showCounts={true}
                        layout="row"
                    />

                    <FilterSection
                        title="Typ parzenia"
                        options={roastTypes}
                        activeFilters={activeRoast}
                        onFilterToggle={toggleRoast}
                        showCounts={true}
                        layout="row"
                    />
                </div>

                {/* Mobile layout (grid + collapsible) */}
                <div className="space-y-6 mt-12">
                    <h3 className="text-accent text-lg font-semibold">Mobile Layout (collapsible + grid)</h3>

                    <div className="bg-primary-light p-4 rounded-lg space-y-4">
                        <FilterSection
                            title="Kraj pochodzenia"
                            options={countries}
                            activeFilters={activeCountries}
                            onFilterToggle={toggleCountry}
                            showCounts={true}
                            layout="grid"
                            collapsible={true}
                            defaultOpen={true}
                        />

                        <div className="border-t border-accent/20 pt-4">
                            <FilterSection
                                title="Obróbka"
                                options={processing}
                                activeFilters={activeProcessing}
                                onFilterToggle={toggleProcessing}
                                showCounts={true}
                                layout="grid"
                                collapsible={true}
                                defaultOpen={false}
                            />
                        </div>

                        <div className="border-t border-accent/20 pt-4">
                            <FilterSection
                                title="Typ parzenia"
                                options={roastTypes}
                                activeFilters={activeRoast}
                                onFilterToggle={toggleRoast}
                                showCounts={true}
                                layout="grid"
                                collapsible={true}
                                defaultOpen={false}
                            />
                        </div>
                    </div>
                </div>

                {/* Active Filters Summary */}
                <div className="mt-12 bg-primary-light p-6 rounded-lg">
                    <h3 className="text-white font-semibold mb-4">Aktywne filtry:</h3>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="text-muted text-sm">Kraje:</span>
                            <div className="flex gap-2">
                                {activeCountries.length === 0 ? (
                                    <span className="text-muted text-sm italic">brak</span>
                                ) : (
                                    activeCountries.map(id => {
                                        const country = countries.find(c => c.id === id);
                                        return (
                                            <Chip
                                                key={id}
                                                label={country.label}
                                                active={true}
                                                removable={true}
                                                onRemove={() => toggleCountry(id)}
                                                size="sm"
                                            />
                                        );
                                    })
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-muted text-sm">Obróbka:</span>
                            <div className="flex gap-2">
                                {activeProcessing.length === 0 ? (
                                    <span className="text-muted text-sm italic">brak</span>
                                ) : (
                                    activeProcessing.map(id => {
                                        const proc = processing.find(p => p.id === id);
                                        return (
                                            <Chip
                                                key={id}
                                                label={proc.label}
                                                active={true}
                                                removable={true}
                                                onRemove={() => toggleProcessing(id)}
                                                size="sm"
                                            />
                                        );
                                    })
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-muted text-sm">Typ:</span>
                            <div className="flex gap-2">
                                {activeRoast.length === 0 ? (
                                    <span className="text-muted text-sm italic">brak</span>
                                ) : (
                                    activeRoast.map(id => {
                                        const roast = roastTypes.find(r => r.id === id);
                                        return (
                                            <Chip
                                                key={id}
                                                label={roast.label}
                                                active={true}
                                                removable={true}
                                                onRemove={() => toggleRoast(id)}
                                                size="sm"
                                            />
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}