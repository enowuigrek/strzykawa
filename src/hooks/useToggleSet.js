import { useState } from 'react';

/**
 * Custom hook do zarządzania zestawem aktywnych elementów (toggle set)
 * Używany do filtrów, chipów, multi-select itp.
 *
 * @param {Array} initialItems - Początkowy zestaw aktywnych elementów
 * @returns {[Array, Function, Function, Function]} [items, toggle, add, remove, clear]
 *
 * @example
 * const [activeCountries, toggleCountry, addCountry, removeCountry, clearCountries] = useToggleSet(['etiopia']);
 * toggleCountry('kolumbia'); // dodaje lub usuwa
 */
export function useToggleSet(initialItems = []) {
    const [items, setItems] = useState(initialItems);

    const toggle = (item) => {
        setItems(prev =>
            prev.includes(item)
                ? prev.filter(i => i !== item)
                : [...prev, item]
        );
    };

    const add = (item) => {
        setItems(prev => prev.includes(item) ? prev : [...prev, item]);
    };

    const remove = (item) => {
        setItems(prev => prev.filter(i => i !== item));
    };

    const clear = () => {
        setItems([]);
    };

    return [items, toggle, add, remove, clear];
}
