import React, { useState, useMemo } from 'react';
import coffees from '../data/coffees.js';
import { PageLayout } from '../components/PageLayout';
import { CoffeeFilterBar } from '../components/organisms/CoffeeFilterBar';
import { CoffeeGrid } from '../components/organisms/CoffeeGrid';
import { FilterDrawer } from '../components/organisms/FilterDrawer';

export function Coffees() {
    // ========== STATE ==========
    const [selectedRoastType, setSelectedRoastType] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedProcessing, setSelectedProcessing] = useState('');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    // ========== SCROLL DETECTION ==========
    React.useEffect(() => {
        const handleScroll = () => setIsSticky(window.scrollY > 480);
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

    // ========== FILTER DATA (DYNAMIC) ==========
    const filterData = useMemo(() => {
        const countryMap = new Map();
        const procMap = new Map();

        coffees.forEach(coffee => {
            coffee.origin.forEach(o => {
                countryMap.set(o.country, (countryMap.get(o.country) || 0) + 1);
                if (o.processing) {
                    procMap.set(o.processing, (procMap.get(o.processing) || 0) + 1);
                }
            });
        });

        return {
            countries: Array.from(countryMap.entries())
                .map(([country, count]) => ({
                    id: country.toLowerCase(),
                    label: country,
                    count
                }))
                .sort((a, b) => b.count - a.count),
            processing: Array.from(procMap.entries())
                .map(([processing, count]) => ({
                    id: processing.toLowerCase(),
                    label: processing,
                    count
                })),
        };
    }, []);

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

    const clearAllFilters = () => {
        setSelectedRoastType('');
        setSelectedCountry('');
        setSelectedProcessing('');
    };

    const clearAdvancedFilters = () => {
        setSelectedCountry('');
        setSelectedProcessing('');
    };

    // ========== COUNTS ==========
    const allCount = coffees.length;
    const espressoCount = coffees.filter(c => c.roastType === 'Espresso').length;
    const filterCount = coffees.filter(c => c.roastType === 'Filter').length;

    // ========== RENDER ==========
    return (
        <PageLayout
            title="Nasze Kawy"
            description="Świeżo palone kawy specialty z całego świata. Każda partia palona jest ręcznie z pasją i dbałością o detale."
        >

            {/* Filter Bar (Sticky) */}
            <CoffeeFilterBar
                selectedRoastType={selectedRoastType}
                onRoastTypeChange={(type) =>
                    setSelectedRoastType((prev) => (prev === type ? '' : type))
                }
                selectedCountry={selectedCountry}
                onCountryRemove={() => setSelectedCountry('')}
                selectedProcessing={selectedProcessing}
                onProcessingRemove={() => setSelectedProcessing('')}
                onMoreFiltersClick={() => setIsDrawerOpen(true)}
                onClearAdvanced={clearAdvancedFilters}
                allCount={allCount}
                espressoCount={espressoCount}
                filterCount={filterCount}
                resultCount={filteredCoffees.length}
                isSticky={isSticky}
            />

            {/* Coffee Grid */}
            <div className="container mx-auto max-w-7xl px-4 mt-8">
                <CoffeeGrid
                    coffees={filteredCoffees}
                    onClearFilters={clearAllFilters}
                />
            </div>

            {/* Advanced Filters Drawer */}
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
        </PageLayout>
    );
};

export default Coffees;