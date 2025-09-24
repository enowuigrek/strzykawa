import React, { useState, useMemo } from 'react';
import { FaFilter, FaTimes, FaCoffee, FaGlobe, FaCog, FaFire, FaSeedling } from 'react-icons/fa';
import { CoffeeCard } from '../components/coffee/CoffeeCard.jsx';
import { PageHeader } from '../components/PageHeader';
import { useScrollToTop } from '../hooks/useScrollToTop';
import coffees from '../data/coffees.js';

export default function Coffees() {
    useScrollToTop();

    const [filters, setFilters] = useState({
        roastType: ''
    });

    const [showFilters, setShowFilters] = useState(false);

    // Extract unique values for filters
    const filterOptions = useMemo(() => {
        const countries = new Set();
        const processings = new Set();
        const roastTypes = new Set();
        const roastLevels = new Set();

        coffees.forEach(coffee => {
            if (coffee.origin) {
                coffee.origin.forEach(o => {
                    if (o.country) countries.add(o.country);
                    if (o.processing) processings.add(o.processing);
                });
            }
            if (coffee.roastType) roastTypes.add(coffee.roastType);
            if (coffee.roastLevel) roastLevels.add(coffee.roastLevel);
        });

        return {
            countries: Array.from(countries).sort(),
            processings: Array.from(processings).sort(),
            roastTypes: Array.from(roastTypes).sort(),
            roastLevels: Array.from(roastLevels).sort()
        };
    }, []);

    // Filter coffees based on selected filters
    const filteredCoffees = useMemo(() => {
        if (!filters.roastType) return coffees;
        return coffees.filter(coffee => coffee.roastType === filters.roastType);
    }, [filters]);

    const updateFilter = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const clearFilters = () => {
        setFilters({ roastType: '' });
    };

    const hasActiveFilters = filters.roastType !== '';
    const activeFiltersCount = filters.roastType !== '' ? 1 : 0;

    return (
        <div className="min-h-screen bg-primary text-white pt-20">
            <div className="container mx-auto px-6 py-16">
                {/* Hero Section */}
                <PageHeader
                    title="Nasze kawy"
                    description="Odkryj nasze starannie wyselekcjonowane kawy specialty z najlepszych plantacji świata. Każda kawa to unikalna podróż smakowa."
                >

                </PageHeader>

                {/* Filter Panel - zawsze widoczny */}
                <div className="mb-8">
                    <div className="bg-gradient-to-r from-primary-light/50 to-primary/50 backdrop-blur-sm border border-white/10 p-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                            {/* Wszystkie */}
                            <button
                                onClick={() => updateFilter('roastType', '')}
                                className={`p-6 border-2 transition-all duration-300 text-left ${
                                    !filters.roastType
                                        ? 'border-accent bg-accent/20 text-white'
                                        : 'border-white/20 hover:border-accent/50 text-white hover:bg-white/5'
                                }`}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <FaGlobe className="w-5 h-5 text-accent" />
                                    <h3 className="text-lg font-semibold">Wszystkie</h3>
                                </div>
                                <p className="text-sm text-white/80">Cała nasza oferta</p>
                            </button>

                            {/* Espresso */}
                            <button
                                onClick={() => updateFilter('roastType', filters.roastType === 'Espresso' ? '' : 'Espresso')}
                                className={`p-6 border-2 transition-all duration-300 text-left ${
                                    filters.roastType === 'Espresso'
                                        ? 'border-accent bg-accent/20 text-white'
                                        : 'border-white/20 hover:border-accent/50 text-white hover:bg-white/5'
                                }`}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <FaCoffee className="w-5 h-5 text-accent" />
                                    <h3 className="text-lg font-semibold">Espresso</h3>
                                </div>
                                <p className="text-sm text-white/80">Kawy dedykowane do espresso</p>
                            </button>

                            {/* Przelew */}
                            <button
                                onClick={() => updateFilter('roastType', filters.roastType === 'Filter' ? '' : 'Filter')}
                                className={`p-6 border-2 transition-all duration-300 text-left ${
                                    filters.roastType === 'Filter'
                                        ? 'border-accent bg-accent/20 text-white'
                                        : 'border-white/20 hover:border-accent/50 text-white hover:bg-white/5'
                                }`}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <FaSeedling className="w-5 h-5 text-accent" />
                                    <h3 className="text-lg font-semibold">Przelew</h3>
                                </div>
                                <p className="text-sm text-white/80">Metody przelewowe</p>
                            </button>

                            {/* Akcesoria */}
                            <button
                                onClick={() => alert('Sekcja akcesoria w przygotowaniu!')}
                                className="p-6 border-2 border-white/10 transition-all duration-300 text-left opacity-60 cursor-not-allowed"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <FaCog className="w-5 h-5 text-white/60" />
                                    <h3 className="text-lg font-semibold text-white/60">Akcesoria</h3>
                                </div>
                                <p className="text-sm text-white/60">W przygotowaniu...</p>
                            </button>

                        </div>
                    </div>
                </div>

                {/* Results Summary */}
                <div className="flex items-center justify-between mb-8 p-4 bg-primary-light/30 border border-white/10">
                    <p className="text-muted flex items-center gap-2">
                        <FaSeedling className="w-4 h-4 text-accent" />
                        Pokazano <span className="font-bold text-white">{filteredCoffees.length}</span> z <span className="font-bold text-white">{coffees.length}</span> kaw
                    </p>

                    {hasActiveFilters && (
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-muted">Aktywne filtry:</span>
                            <span className="px-3 py-1 bg-accent/20 text-accent font-medium rounded-full">
                                {activeFiltersCount}
                            </span>
                        </div>
                    )}
                </div>

                {/* Coffee Grid */}
                {filteredCoffees.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                        {filteredCoffees.map(coffee => (
                            <CoffeeCard key={coffee.id} coffee={coffee} />
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="text-center py-16">
                        <div className="max-w-md mx-auto">
                            <div className="mb-6">
                                <div className="inline-flex items-center justify-center w-24 h-24 bg-primary-light/50 border border-white/10">
                                    <FaCoffee className="w-12 h-12 text-muted" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Nie znaleźliśmy kaw</h3>
                            <p className="text-muted mb-8 leading-relaxed">
                                Spróbuj zmienić kryteria wyszukiwania lub wyczyść wszystkie filtry,
                                aby zobaczyć pełną ofertę.
                            </p>
                            <button
                                className="inline-flex items-center gap-3 px-6 py-3 bg-accent hover:bg-accent/80 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-accent/25"
                                onClick={clearFilters}
                            >
                                <FaTimes className="w-4 h-4" />
                                Wyczyść filtry
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}