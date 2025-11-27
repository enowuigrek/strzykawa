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
}