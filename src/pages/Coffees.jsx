import React, { useState, useMemo } from 'react';
import  coffees  from '../data/coffees.js';
import { CoffeeCard } from '../components/coffee/CoffeeCard.jsx';
import { FiFilter } from 'react-icons/fi';
import Button from '../components/atoms/Button';
import Chip from '../components/atoms/Chip';
import FilterDrawer from '../components/organisms/FilterDrawer';

const Coffees = () => {
    // ========== STATE ==========
    const [selectedRoastType, setSelectedRoastType] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedProcessing, setSelectedProcessing] = useState('');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    // ========== STICKY DETECTION ==========
    React.useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 200);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // ========== FILTERING ==========
    const filteredCoffees = useMemo(() => {
        return coffees.filter((coffee) => {
            const matchesRoastType = !selectedRoastType || coffee.roastType === selectedRoastType;
            const matchesCountry = !selectedCountry ||
                coffee.origin.some(o => o.country === selectedCountry);
            const matchesProcessing = !selectedProcessing ||
                coffee.origin.some(o => o.processing === selectedProcessing);

            return matchesRoastType && matchesCountry && matchesProcessing;
        });
    }, [selectedRoastType, selectedCountry, selectedProcessing]);

    // ========== DYNAMIC FILTERS DATA ==========
    const filterData = useMemo(() => {
        // Count countries
        const countryMap = new Map();
        coffees.forEach(coffee => {
            coffee.origin.forEach(o => {
                countryMap.set(o.country, (countryMap.get(o.country) || 0) + 1);
            });
        });

        // Count processing methods
        const procMap = new Map();
        coffees.forEach(coffee => {
            coffee.origin.forEach(o => {
                if (o.processing) {
                    procMap.set(o.processing, (procMap.get(o.processing) || 0) + 1);
                }
            });
        });

        return {
            countries: Array.from(countryMap.entries())
                .map(([country, count]) => ({ id: country.toLowerCase(), label: country, count }))
                .sort((a, b) => b.count - a.count),
            processing: Array.from(procMap.entries())
                .map(([processing, count]) => ({ id: processing.toLowerCase(), label: processing, count })),
        };
    }, []);

    // Main filter counts
    const allCount = coffees.length;
    const espressoCount = coffees.filter(c => c.roastType === 'Espresso').length;
    const filterCount = coffees.filter(c => c.roastType === 'Filter').length;

    // ========== HANDLERS ==========
    const handleFilterToggle = (sectionId, filterId) => {
        if (sectionId === 'countries') {
            const country = filterData.countries.find(c => c.id === filterId)?.label;
            setSelectedCountry(selectedCountry === country ? '' : country);
        } else if (sectionId === 'processing') {
            const processing = filterData.processing.find(p => p.id === filterId)?.label;
            setSelectedProcessing(selectedProcessing === processing ? '' : processing);
        }
    };

    const clearAdvancedFilters = () => {
        setSelectedCountry('');
        setSelectedProcessing('');
    };

    const activeAdvancedFilters = [selectedCountry, selectedProcessing].filter(Boolean).length;

    return (
        <div className="min-h-screen bg-primary pt-24 pb-12">

            {/* ========== HEADER ========== */}
            <div className="container mx-auto max-w-7xl px-4 mb-8">
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Nasze Kawy
                    </h1>
                    <p className="text-muted text-lg max-w-2xl mx-auto">
                        Świeżo palone kawy specialty z całego świata.
                        Każda partia palona jest ręcznie z pasją i dbałością o detale.
                    </p>
                </div>
            </div>

            {/* ========== STICKY FILTER BAR ========== */}
            <div
                className={`
          sticky top-20 z-30 bg-primary border-b border-accent/20 py-4 transition-all
          ${isSticky ? 'shadow-xl backdrop-blur-sm bg-primary/95' : ''}
        `}
            >
                <div className="container mx-auto max-w-7xl px-4">
                    <div className="flex items-center gap-3 flex-wrap">

                        {/* Main filters - always visible */}
                        <Chip
                            label="Wszystkie"
                            count={allCount}
                            active={!selectedRoastType}
                            onClick={() => setSelectedRoastType('')}
                            size="md"
                        />
                        <Chip
                            label="Espresso"
                            count={espressoCount}
                            active={selectedRoastType === 'Espresso'}
                            onClick={() => setSelectedRoastType('Espresso')}
                            size="md"
                        />
                        <Chip
                            label="Przelew"
                            count={filterCount}
                            active={selectedRoastType === 'Filter'}
                            onClick={() => setSelectedRoastType('Filter')}
                            size="md"
                        />

                        {/* Divider */}
                        <div className="h-6 w-px bg-accent/30 mx-2"></div>

                        {/* Advanced filters trigger */}
                        <Button
                            variant="ghost"
                            size="sm"
                            leftIcon={<FiFilter />}
                            onClick={() => setIsDrawerOpen(true)}
                        >
                            Więcej filtrów
                            {activeAdvancedFilters > 0 && ` (${activeAdvancedFilters})`}
                        </Button>

                        {/* Results counter */}
                        <span className="text-muted text-sm ml-auto">
              {filteredCoffees.length} {filteredCoffees.length === 1 ? 'kawa' : 'kaw'}
            </span>
                    </div>

                    {/* Active advanced filters summary */}
                    {activeAdvancedFilters > 0 && (
                        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-accent/10">
                            <span className="text-muted text-sm">Aktywne:</span>
                            {selectedCountry && (
                                <Chip
                                    label={selectedCountry}
                                    active={true}
                                    removable={true}
                                    onRemove={() => setSelectedCountry('')}
                                    size="sm"
                                />
                            )}
                            {selectedProcessing && (
                                <Chip
                                    label={selectedProcessing}
                                    active={true}
                                    removable={true}
                                    onRemove={() => setSelectedProcessing('')}
                                    size="sm"
                                />
                            )}
                            <button
                                onClick={clearAdvancedFilters}
                                className="text-accent text-sm hover:underline ml-auto"
                            >
                                Wyczyść
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* ========== COFFEE GRID ========== */}
            <div className="container mx-auto max-w-7xl px-4 mt-8">
                {filteredCoffees.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredCoffees.map((coffee) => (
                            <CoffeeCard key={coffee.id} coffee={coffee} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-muted text-lg mb-4">
                            Nie znaleziono kaw spełniających wybrane kryteria
                        </p>
                        <Button
                            variant="ghost"
                            onClick={() => {
                                setSelectedRoastType('');
                                clearAdvancedFilters();
                            }}
                        >
                            Wyczyść wszystkie filtry
                        </Button>
                    </div>
                )}
            </div>

            {/* ========== ADVANCED FILTERS DRAWER ========== */}
            <FilterDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                filterSections={[
                    {
                        id: 'countries',
                        title: 'Kraj pochodzenia',
                        options: filterData.countries,
                        defaultOpen: true,
                    },
                    {
                        id: 'processing',
                        title: 'Obróbka',
                        options: filterData.processing,
                        defaultOpen: false,
                    },
                ]}
                activeFilters={{
                    countries: selectedCountry ? [selectedCountry.toLowerCase()] : [],
                    processing: selectedProcessing ? [selectedProcessing.toLowerCase()] : [],
                }}
                onFilterToggle={handleFilterToggle}
                onApply={() => setIsDrawerOpen(false)}
                onClear={clearAdvancedFilters}
                totalResults={filteredCoffees.length}
            />
        </div>
    );
};

export default Coffees;