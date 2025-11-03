import React, { useState, useMemo, useEffect } from 'react';
import { shopify } from '../services/shopify.js';
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

    // ========== SHOPIFY STATE ==========
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ========== FETCH PRODUCTS FROM SHOPIFY ==========
    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                console.log('🔍 Loading products from Shopify...');

                const fetchedProducts = await shopify.fetchProducts(50); // Fetch up to 50 products

                console.log('✅ Products loaded:', fetchedProducts);
                setProducts(fetchedProducts);
                setError(null);
            } catch (err) {
                console.error('❌ Error loading products:', err);
                setError('Nie udało się załadować kaw. Spróbuj ponownie później.');
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []); // Run once on mount

    // ========== SCROLL DETECTION ==========
    useEffect(() => {
        const handleScroll = () => setIsSticky(window.scrollY > 480);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // ========== FILTERING ==========
    const filteredCoffees = useMemo(() => {
        return products.filter((coffee) => {
            const matchesRoastType = !selectedRoastType || coffee.roastType === selectedRoastType;
            const matchesCountry = !selectedCountry ||
                coffee.origin.some(o => o.country === selectedCountry);
            const matchesProcessing = !selectedProcessing ||
                coffee.origin.some(o => o.processing === selectedProcessing);

            return matchesRoastType && matchesCountry && matchesProcessing;
        });
    }, [products, selectedRoastType, selectedCountry, selectedProcessing]);

    // ========== FILTER DATA (DYNAMIC) ==========
    const filterData = useMemo(() => {
        const countryMap = new Map();
        const procMap = new Map();

        products.forEach(coffee => {
            coffee.origin.forEach(o => {
                if (o.country) {
                    countryMap.set(o.country, (countryMap.get(o.country) || 0) + 1);
                }
                if (o.processing) {
                    procMap.set(o.processing, (procMap.get(o.processing) || 0) + 1);
                }
            });
        });

        return {
            roastTypes: [
                { value: 'Espresso', label: 'Espresso', count: products.filter(c => c.roastType === 'Espresso').length },
                { value: 'Filter', label: 'Przelew', count: products.filter(c => c.roastType === 'Filter').length }
            ],
            countries: Array.from(countryMap.entries())
                .map(([value, count]) => ({ value, label: value, count }))
                .sort((a, b) => b.count - a.count),
            processing: Array.from(procMap.entries())
                .map(([value, count]) => ({ value, label: value, count }))
                .sort((a, b) => b.count - a.count)
        };
    }, [products]);

    // ========== HANDLERS ==========
    const handleClearFilters = () => {
        setSelectedRoastType('');
        setSelectedCountry('');
        setSelectedProcessing('');
    };

    // ========== LOADING STATE ==========
    if (loading) {
        return (
            <PageLayout
                title="Nasze Kawy"
                description="Odkryj naszą kolekcję kaw speciality z całego świata"
            >
                <div className="container mx-auto px-4 py-16">
                    <div className="flex flex-col items-center justify-center min-h-[400px]">
                        <div className="animate-spin w-16 h-16 border-4 border-accent border-t-transparent rounded-full mb-6"></div>
                        <p className="text-white text-lg">Ładowanie kaw...</p>
                    </div>
                </div>
            </PageLayout>
        );
    }

    // ========== ERROR STATE ==========
    if (error) {
        return (
            <PageLayout
                title="Nasze Kawy"
                description="Odkryj naszą kolekcję kaw speciality z całego świata"
            >
                <div className="container mx-auto px-4 py-16">
                    <div className="flex flex-col items-center justify-center min-h-[400px]">
                        <div className="text-red-400 text-6xl mb-6">⚠️</div>
                        <p className="text-white text-lg mb-4">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/80 transition-colors"
                        >
                            Spróbuj ponownie
                        </button>
                    </div>
                </div>
            </PageLayout>
        );
    }

    // ========== MAIN RENDER ==========
    return (
        <PageLayout
            title="Nasze Kawy"
            description="Odkryj naszą kolekcję kaw speciality z całego świata"
        >
            <div className="container mx-auto px-4 py-8">
                {/* Filter Bar - Desktop */}
                <CoffeeFilterBar
                    filterData={filterData}
                    selectedRoastType={selectedRoastType}
                    selectedCountry={selectedCountry}
                    selectedProcessing={selectedProcessing}
                    onRoastTypeChange={setSelectedRoastType}
                    onCountryChange={setSelectedCountry}
                    onProcessingChange={setSelectedProcessing}
                    onClearFilters={handleClearFilters}
                    onOpenMobileFilters={() => setIsDrawerOpen(true)}
                    isSticky={isSticky}
                    resultCount={filteredCoffees.length}
                />

                {/* Coffee Grid */}
                <CoffeeGrid
                    coffees={filteredCoffees}
                    onClearFilters={handleClearFilters}
                />

                {/* Filter Drawer - Mobile */}
                <FilterDrawer
                    isOpen={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                    filterData={filterData}
                    selectedRoastType={selectedRoastType}
                    selectedCountry={selectedCountry}
                    selectedProcessing={selectedProcessing}
                    onRoastTypeChange={setSelectedRoastType}
                    onCountryChange={setSelectedCountry}
                    onProcessingChange={setSelectedProcessing}
                    onClearFilters={handleClearFilters}
                    resultCount={filteredCoffees.length}
                />
            </div>
        </PageLayout>
    );
}

// import React, { useState, useMemo } from 'react';
// import coffees from '../data/coffees.js';
// import { PageLayout } from '../components/PageLayout';
// import { CoffeeFilterBar } from '../components/organisms/CoffeeFilterBar';
// import { CoffeeGrid } from '../components/organisms/CoffeeGrid';
// import { FilterDrawer } from '../components/organisms/FilterDrawer';
//
// export function Coffees() {
//     // ========== STATE ==========
//     const [selectedRoastType, setSelectedRoastType] = useState('');
//     const [selectedCountry, setSelectedCountry] = useState('');
//     const [selectedProcessing, setSelectedProcessing] = useState('');
//     const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//     const [isSticky, setIsSticky] = useState(false);
//
//     // ========== SCROLL DETECTION ==========
//     React.useEffect(() => {
//         const handleScroll = () => setIsSticky(window.scrollY > 480);
//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);
//
//     // ========== FILTERING ==========
//     const filteredCoffees = useMemo(() => {
//         return coffees.filter((coffee) => {
//             const matchesRoastType = !selectedRoastType || coffee.roastType === selectedRoastType;
//             const matchesCountry = !selectedCountry ||
//                 coffee.origin.some(o => o.country === selectedCountry);
//             const matchesProcessing = !selectedProcessing ||
//                 coffee.origin.some(o => o.processing === selectedProcessing);
//
//             return matchesRoastType && matchesCountry && matchesProcessing;
//         });
//     }, [selectedRoastType, selectedCountry, selectedProcessing]);
//
//     // ========== FILTER DATA (DYNAMIC) ==========
//     const filterData = useMemo(() => {
//         const countryMap = new Map();
//         const procMap = new Map();
//
//         coffees.forEach(coffee => {
//             coffee.origin.forEach(o => {
//                 countryMap.set(o.country, (countryMap.get(o.country) || 0) + 1);
//                 if (o.processing) {
//                     procMap.set(o.processing, (procMap.get(o.processing) || 0) + 1);
//                 }
//             });
//         });
//
//         return {
//             countries: Array.from(countryMap.entries())
//                 .map(([country, count]) => ({
//                     id: country.toLowerCase(),
//                     label: country,
//                     count
//                 }))
//                 .sort((a, b) => b.count - a.count),
//             processing: Array.from(procMap.entries())
//                 .map(([processing, count]) => ({
//                     id: processing.toLowerCase(),
//                     label: processing,
//                     count
//                 })),
//         };
//     }, []);
//
//     // ========== HANDLERS ==========
//     const handleFilterToggle = (sectionId, filterId) => {
//         if (sectionId === 'countries') {
//             const country = filterData.countries.find(c => c.id === filterId)?.label;
//             setSelectedCountry(selectedCountry === country ? '' : country);
//         } else if (sectionId === 'processing') {
//             const processing = filterData.processing.find(p => p.id === filterId)?.label;
//             setSelectedProcessing(selectedProcessing === processing ? '' : processing);
//         }
//     };
//
//     const clearAllFilters = () => {
//         setSelectedRoastType('');
//         setSelectedCountry('');
//         setSelectedProcessing('');
//     };
//
//     const clearAdvancedFilters = () => {
//         setSelectedCountry('');
//         setSelectedProcessing('');
//     };
//
//     // ========== COUNTS ==========
//     const allCount = coffees.length;
//     const espressoCount = coffees.filter(c => c.roastType === 'Espresso').length;
//     const filterCount = coffees.filter(c => c.roastType === 'Filter').length;
//
//     // ========== RENDER ==========
//     return (
//         <PageLayout
//             title="Nasze Kawy"
//             description="Świeżo palone kawy specialty z całego świata. Każda partia palona jest ręcznie z pasją i dbałością o detale."
//         >
//
//             {/* Filter Bar (Sticky) */}
//             <CoffeeFilterBar
//                 selectedRoastType={selectedRoastType}
//                 onRoastTypeChange={(type) =>
//                     setSelectedRoastType((prev) => (prev === type ? '' : type))
//                 }
//                 selectedCountry={selectedCountry}
//                 onCountryRemove={() => setSelectedCountry('')}
//                 selectedProcessing={selectedProcessing}
//                 onProcessingRemove={() => setSelectedProcessing('')}
//                 onMoreFiltersClick={() => setIsDrawerOpen(true)}
//                 onClearAdvanced={clearAdvancedFilters}
//                 allCount={allCount}
//                 espressoCount={espressoCount}
//                 filterCount={filterCount}
//                 resultCount={filteredCoffees.length}
//                 isSticky={isSticky}
//             />
//
//             {/* Coffee Grid */}
//             <div className="container mx-auto max-w-7xl px-4 mt-8">
//                 <CoffeeGrid
//                     coffees={filteredCoffees}
//                     onClearFilters={clearAllFilters}
//                 />
//             </div>
//
//             {/* Advanced Filters Drawer */}
//             <FilterDrawer
//                 isOpen={isDrawerOpen}
//                 onClose={() => setIsDrawerOpen(false)}
//                 filterSections={[
//                     {
//                         id: 'countries',
//                         title: 'Kraj pochodzenia',
//                         options: filterData.countries,
//                         defaultOpen: true,
//                     },
//                     {
//                         id: 'processing',
//                         title: 'Obróbka',
//                         options: filterData.processing,
//                         defaultOpen: false,
//                     },
//                 ]}
//                 activeFilters={{
//                     countries: selectedCountry ? [selectedCountry.toLowerCase()] : [],
//                     processing: selectedProcessing ? [selectedProcessing.toLowerCase()] : [],
//                 }}
//                 onFilterToggle={handleFilterToggle}
//                 onApply={() => setIsDrawerOpen(false)}
//                 onClear={clearAdvancedFilters}
//                 totalResults={filteredCoffees.length}
//             />
//         </PageLayout>
//     );
// };