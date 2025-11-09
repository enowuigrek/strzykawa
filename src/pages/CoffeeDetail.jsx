import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PageLayout } from "../components/layout/PageLayout.jsx";
import { ProductBreadcrumb } from '../components/molecules/ProductBreadcrumb';
import { ProductGallery } from '../components/molecules/ProductGallery';
import { ProductMeta } from '../components/molecules/ProductMeta';
import { VariantSelector } from '../components/molecules/VariantSelector';
import { QuantitySelector } from '../components/atoms/QuantitySelector';
import { Button } from '../components/atoms/Button';
import { shopify } from '../services/shopify';
import { useCartStore } from '../store/cartStore';
import { FaShoppingCart, FaTag } from 'react-icons/fa';

/**
 * CoffeeDetail - Strona szczegółów produktu kawy
 * Pobiera dane z Shopify API i wyświetla pełne informacje o kawie
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
                // Set default variant (first available)
                if (product.variants && product.variants.length > 0) {
                    setSelectedVariant(product.variants[0]);
                }
            } catch (err) {
                console.error('Error loading product:', err);
                setError('Nie udało się załadować produktu');
            } finally {
                setLoading(false);
            }
        };

        if (handle) {
            loadProduct();
        }
    }, [handle]);

    // Handle add to cart
    const handleAddToCart = async () => {
        if (!selectedVariant || !coffee) return;

        try {
            setAddingToCart(true);
            await addItem(coffee, selectedVariant.id, quantity);
            // Optional: Show success message or redirect to cart
            alert(`Dodano ${quantity}x ${coffee.name} do koszyka!`);
        } catch (err) {
            console.error('Error adding to cart:', err);
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
                            <div className="animate-spin w-12 h-12 border-4 border-accent border-t-transparent rounded-full mx-auto mb-4"></div>
                            <p className="text-white">Ładowanie kawy...</p>
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

                            {/* Roast Type Badge - okrągła naklejka jak na karcie */}
                            {coffee.roastType && (
                                <div className={`
                                    absolute -top-2 -right-2
                                    w-16 h-16 rounded-full
                                    flex items-center justify-center
                                    text-xs uppercase tracking-wider
                                    shadow-lg transform
                                    ${coffee.roastType === 'Filter'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gradient-to-br from-amber-600 to-amber-800 text-white'
                                }
                                `}>
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
                                    {price.toFixed(2)} zł
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


                        {/* Variant Selector */}
                        <VariantSelector
                            variants={coffee.variants}
                            selectedVariant={selectedVariant}
                            onVariantChange={setSelectedVariant}
                        />

                        {/* Quantity & Add to Cart */}
                        <div className="space-y-3 pt-4 border-t border-white/10">
                            {/* Liczba */}
                            <div>
                                <label className="block text-sm font-semibold text-white mb-2">
                                    Liczba
                                </label>
                                <QuantitySelector
                                    quantity={quantity}
                                    onQuantityChange={setQuantity}
                                    min={1}
                                    max={20}
                                    size="lg"
                                />
                            </div>

                            {/* Przycisk dodaj - responsive text */}
                            <Button
                                onClick={handleAddToCart}
                                disabled={addingToCart}
                                loading={addingToCart}
                                icon={FaShoppingCart}
                                variant="primary"
                                size="lg"
                                className="w-full"
                            >
                                <span className="hidden sm:inline">
                                    {addingToCart ? 'Dodawanie...' : 'Dodaj do koszyka'}
                                </span>
                                <span className="sm:hidden">
                                    {addingToCart ? 'Dodawanie...' : 'Dodaj'}
                                </span>
                            </Button>

                            {/* Total Price Preview */}
                            <div className="space-y-3 pt-4 border-t border-white/10">
                                <div className="flex justify-between items-center">
                                    <span className="text-white">Razem:</span>
                                    <span className="text-xl text-white">
                                        {(price * quantity).toFixed(2)} zł
                                    </span>
                                </div>
                            </div>
                        </div>
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