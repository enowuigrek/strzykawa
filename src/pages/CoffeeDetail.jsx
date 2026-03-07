import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { logger } from '../utils/logger';
import {
    trackViewItem,
    trackClickOutOfStock,
    trackCopyProductName,
    trackTastingNotesVisible,
} from '../utils/analytics';
import { PageLayout } from "../components/layout/PageLayout.jsx";
import { ProductBreadcrumb } from '../components/molecules/ProductBreadcrumb';
import { ProductGallery } from '../components/molecules/ProductGallery';
import { ProductMeta } from '../components/molecules/ProductMeta';
import { VariantSelector } from '../components/molecules/VariantSelector';
import { QuantitySelector } from '../components/atoms/QuantitySelector';
import { Button } from '../components/atoms/Button';
import { Spinner } from '../components/atoms/Spinner';
import { SEO } from '../components/SEO.jsx';
import { shopify } from '../services/shopify';
import { useCartStore } from '../store/cartStore';
import { ROAST_TYPE_COLORS } from '../constants/colors';
import { FaShoppingCart, FaTag, FaShareAlt, FaCheck } from 'react-icons/fa';

/**
 * CoffeeDetail - Strona szczegółów produktu kawy
 *
 * NOWA LOGIKA:
 * - Gramatura: z Shopify (warianty), jeśli brak → domyślnie 250g
 * - Forma kawy (ziarna/mielona): ZAWSZE z aplikacji
 * - Mielenie: zależne od roastType, zapisywane do koszyka
 */
