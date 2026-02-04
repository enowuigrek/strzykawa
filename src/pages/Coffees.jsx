import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { shopify } from '../services/shopify';
import { logger } from '../utils/logger';
import { PageLayout } from "../components/layout/PageLayout.jsx";
import { CoffeeFilterBar } from '../components/organisms/CoffeeFilterBar';
import { CoffeeGrid } from '../components/organisms/CoffeeGrid';
import { FilterDrawer } from '../components/organisms/FilterDrawer';
import { Spinner } from '../components/atoms/Spinner';

export function Coffees() {
    // ========== STATE ==========
    const [selectedRoastType, setSelectedRoastType] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedProcessing, setSelectedProcessing] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const gridRef = useRef(null);

    // Scroll do góry gridu po zmianie filtra (tylko mobile)
    const scrollToGrid = useCallback(() => {
        if (gridRef.current && window.innerWidth < 768) {
            gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, []);

    // ========== SHOPIFY STATE ==========
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ========== FETCH PRODUCTS FROM SHOPIFY ==========
    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                const fetchedProducts = await shopify.fetchProducts(50); // Fetch up to 50 products
                setProducts(fetchedProducts);
                setError(null);
            } catch (err) {
                logger.error('❌ Error loading products:', err);
                setError('Nie udało się załadować kaw. Spróbuj ponownie później.');
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []); // Run once on mount

    // ========== FILTERING (+ SEARCH) ==========
    const filteredCoffees = useMemo(() => {
        const filtered = products.filter((coffee) => {
            // Roast type filter
            const matchesRoastType = !selectedRoastType || coffee.roastType === selectedRoastType;

            // Country filter
            const matchesCountry = !selectedCountry ||
                coffee.origin.some(o => o.country === selectedCountry);

            // Processing filter
            const matchesProcessing = !selectedProcessing ||
                coffee.origin.some(o => o.processing === selectedProcessing);

            // Search filter
            const searchLower = searchQuery.toLowerCase();
            const normalizedSearch = searchLower === 'przelew' ? 'filter' : searchLower;

            const matchesSearch = !searchQuery ||
                coffee.title?.toLowerCase().includes(normalizedSearch) ||
                coffee.name?.toLowerCase().includes(normalizedSearch) ||
                coffee.roastType?.toLowerCase().includes(normalizedSearch) ||
                coffee.tastingNotes?.some(note => note.toLowerCase().includes(normalizedSearch)) ||
                coffee.origin?.some(o =>
                    (o.country && o.country.toLowerCase().includes(normalizedSearch)) ||
                    (o.processing && o.processing.toLowerCase().includes(normalizedSearch)) ||
                    (o.variety && o.variety.some(v => v.toLowerCase().includes(normalizedSearch)))
                );

            return matchesRoastType && matchesCountry && matchesProcessing && matchesSearch;
        });

        // Sortowanie
        const getLowestPrice = (coffee) => coffee.variants?.[0]?.price ?? 0;

        return [...filtered].sort((a, b) => {
            switch (sortBy) {
                case 'price-asc':
                    return getLowestPrice(a) - getLowestPrice(b);
                case 'price-desc':
                    return getLowestPrice(b) - getLowestPrice(a);
                case 'name-asc':
                    return (a.name || '').localeCompare(b.name || '', 'pl');
                case 'newest':
                default:
                    // Shopify GID: wyższy numer = nowszy produkt
                    return (b.id || '').localeCompare(a.id || '');
            }
        });
    }, [products, selectedRoastType, selectedCountry, selectedProcessing, searchQuery, sortBy]);

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
        setSearchQuery('');
        setSortBy('newest');
    };

    // ========== COUNTS FOR FILTER BAR ==========
    const allCount = products.length;
    const espressoCount = products.filter(c => c.roastType === 'Espresso').length;
    const filterCount = products.filter(c => c.roastType === 'Filter').length;

    // ========== LOADING STATE ==========
    if (loading) {
        return (
            <PageLayout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <Spinner size="md" />
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
                            className="px-6 py-3 bg-accent text-white rounded-full hover:bg-accent/80 transition-colors"
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
        <PageLayout>
            {/* Filter Bar - Sticky */}
            <CoffeeFilterBar
                selectedRoastType={selectedRoastType}
                onRoastTypeChange={(type) => {
                    setSelectedRoastType((prev) => (prev === type ? '' : type));
                    scrollToGrid();
                }}
                onSearchChange={setSearchQuery}
                selectedCountry={selectedCountry}
                onCountryRemove={() => setSelectedCountry('')}
                selectedProcessing={selectedProcessing}
                onProcessingRemove={() => setSelectedProcessing('')}
                onMoreFiltersClick={() => setIsDrawerOpen(true)}
                onClearAdvanced={() => {
                    setSelectedCountry('');
                    setSelectedProcessing('');
                }}
                allCount={allCount}
                espressoCount={espressoCount}
                filterCount={filterCount}
                resultCount={filteredCoffees.length}
                sortValue={sortBy}
                onSortChange={setSortBy}
            />

            {/* ✅ FIX #3: Coffee Grid z CONTAINER WRAPPEREM */}
            <div ref={gridRef} className="container mx-auto max-w-7xl px-4 mt-8 scroll-mt-[100px] lg:scroll-mt-[120px]">
                <CoffeeGrid
                    coffees={filteredCoffees}
                    onClearFilters={handleClearFilters}
                />
            </div>

            {/* Filter Drawer - Mobile */}
            <FilterDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                filterSections={[
                    {
                        id: 'countries',
                        title: 'Kraj pochodzenia',
                        options: filterData.countries.map(c => ({
                            id: c.value.toLowerCase(),
                            label: c.label,
                            count: c.count
                        })),
                        defaultOpen: true,
                    },
                    {
                        id: 'processing',
                        title: 'Obróbka',
                        options: filterData.processing.map(p => ({
                            id: p.value.toLowerCase(),
                            label: p.label,
                            count: p.count
                        })),
                        defaultOpen: false,
                    },
                ]}
                activeFilters={{
                    countries: selectedCountry ? [selectedCountry.toLowerCase()] : [],
                    processing: selectedProcessing ? [selectedProcessing.toLowerCase()] : [],
                }}
                onFilterToggle={(sectionId, filterId) => {
                    if (sectionId === 'countries') {
                        const country = filterData.countries.find(c => c.value.toLowerCase() === filterId)?.value;
                        setSelectedCountry(selectedCountry === country ? '' : country);
                    } else if (sectionId === 'processing') {
                        const processing = filterData.processing.find(p => p.value.toLowerCase() === filterId)?.value;
                        setSelectedProcessing(selectedProcessing === processing ? '' : processing);
                    }
                }}
                onApply={() => setIsDrawerOpen(false)}
                onClear={() => {
                    setSelectedCountry('');
                    setSelectedProcessing('');
                }}
                totalResults={filteredCoffees.length}
            />
        </PageLayout>
    );
}