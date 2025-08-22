import React, { useState, useMemo } from 'react';
import { FaFilter, FaTimes, FaCoffee, FaGlobe, FaCog, FaFire, FaSeedling } from 'react-icons/fa';
import CoffeeCard from '../components/CoffeeCard.jsx';
import coffees from '../data/coffees.js';

export default function Coffees() {
    const [filters, setFilters] = useState({
        country: '',
        processing: '',
        roastType: '',
        roastLevel: ''
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
        return coffees.filter(coffee => {
            if (filters.country && !coffee.origin?.some(o => o.country === filters.country)) {
                return false;
            }
            if (filters.processing && !coffee.origin?.some(o => o.processing === filters.processing)) {
                return false;
            }
            if (filters.roastType && coffee.roastType !== filters.roastType) {
                return false;
            }
            if (filters.roastLevel && coffee.roastLevel !== filters.roastLevel) {
                return false;
            }
            return true;
        });
    }, [filters]);

    const updateFilter = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const clearFilters = () => {
        setFilters({ country: '', processing: '', roastType: '', roastLevel: '' });
    };

    const hasActiveFilters = Object.values(filters).some(filter => filter !== '');
    const activeFiltersCount = Object.values(filters).filter(filter => filter !== '').length;

    return (
        <div className="min-h-screen bg-primary pt-20">
            <div className="container mx-auto px-4 py-8">
                {/* Hero Section */}
                <div className="relative bg-gradient-to-br from-primary-light/60 to-primary/80 backdrop-blur-sm border border-white/10 p-8 mb-8 overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
                    </div>

                    <div className="relative z-10 text-center max-w-4xl mx-auto">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="p-3 bg-accent/20 border border-accent/30">
                                <FaCoffee className="w-8 h-8 text-accent" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-muted to-white bg-clip-text text-transparent">
                                Nasze kawy
                            </h1>
                        </div>

                        <p className="text-xl text-muted/90 mb-8 leading-relaxed max-w-2xl mx-auto">
                            Odkryj nasze starannie wyselekcjonowane kawy specialty z najlepszych plantacji świata.
                            Każda kawa to unikalna podróż smakowa.
                        </p>

                        {/* Filter Controls */}
                        <div className="flex items-center justify-center gap-4 flex-wrap">
                            <button
                                className={`inline-flex items-center gap-3 px-6 py-3 font-semibold transition-all duration-300 overflow-hidden ${
                                    showFilters
                                        ? 'bg-accent text-white shadow-lg shadow-accent/25'
                                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-white/30'
                                }`}
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <div className={`p-2 ${showFilters ? 'bg-white/20' : 'bg-accent/20'} transition-colors duration-300`}>
                                    <FaFilter className="w-4 h-4" />
                                </div>
                                Filtry
                                {activeFiltersCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold animate-pulse">
                    {activeFiltersCount}
                  </span>
                                )}
                            </button>

                            {hasActiveFilters && (
                                <button
                                    className="inline-flex items-center gap-2 px-4 py-3 bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30 transition-all duration-300 font-semibold rounded-full"
                                    onClick={clearFilters}
                                >
                                    <FaTimes className="w-4 h-4" />
                                    Wyczyść filtry
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Filter Panel */}
                <div className={`overflow-hidden transition-all duration-500 ease-out ${
                    showFilters ? 'max-h-96 opacity-100 mb-8' : 'max-h-0 opacity-0 mb-0'
                }`}>
                    <div className="bg-gradient-to-r from-primary-light/50 to-primary/50 backdrop-blur-sm border border-white/10 p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Country Filter */}
                            <div className="space-y-2">
                                <label htmlFor="country-filter" className="flex items-center gap-2 text-sm font-semibold text-muted">
                                    <div className="p-1.5 bg-white/10">
                                        <FaGlobe className="w-3 h-3 text-white/70" />
                                    </div>
                                    Kraj pochodzenia
                                </label>
                                <select
                                    id="country-filter"
                                    className="w-full px-4 py-3 bg-primary-dark/50 border border-white/20 text-white focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                                    value={filters.country}
                                    onChange={(e) => updateFilter('country', e.target.value)}
                                >
                                    <option value="">Wszystkie kraje</option>
                                    {filterOptions.countries.map(country => (
                                        <option key={country} value={country}>{country}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Processing Filter */}
                            <div className="space-y-2">
                                <label htmlFor="processing-filter" className="flex items-center gap-2 text-sm font-semibold text-muted">
                                    <div className="p-1.5 bg-green-500/20">
                                        <FaCog className="w-3 h-3 text-green-400" />
                                    </div>
                                    Metoda obróbki
                                </label>
                                <select
                                    id="processing-filter"
                                    className="w-full px-4 py-3 bg-primary-dark/50 border border-white/20 text-white focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                                    value={filters.processing}
                                    onChange={(e) => updateFilter('processing', e.target.value)}
                                >
                                    <option value="">Wszystkie metody</option>
                                    {filterOptions.processings.map(processing => (
                                        <option key={processing} value={processing}>{processing}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Roast Type Filter */}
                            <div className="space-y-2">
                                <label htmlFor="roast-type-filter" className="flex items-center gap-2 text-sm font-semibold text-muted">
                                    <div className="p-1.5 bg-white/10">
                                        <FaCoffee className="w-3 h-3 text-white/70" />
                                    </div>
                                    Typ wypału
                                </label>
                                <select
                                    id="roast-type-filter"
                                    className="w-full px-4 py-3 bg-primary-dark/50 border border-white/20 text-white focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                                    value={filters.roastType}
                                    onChange={(e) => updateFilter('roastType', e.target.value)}
                                >
                                    <option value="">Wszystkie typy</option>
                                    {filterOptions.roastTypes.map(type => (
                                        <option key={type} value={type}>
                                            {type === 'Filter' ? 'Przelew' : type === 'Espresso' ? 'Espresso' : type}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Roast Level Filter */}
                            <div className="space-y-2">
                                <label htmlFor="roast-level-filter" className="flex items-center gap-2 text-sm font-semibold text-muted">
                                    <div className="p-1.5 bg-white/10">
                                        <FaFire className="w-3 h-3 text-white/70" />
                                    </div>
                                    Stopień wypału
                                </label>
                                <select
                                    id="roast-level-filter"
                                    className="w-full px-4 py-3 bg-primary-dark/50 border border-white/20 text-white focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                                    value={filters.roastLevel}
                                    onChange={(e) => updateFilter('roastLevel', e.target.value)}
                                >
                                    <option value="">Wszystkie stopnie</option>
                                    {filterOptions.roastLevels.map(level => (
                                        <option key={level} value={level}>{level}</option>
                                    ))}
                                </select>
                            </div>
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
                                className="inline-flex items-center gap-3 px-6 py-3 bg-accent hover:bg-accent/80 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 rounded-full"
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