export function CoffeeDetail() {
    const { handle } = useParams();
    const [coffee, setCoffee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [addingToCart, setAddingToCart] = useState(false);

    // Nowa logika - forma kawy i mielenie z aplikacji
    const [coffeeForm, setCoffeeForm] = useState('ziarna'); // 'ziarna' | 'mielona'
    const [grindMethod, setGrindMethod] = useState(null);

    const { addItem } = useCartStore();

    // Stan przycisku "Udostępnij"
    const [shareCopied, setShareCopied] = useState(false);

    // Refs dla zdarzeń behawioralnych
    const titleRef = useRef(null);
    const tastingNotesRef = useRef(null);
    const tastingNotesTimerRef = useRef(null);
    const tastingNotesTracked = useRef(false);

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

                // Set default variant - first available or first one
                if (product.variants && product.variants.length > 0) {
                    const availableVariant = product.variants.find(v => v.availableForSale);
                    setSelectedVariant(availableVariant || product.variants[0]);

                    // GA4: view_item
                    trackViewItem(product, availableVariant || product.variants[0]);
                }

                // Reset form state
                setCoffeeForm('ziarna');
                setGrindMethod(null);
            } catch (err) {
                logger.error('Error loading product:', err);
                setError('Nie udało się załadować produktu');
            } finally {
                setLoading(false);
            }
        };

        if (handle) {
            loadProduct();
        }
    }, [handle]);

    // GA4: copy_product_name — nasłuchuj zdarzenia copy na H1
    useEffect(() => {
        const el = titleRef.current;
        if (!el || !coffee) return;
        const handleCopy = () => trackCopyProductName(coffee.name);
        el.addEventListener('copy', handleCopy);
        return () => el.removeEventListener('copy', handleCopy);
    }, [coffee]);

    // GA4: widocznosc_nut_smakowych — sekcja profilu smakowego widoczna ≥ 2s
    useEffect(() => {
        const el = tastingNotesRef.current;
        if (!el || !coffee) return;
        tastingNotesTracked.current = false;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !tastingNotesTracked.current) {
                        tastingNotesTimerRef.current = setTimeout(() => {
                            if (!tastingNotesTracked.current) {
                                tastingNotesTracked.current = true;
                                trackTastingNotesVisible(coffee.name, coffee.tastingNotes);
                            }
                        }, 2000);
                    } else {
                        clearTimeout(tastingNotesTimerRef.current);
                    }
                });
            },
            { threshold: 0.5 }
        );

        observer.observe(el);
        return () => {
            observer.disconnect();
            clearTimeout(tastingNotesTimerRef.current);
        };
    }, [coffee]);

    // Handle share — Web Share API na mobile, fallback clipboard na desktop
    const handleShare = async () => {
        const shareUrl = window.location.href;
        const shareData = {
            title: coffee?.name || 'Kawa Strzykawa',
            text: `Sprawdź tę kawę, w Strzykawie`,
            url: shareUrl,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                // Użytkownik anulował — nic nie robimy
                if (err.name !== 'AbortError') {
                    logger.warn('Share failed:', err);
                }
            }
        } else {
            // Fallback: kopiuj link do schowka
            try {
                await navigator.clipboard.writeText(shareUrl);
                setShareCopied(true);
                setTimeout(() => setShareCopied(false), 2500);
            } catch (err) {
                logger.warn('Clipboard copy failed:', err);
            }
        }
    };

    // Handle add to cart
    const handleAddToCart = async () => {
        if (!selectedVariant || !coffee) return;

        // Walidacja: jeśli mielona, musi być wybrane mielenie
        if (coffeeForm === 'mielona' && !grindMethod) {
            alert('Wybierz sposób mielenia');
            return;
        }

        try {
            setAddingToCart(true);
            await addItem(coffee, selectedVariant.id, quantity, coffeeForm, grindMethod);
            // cartStore dispatches 'cartBounce' event automatically
        } catch (err) {
            logger.error('Error adding to cart:', err);
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
            <PageLayout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <Spinner size="md" />
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

    // Build SEO data from product
    const seoDescription = coffee.description
        ? coffee.description.replace(/<[^>]+>/g, '').slice(0, 155)
        : `${coffee.name} — kawa specialty | Strzykawa Palarnia Kawy`;
    const seoCanonical = `https://strzykawa.com/kawy/${handle}`;
    const seoOgImage = coffee.images?.[0] || 'https://strzykawa.com/og-image.png';
    const seoPrice = selectedVariant?.price ?? price;
    const seoAvailable = selectedVariant?.availableForSale ?? true;
    const seoTitle = `${coffee.name} — ${coffee.roastType === 'Filter' ? 'kawa przelew' : coffee.roastType === 'Espresso' ? 'kawa espresso' : 'kawa'} | Strzykawa Palarnia Kawy`;

    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: coffee.name,
        description: seoDescription,
        image: seoOgImage,
        brand: {
            '@type': 'Brand',
            name: 'Strzykawa',
        },
        offers: {
            '@type': 'Offer',
            url: seoCanonical,
            priceCurrency: 'PLN',
            price: seoPrice.toFixed(2),
            availability: seoAvailable
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
            seller: {
                '@type': 'Organization',
                name: 'Strzykawa',
            },
        },
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Strona główna',
                item: 'https://strzykawa.com',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Nasze kawy',
                item: 'https://strzykawa.com/kawy',
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: coffee.name,
                item: seoCanonical,
            },
        ],
    };

    return (
        <PageLayout>
            <SEO
                fullTitle={seoTitle}
                description={seoDescription}
                canonical={seoCanonical}
                ogImage={seoOgImage}
                ogImageAlt={`${coffee.name} — Strzykawa Palarnia Kawy`}
                ogType="product"
                productSchema={productSchema}
                breadcrumbSchema={breadcrumbSchema}
            />
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
                            <h1 ref={titleRef} className="text-3xl lg:text-4xl text-white pr-16">
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

                        {/* Share button row */}
                        <div className="flex items-center">
                            <button
                                type="button"
                                onClick={handleShare}
                                className={`
                                    inline-flex items-center gap-1.5
                                    px-3 py-1.5 rounded-full text-xs font-medium
                                    transition-all duration-200
                                    ${shareCopied
                                        ? 'bg-success text-white'
                                        : 'bg-primary-light text-muted hover:bg-accent/20 hover:text-white'
                                    }
                                `}
                                aria-label="Udostępnij produkt"
                            >
                                {shareCopied
                                    ? <><FaCheck size={11} /><span>Link skopiowany!</span></>
                                    : <><FaShareAlt size={11} /><span>Udostępnij</span></>
                                }
                            </button>
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
                                    <span className="text-base text-red-400">
                                        Oszczędzasz {(compareAtPrice - price).toFixed(2)} zł
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Product Meta — ref dla widocznosc_nut_smakowych */}
                        <div ref={tastingNotesRef}>
                            <ProductMeta coffee={coffee} />
                        </div>

                        {/* Variant Selector */}
                        <div>
                            <VariantSelector
                                variants={coffee.variants}
                                selectedVariant={selectedVariant}
                                onVariantChange={setSelectedVariant}
                                coffeeForm={coffeeForm}
                                onCoffeeFormChange={setCoffeeForm}
                                grindMethod={grindMethod}
                                onGrindMethodChange={setGrindMethod}
                                roastType={coffee.roastType}
                            >
                                {/* Liczba - renderowana w lewej kolumnie pod Gramaturą */}
                                <div>
                                    <label className="block text-base text-white mb-2">
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
                            </VariantSelector>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-accent/20"></div>

                        {/* Razem */}
                        <div className="flex justify-between items-center py-2">
                            <span className="text-white">Razem:</span>
                            <span className="text-xl text-white">
                                {isAvailable ? `${(price * quantity).toFixed(2)} zł` : 'Niedostępne'}
                            </span>
                        </div>

                        {/* Przycisk dodaj — wrapper dla GA4 click_out_of_stock */}
                        <div className="relative">
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
                            {/* Transparentna nakładka do śledzenia kliknięć w niedostępny produkt */}
                            {!isAvailable && (
                                <div
                                    className="absolute inset-0 cursor-not-allowed"
                                    onClick={() => trackClickOutOfStock(coffee, selectedVariant?.id)}
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* Description Section */}
                {coffee.description && (
                    <div className="mx-auto">
                        <div className="p-6 lg:p-8 bg-primary-light">
                            <h2 className="text-2xl text-white mb-4">
                                Opis:
                            </h2>
                            <div className="prose prose-invert max-w-none">
                                <p className="text-white/90 text-lg leading-relaxed whitespace-pre-line">
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
