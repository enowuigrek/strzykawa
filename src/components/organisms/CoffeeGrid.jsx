import React from 'react';
import { CoffeeCard } from '../coffee/CoffeeCard';
import { Button } from '../atoms/Button';

/**
 * CoffeeGrid - Grid of coffee cards with empty state
 */
export function CoffeeGrid({ coffees, onClearFilters }) {
    if (coffees.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted text-lg mb-4">
                    Nie znaleziono kaw spełniających wybrane kryteria
                </p>
                <Button
                    variant="ghost"
                    onClick={onClearFilters}
                >
                    Wyczyść wszystkie filtry
                </Button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {coffees.map((coffee) => (
                <CoffeeCard key={coffee.id} coffee={coffee} />
            ))}
        </div>
    );
}