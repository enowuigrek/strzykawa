import React from 'react';
import { IoClose } from 'react-icons/io5';

/**
 * Chip Component - Używany do filtrów, tagów, badges
 */
export function Chip({
                         label,
                         active = false,
                         onClick,
                         removable = false,
                         onRemove,
                         variant = 'filter',
                         size = 'md',
                         disabled = false,
                         count = null,
                         className = '',
                     }) {
    // Base classes
    const baseClasses = 'inline-flex items-center gap-2 rounded-full font-medium transition-all duration-200';

    // Size variants
    const sizeClasses = {
        sm: 'px-3 py-1 text-xs',
        md: 'px-4 py-1.5 text-sm',
        lg: 'px-5 py-2 text-base',
    };

    // Variant classes
    const variantClasses = {
        default: active
            ? 'bg-accent text-white shadow-md'
            : 'bg-primary-light text-muted hover:bg-accent/20 hover:text-white',
        filter: active
            ? 'bg-accent text-white shadow-md ring-2 ring-accent/30'
            : 'bg-primary-light text-muted hover:bg-accent/20 hover:text-white border border-accent/20',
        tag: 'bg-accent/10 text-accent hover:bg-accent/20',
    };

    // Disabled state
    const disabledClasses = disabled
        ? 'opacity-50 cursor-not-allowed'
        : 'cursor-pointer hover:scale-105 active:scale-95';

    const handleClick = (e) => {
        if (disabled) return;
        if (onClick) onClick(e);
    };

    const handleRemove = (e) => {
        e.stopPropagation(); // Prevent triggering onClick
        if (disabled) return;
        if (onRemove) onRemove(e);
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={disabled}
            className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${disabledClasses}
        ${className}
      `}
            aria-pressed={active}
            aria-label={`${label}${count ? ` (${count})` : ''}`}
        >
      <span className="select-none">
        {label}
      </span>

            {/* Optional count badge */}
            {count !== null && (
                <span className={`
          px-1.5 py-0.5 rounded-full text-xs font-bold
          ${active ? 'bg-white/20' : 'bg-accent/20'}
        `}>
          {count}
        </span>
            )}

            {/* Optional remove button */}
            {removable && (
                <button
                    type="button"
                    onClick={handleRemove}
                    className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                    aria-label={`Usuń ${label}`}
                >
                    <IoClose className="w-4 h-4" />
                </button>
            )}
        </button>
    );
};

export default Chip;

// Demo examples (for testing)
export const ChipExamples = () => {
    const [activeChips, setActiveChips] = React.useState(['etiopia']);

    const toggleChip = (id) => {
        setActiveChips(prev =>
            prev.includes(id)
                ? prev.filter(c => c !== id)
                : [...prev, id]
        );
    };

    const countries = [
        { id: 'etiopia', label: 'Etiopia', count: 5 },
        { id: 'kolumbia', label: 'Kolumbia', count: 3 },
        { id: 'brazylia', label: 'Brazylia', count: 2 },
    ];

    return (
        <div className="p-8 bg-primary min-h-screen">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Filter chips with count */}
                <div>
                    <h3 className="text-white mb-4 text-lg font-semibold">Filter Chips (z licznikami)</h3>
                    <div className="flex flex-wrap gap-2">
                        {countries.map(country => (
                            <Chip
                                key={country.id}
                                label={country.label}
                                count={country.count}
                                active={activeChips.includes(country.id)}
                                onClick={() => toggleChip(country.id)}
                                variant="filter"
                                size="md"
                            />
                        ))}
                    </div>
                </div>

                {/* Active filters (removable) */}
                <div>
                    <h3 className="text-white mb-4 text-lg font-semibold">Active Filters (removable)</h3>
                    <div className="flex flex-wrap gap-2">
                        {activeChips.map(chipId => {
                            const country = countries.find(c => c.id === chipId);
                            return (
                                <Chip
                                    key={chipId}
                                    label={country.label}
                                    active={true}
                                    removable={true}
                                    onRemove={() => toggleChip(chipId)}
                                    variant="filter"
                                    size="md"
                                />
                            );
                        })}
                        {activeChips.length === 0 && (
                            <p className="text-muted text-sm">Wybierz filtry powyżej</p>
                        )}
                    </div>
                </div>

                {/* Size variants */}
                <div>
                    <h3 className="text-white mb-4 text-lg font-semibold">Sizes</h3>
                    <div className="flex flex-wrap items-center gap-2">
                        <Chip label="Small" size="sm" active={true} />
                        <Chip label="Medium" size="md" active={true} />
                        <Chip label="Large" size="lg" active={true} />
                    </div>
                </div>

                {/* States */}
                <div>
                    <h3 className="text-white mb-4 text-lg font-semibold">States</h3>
                    <div className="flex flex-wrap gap-2">
                        <Chip label="Default" />
                        <Chip label="Active" active={true} />
                        <Chip label="Disabled" disabled={true} />
                        <Chip label="Disabled Active" active={true} disabled={true} />
                    </div>
                </div>

                {/* Tag variant */}
                <div>
                    <h3 className="text-white mb-4 text-lg font-semibold">Tag Variant</h3>
                    <div className="flex flex-wrap gap-2">
                        <Chip label="Owocowe" variant="tag" />
                        <Chip label="Czekoladowe" variant="tag" />
                        <Chip label="Kwiatowe" variant="tag" />
                    </div>
                </div>

            </div>
        </div>
    );
};