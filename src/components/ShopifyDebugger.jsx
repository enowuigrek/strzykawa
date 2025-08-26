// Stwórz nowy plik src/components/ShopifyDebugger.jsx

import React, { useState, useEffect } from 'react';
import { shopify } from '../services/shopify.js';

export default function ShopifyDebugger() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            setLoading(true);
            const fetchedProducts = await shopify.fetchProducts(10);
            setProducts(fetchedProducts);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="p-8 bg-primary-light rounded-lg max-w-6xl mx-auto mt-8">
                <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-4 border-accent border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-white">Ładowanie produktów z Shopify...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 bg-primary-light rounded-lg max-w-7xl mx-auto mt-8">
            <h2 className="text-2xl font-bold text-white mb-6">🔧 Shopify Products Debugger</h2>

            {error && (
                <div className="mb-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                    <p className="text-red-300">❌ Error: {error}</p>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Products List */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                        Products ({products.length})
                    </h3>

                    <div className="space-y-2 max-h-96 overflow-y-auto">
                        {products.map(product => (
                            <button
                                key={product.id}
                                onClick={() => setSelectedProduct(product)}
                                className={`w-full text-left p-3 rounded border transition-colors ${
                                    selectedProduct?.id === product.id
                                        ? 'bg-accent/20 border-accent/50 text-white'
                                        : 'bg-primary border-white/10 text-muted hover:text-white hover:border-white/20'
                                }`}
                            >
                                <div className="font-medium">{product.name}</div>
                                <div className="text-xs opacity-75">{product.shopifyHandle}</div>
                                <div className="text-xs mt-1">
                                    Origin: {product.origin?.length || 0} |
                                    Notes: {product.tastingNotes?.length || 0} |
                                    Level: {product.roastLevel}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Coffee Card Preview */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                        Coffee Card Preview
                        {selectedProduct && (
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="ml-2 text-sm text-red-300 hover:text-red-200"
                            >
                                Clear
                            </button>
                        )}
                    </h3>

                    {selectedProduct ? (
                        <div className="space-y-6">
                            {/* Coffee Card Component */}
                            <div className="bg-gradient-to-br from-primary to-primary-light overflow-hidden border border-white/5 shadow-lg rounded-lg">
                                {/* Card Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={selectedProduct.image || '/src/assets/coffee-placeholder.jpg'}
                                        alt={`Opakowanie kawy ${selectedProduct.name}`}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />

                                    {/* Roast Type Badge */}
                                    <div className={`absolute top-3 left-3 px-3 py-1 text-xs font-bold rounded-full z-20 ${
                                        selectedProduct.roastType === 'Filter'
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-300 text-gray-800'
                                    }`}>
                                        {selectedProduct.roastType === 'Filter' ? 'Przelew' : 'Espresso'}
                                    </div>

                                    {/* Roast Level Badge */}
                                    {selectedProduct.roastLevel && selectedProduct.roastLevel !== 'Nieznany' && (
                                        <div className="absolute top-3 right-3 px-2 py-1 bg-accent/20 border border-accent/30 text-accent text-xs font-medium rounded-full">
                                            {selectedProduct.roastLevel}
                                        </div>
                                    )}
                                </div>

                                {/* Card Content */}
                                <div className="p-4 space-y-3">
                                    {/* Header */}
                                    <div className="flex items-start justify-between gap-2">
                                        <h3 className="text-lg font-semibold text-white leading-tight flex-grow">
                                            {selectedProduct.name}
                                        </h3>
                                        <div className="text-right flex-shrink-0">
                                            <span className="text-lg font-bold text-white">{selectedProduct.variants?.[0]?.price || 'N/A'} zł</span>
                                            <span className="block text-xs text-muted">250g</span>
                                        </div>
                                    </div>

                                    {/* Origin & Weight Selector */}
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted">
                                            {selectedProduct.origin?.map(o => o.country).filter(Boolean).join(', ') || 'Brak danych'}
                                        </span>
                                        <div className="inline-flex bg-white/10 border border-white/20 rounded-full overflow-hidden">
                                            <button className="px-3 py-1 text-xs font-medium bg-accent text-white">250g</button>
                                            <div className="w-px bg-white/20"></div>
                                            <button className="px-3 py-1 text-xs font-medium text-muted hover:text-white hover:bg-white/10">1kg</button>
                                        </div>
                                    </div>

                                    {/* Tasting Notes */}
                                    {selectedProduct.tastingNotes?.length > 0 && (
                                        <div className="space-y-1">
                                            <span className="text-xs font-semibold text-muted uppercase tracking-wider">
                                                Nuty smakowe
                                            </span>
                                            <p className="text-sm text-white leading-relaxed">
                                                {selectedProduct.tastingNotes.join(', ')}
                                            </p>
                                        </div>
                                    )}

                                    {/* Add to Cart Button */}
                                    <button className="w-full py-3 px-4 bg-accent hover:bg-accent/80 text-white font-semibold rounded-lg transition-colors duration-300 flex items-center justify-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m-6 0V9a2 2 0 112 0v4.01" />
                                        </svg>
                                        Dodaj do koszyka
                                    </button>
                                </div>
                            </div>

                            {/* Debug Information */}
                            <div className="bg-primary border border-white/10 rounded p-4">
                                <h4 className="text-white font-semibold mb-3">Debug Information</h4>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    {/* Basic Info */}
                                    <div>
                                        <h5 className="text-accent font-medium mb-2">Basic Info</h5>
                                        <div className="space-y-1">
                                            <div><span className="text-muted">Handle:</span> <span className="text-white">{selectedProduct.shopifyHandle}</span></div>
                                            <div><span className="text-muted">Available:</span> <span className="text-white">{selectedProduct.availableForSale ? 'Yes' : 'No'}</span></div>
                                            <div><span className="text-muted">Roast Type:</span> <span className="text-white">{selectedProduct.roastType}</span></div>
                                            <div><span className="text-muted">Roast Level:</span> <span className="text-white">{selectedProduct.roastLevel}</span></div>
                                        </div>
                                    </div>

                                    {/* Origin Details */}
                                    <div>
                                        <h5 className="text-accent font-medium mb-2">Origin ({selectedProduct.origin?.length || 0})</h5>
                                        {selectedProduct.origin?.length > 0 ? (
                                            <div className="space-y-1">
                                                {selectedProduct.origin.map((origin, idx) => (
                                                    <div key={idx} className="text-xs">
                                                        <div><span className="text-muted">Country:</span> <span className="text-white">{origin.country || 'N/A'}</span></div>
                                                        {origin.region && <div><span className="text-muted">Region:</span> <span className="text-white">{origin.region}</span></div>}
                                                        {origin.processing && <div><span className="text-muted">Processing:</span> <span className="text-white">{origin.processing}</span></div>}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-muted text-xs">No origin data</p>
                                        )}
                                    </div>

                                    {/* Tasting Notes */}
                                    <div>
                                        <h5 className="text-accent font-medium mb-2">Tasting Notes ({selectedProduct.tastingNotes?.length || 0})</h5>
                                        {selectedProduct.tastingNotes?.length > 0 ? (
                                            <p className="text-white text-xs">{selectedProduct.tastingNotes.join(', ')}</p>
                                        ) : (
                                            <p className="text-muted text-xs">No tasting notes</p>
                                        )}
                                    </div>

                                    {/* Tags & Availability */}
                                    <div>
                                        <h5 className="text-accent font-medium mb-2">Tags & Availability</h5>
                                        <div className="space-y-1 text-xs">
                                            <div>
                                                <span className="text-muted">Tags:</span>
                                                {selectedProduct.tags?.length > 0 ? (
                                                    <span className="text-white ml-1">{selectedProduct.tags.join(', ')}</span>
                                                ) : (
                                                    <span className="text-red-400 ml-1">None</span>
                                                )}
                                            </div>
                                            <div><span className="text-muted">Retail Shelf:</span> <span className={selectedProduct.availability?.retailShelf ? 'text-green-400' : 'text-red-400'}>{selectedProduct.availability?.retailShelf ? 'Yes' : 'No'}</span></div>
                                            <div><span className="text-muted">Quick Filter:</span> <span className={selectedProduct.availability?.quickFilter ? 'text-green-400' : 'text-red-400'}>{selectedProduct.availability?.quickFilter ? 'Yes' : 'No'}</span></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Configuration Tips */}
                                <div className="mt-4 p-3 bg-primary-dark rounded border-l-4 border-accent">
                                    <h5 className="text-accent font-medium mb-2">Configuration Tips</h5>
                                    <div className="text-xs space-y-1 text-muted">
                                        <div>• <strong>Roast Type</strong>: Dodaj tag "espresso" lub "filter" do produktu</div>
                                        <div>• <strong>Availability</strong>: Użyj tagów jak "retail-shelf", "quick-filter", "brew-bar"</div>
                                        <div>• <strong>Origin/Tasting Notes</strong>: Używane z variant options (Kraj/Aromat) lub metafields</div>
                                        <div>• <strong>Roast Level</strong>: Z variant option "Palenie kawy" lub metafield</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-primary border border-white/10 rounded p-8 text-center">
                            <p className="text-muted">Kliknij na produkt z lewej strony, aby zobaczyć podgląd karty</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}