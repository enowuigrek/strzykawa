import { useState, useEffect } from 'react';
import { CoffeeCard } from '../coffee/CoffeeCard';

/**
 * CoffeeGrid - Grid of coffee cards with empty state and staggered animations
 */
export function CoffeeGrid({ coffees, onClearFilters }) {
    const [visibleCards, setVisibleCards] = useState(new Set());

    // Reset visible cards when coffees change (e.g., filter applied)
    useEffect(() => {
        setVisibleCards(new Set());

        // Staggered animation - show cards one by one
        coffees.forEach((coffee, index) => {
            const delay = Math.min(index * 80, 800); // Max 800ms delay
            setTimeout(() => {
                setVisibleCards(prev => new Set([...prev, coffee.id]));
            }, delay);
        });
    }, [coffees]);

    if (coffees.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted text-lg mb-4">
                    Nie znaleziono produktów spełniających wybrane kryteria
                </p>
                <button
                    onClick={onClearFilters}
                    className="
                        px-6 py-2.5
                        rounded-full
                        text-sm font-medium
                        bg-white/5
                        text-white/70
                        hover:bg-white/10
                        hover:text-white
                        transition-all duration-150
                    "
                >
                    Wyczyść wszystkie filtry
                </button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {coffees.map((coffee) => (
                <div
                    key={coffee.id}
                    className={`
                        transition-all duration-500 ease-out
                        ${visibleCards.has(coffee.id)
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-8'
                        }
                    `}
                >
                    <CoffeeCard coffee={coffee} />
                </div>
            ))}
        </div>
    );
}