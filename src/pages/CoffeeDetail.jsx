import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PageLayout } from "../components/layout/PageLayout.jsx";
import { ProductBreadcrumb } from '../components/molecules/ProductBreadcrumb';
import { ProductGallery } from '../components/molecules/ProductGallery';
import { ProductMeta } from '../components/molecules/ProductMeta';
import { VariantSelector } from '../components/molecules/VariantSelector';
import { QuantitySelector } from '../components/atoms/QuantitySelector';
import { Button } from '../components/atoms/Button';
import { Spinner } from '../components/atoms/Spinner';
import { shopify } from '../services/shopify';
import { useCartStore } from '../store/cartStore';
import { ROAST_TYPE_COLORS } from '../constants/colors';
import { FaShoppingCart, FaTag } from 'react-icons/fa';

/**
 * CoffeeDetail - Strona szczegółów produktu kawy
 * FIXED: Blokada dodawania niedostępnych wariantów
 */
export function CoffeeDetail() {
    const { handle } = useParams();
    const [coffee, setCoffee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [addingToCart, setAddingToCart] = useState(false);

    const { addItem } = useCartStore();

    // Fetch product data
    useEffect(() => {
        const loadProduct = async () => {
            try {
                setLoading(true);
                setError(null);
                const product = await shopify.fetchProduct(handle);

                if (!product) {
                    setError('Produkt nie został znaleziony');
                    return;
                }

                setCoffee(product);
                // Set default variant (first AVAILABLE)
                if (product.variants && product.variants.length > 0) {
                    const availableVariant = product.variants.find(v => v.availableForSale);
                    setSelectedVariant(availableVariant || product.variants[0]);
                }
            } catch (err) {
                if (import.meta.env.DEV) {
                    console.error('Error loading product:', err);
                }
                setError('Nie udało się załadować produktu');
            } finally {
                setLoading(false);
            }
        };

        if (handle) {
            loadProduct();
        }
    }, [handle]);

    // Handle add to cart - CHECK availableForSale
    const handleAddToCart = async () => {
        if (!selectedVariant || !coffee || !selectedVariant.availableForSale) return;

        try {
            setAddingToCart(true);
            await addItem(coffee, selectedVariant.id, quantity);
            alert(`Dodano ${quantity}x ${coffee.name} do koszyka!`);
        } catch (err) {
            if (import.meta.env.DEV) {
                console.error('Error adding to cart:', err);
            }
            alert('Nie udało się dodać do koszyka');
        } finally {
            setAddingToCart(false);
        }
    };

    // Get roast type display
    const getRoastTypeDisplay = (roastType) => {
        const mapping = {
            'Filter': 'Przelew',
            'Espresso': 'Espresso'
        };
        return mapping[roastType] || roastType;
    };

    // Loading state
    if (loading) {
        return (
            <PageLayout title="Ładowanie..." description="">
                <div className="container mx-auto max-w-7xl px-4 py-12">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-center">
                            <Spinner size="md" className="mx-auto mb-4" />
                        </div>
                    </div>
                </div>
            </PageLayout>
        );
    }

    // Error state
    if (error || !coffee) {
        return (
            <PageLayout title="Błąd" description="">
                <div className="container mx-auto max-w-7xl px-4 py-12">
                    <div className="text-center">
                        <p className="text-red-400 text-lg mb-4">{error || 'Produkt nie został znaleziony'}</p>
                        <Button
                            onClick={() => window.history.back()}
                            variant="secondary"
                        >
                            Wróć
                        </Button>
                    </div>
                </div>
            </PageLayout>
        );
    }

    // Calculate price (from selected variant)
    const price = selectedVariant?.price || 0;
    const compareAtPrice = selectedVariant?.compareAtPrice;
    const hasDiscount = compareAtPrice && compareAtPrice > price;
    const isAvailable = selectedVariant?.availableForSale ?? true;

    return (
        <PageLayout>
            <div className="container mx-auto max-w-7xl px-4 py-8">
                {/* Breadcrumb */}
                <ProductBreadcrumb coffeeName={coffee.name} />

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
                    {/* Left Column - Gallery */}
                    <div>
                        <ProductGallery
                            images={coffee.images}
                            coffeeName={coffee.name}
                        />
                    </div>

                    {/* Right Column - Product Info */}
                    <div className="space-y-6">
                        {/* Title & Roast Type Badge */}
                        <div className="relative">
                            <h1 className="text-3xl lg:text-4xl text-white pr-16">
                                {coffee.name}
                            </h1>

                            {/* Roast Type Badge */}
                            {coffee.roastType && (
                                <div
                                    className="absolute -top-2 right-0 w-16 h-16 rounded-full flex items-center justify-center text-xs uppercase tracking-wider text-white shadow-lg transform"
                                    style={{ backgroundColor: ROAST_TYPE_COLORS[coffee.roastType] || ROAST_TYPE_COLORS.Espresso }}
                                >
                                    {getRoastTypeDisplay(coffee.roastType)}
                                </div>
                            )}
                        </div>

                        {/* Price */}
                        <div>
                            <div className="flex items-baseline gap-3">
                                {hasDiscount && (
                                    <span className="text-2xl text-muted line-through">
                                        {compareAtPrice.toFixed(2)} zł
                                    </span>
                                )}
                                <span className="text-3xl text-muted">
                                    {isAvailable ? `${price.toFixed(2)} zł` : 'Niedostępne'}
                                </span>
                            </div>
                            {hasDiscount && (
                                <div className="mt-2 flex items-center gap-2">
                                    <FaTag className="text-red-400" />
                                    <span className="text-sm text-red-400 font-semibold">
                                        Oszczędzasz {(compareAtPrice - price).toFixed(2)} zł
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Product Meta */}
                        <ProductMeta coffee={coffee} />

                        {/* Variant Selector + Liczba */}
                        <div className="flex justify-between items-end gap-4">
                            <div className="flex-1">
                                <VariantSelector
                                    variants={coffee.variants}
                                    selectedVariant={selectedVariant}
                                    onVariantChange={setSelectedVariant}
                                />
                            </div>
                            <div className="flex flex-col items-end">
                                <label className="text-sm font-semibold text-white mb-2">
                                    Liczba
                                </label>
                                <QuantitySelector
                                    quantity={quantity}
                                    onQuantityChange={setQuantity}
                                    min={1}
                                    max={20}
                                    size="lg"
                                    disabled={!isAvailable}
                                />
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-accent/20"></div>

                        {/* Razem */}
                        <div className="flex justify-between items-center py-2">
                            <span className="text-white font-medium">Razem:</span>
                            <span className="text-xl font-bold text-white">
                                {isAvailable ? `${(price * quantity).toFixed(2)} zł` : 'Niedostępne'}
                            </span>
                        </div>

                        {/* Przycisk dodaj */}
                        <Button
                            onClick={handleAddToCart}
                            disabled={addingToCart || !isAvailable}
                            loading={addingToCart}
                            leftIcon={FaShoppingCart}
                            variant="primary"
                            size="lg"
                            fullWidth
                        >
                            <span className="hidden sm:inline">
                                {addingToCart ? 'Dodawanie...' :
                                    !isAvailable ? 'Niedostępne' :
                                        'Dodaj do koszyka'}
                            </span>
                            <span className="sm:hidden">
                                {addingToCart ? 'Dodawanie...' :
                                    !isAvailable ? 'Niedostępne' :
                                        'Dodaj'}
                            </span>
                        </Button>
                    </div>
                </div>

                {/* Description Section */}
                {coffee.description && (
                    <div className="mx-auto">
                        <div className="p-6 lg:p-8 bg-primary-light border border-white/10">
                            <h2 className="text-2xl font-bold text-white mb-4">
                                Opis:
                            </h2>
                            <div className="prose prose-invert max-w-none">
                                <p className="text-white/90 leading-relaxed whitespace-pre-line">
                                    {coffee.description}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </PageLayout>
    );
}