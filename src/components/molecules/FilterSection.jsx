import React from 'react';
import { Chip } from '../atoms/Chip.jsx';


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
                    <h3 className="text-white text-sm uppercase tracking-wide">
                        {title}
                    </h3>

                    {/* Active count badge */}
                    {activeCount > 0 && (
                        <span className="bg-accent/20 text-accent px-2 py-0.5 rounded-full text-xs">
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