import React, { useState, useEffect } from 'react';
import { shopify } from '../services/shopify.js';
import { useCartStore } from '../store/cartStore.js';

export default function ShopifyTest() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const {
        items,
        isLoading: cartLoading,
        error: cartError,
        addItem,
        initializeCart,
        getTotalItems,
        getTotalPrice,
        clearError
    } = useCartStore();

    useEffect(() => {
        loadProducts();
        initializeCart();
    }, []);

    const loadProducts = async () => {
        try {
            setLoading(true);
            console.log('🔍 Starting to fetch products...');
            const fetchedProducts = await shopify.fetchProducts(5);
            console.log('✅ Raw Shopify response:', fetchedProducts);
            setProducts(fetchedProducts);
        } catch (err) {
            console.error('❌ Detailed error:', err);
            console.error('❌ Error stack:', err.stack);
            setError('Błąd ładowania produktów: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const testAddToCart = async (product) => {
        if (product.variants.length === 0) {
            alert('Produkt nie ma dostępnych wariantów');
            return;
        }

        try {
            await addItem(product, product.variants[0].id, 1);
            alert(`Dodano ${product.name} do koszyka!`);
        } catch (err) {
            console.error('Error adding to cart:', err);
        }
    };

    if (loading) {
        return (
            <div className="p-8 bg-primary-light rounded-lg max-w-4xl mx-auto mt-8">
                <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-4 border-accent border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-white">Ładowanie produktów z Shopify...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 bg-primary-light rounded-lg max-w-6xl mx-auto mt-8">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">🧪 Test integracji Shopify</h2>

                {/* Status połączenia */}
                <div className="mb-6">
                    <div className={`p-4 rounded-lg border ${error ? 'bg-red-500/20 border-red-500/30' : 'bg-green-500/20 border-green-500/30'}`}>
                        <h3 className="font-semibold mb-2 text-white">
                            Status połączenia:
                        </h3>
                        {error ? (
                            <div>
                                <p className="text-red-300">❌ Błąd połączenia</p>
                                <p className="text-sm text-red-200 mt-1">{error}</p>
                                <p className="text-xs text-red-200 mt-2">
                                    💡 Sprawdź czy masz poprawnie skonfigurowane zmienne środowiskowe w pliku .env
                                </p>
                            </div>
                        ) : (
                            <div>
                                <p className="text-green-300">✅ Połączenie działa</p>
                                <p className="text-sm text-green-200">
                                    Załadowano {products.length} produktów
                                    {products.length === 0 && ' (używam danych testowych)'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Status koszyka */}
                <div className="mb-6">
                    <div className="p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                        <h3 className="font-semibold mb-2 text-white">Status koszyka:</h3>
                        <p className="text-blue-200">
                            📦 Produktów w koszyku: <span className="font-bold">{getTotalItems()}</span>
                        </p>
                        <p className="text-blue-200">
                            💰 Wartość: <span className="font-bold">{getTotalPrice().toFixed(2)} PLN</span>
                        </p>
                        {cartError && (
                            <div className="mt-2">
                                <p className="text-red-300">❌ {cartError}</p>
                                <button
                                    onClick={clearError}
                                    className="text-sm text-red-200 underline hover:no-underline mt-1"
                                >
                                    Wyczyść błąd
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Lista produktów */}
            <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                    Dostępne produkty:
                </h3>

                {products.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-muted mb-4">
                            {error ? 'Nie udało się załadować produktów z Shopify' : 'Brak produktów w sklepie'}
                        </p>
                        <button
                            onClick={loadProducts}
                            className="px-4 py-2 bg-accent text-white rounded hover:bg-accent/80 transition-colors"
                        >
                            Spróbuj ponownie
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map(product => (
                            <div key={product.id} className="bg-primary border border-white/10 rounded-lg p-4">
                                {/* Zdjęcie produktu */}
                                {product.image && (
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-40 object-cover rounded mb-4"
                                    />
                                )}

                                {/* Informacje o produkcie */}
                                <h4 className="font-semibold text-white mb-2">{product.name}</h4>

                                {product.description && (
                                    <p className="text-sm text-muted mb-2 line-clamp-2">
                                        {product.description}
                                    </p>
                                )}

                                {product.roastLevel && (
                                    <p className="text-xs text-muted mb-1">
                                        Poziom wypału: {product.roastLevel}
                                    </p>
                                )}

                                {product.tastingNotes && product.tastingNotes.length > 0 && (
                                    <p className="text-xs text-muted mb-3">
                                        Nuty: {product.tastingNotes.join(', ')}
                                    </p>
                                )}

                                {/* Cena i warianty */}
                                {product.variants && product.variants.length > 0 && (
                                    <div className="mb-3">
                                        <p className="text-sm font-semibold text-white">
                                            {product.variants[0].price.toFixed(2)} {product.variants[0].currencyCode || 'PLN'}
                                        </p>
                                        <p className="text-xs text-muted">
                                            Wariantów: {product.variants.length}
                                        </p>
                                    </div>
                                )}

                                {/* Przycisk dodania do koszyka */}
                                <button
                                    onClick={() => testAddToCart(product)}
                                    disabled={cartLoading || !product.availableForSale}
                                    className="w-full py-2 px-4 bg-accent hover:bg-accent/80 disabled:bg-gray-500 disabled:cursor-not-allowed text-white rounded transition-colors duration-200"
                                >
                                    {cartLoading ? 'Dodawanie...' : 'Dodaj do koszyka'}
                                </button>

                                {/* Debug info */}
                                <details className="mt-3">
                                    <summary className="text-xs text-muted cursor-pointer hover:text-white">
                                        Debug info
                                    </summary>
                                    <pre className="text-xs text-muted mt-2 bg-primary-dark p-2 rounded overflow-auto">
                                        {JSON.stringify(product, null, 2)}
                                    </pre>
                                </details>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Koszyk */}
            {items.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-white mb-4">
                        Zawartość koszyka:
                    </h3>
                    <div className="bg-primary border border-white/10 rounded-lg p-4">
                        {items.map(item => (
                            <div key={item.lineItemId} className="flex items-center justify-between py-2 border-b border-white/10 last:border-b-0">
                                <div>
                                    <p className="text-white font-medium">{item.product.name}</p>
                                    <p className="text-sm text-muted">
                                        {item.quantity} x {item.product.price.toFixed(2)} {item.product.currencyCode || 'PLN'}
                                    </p>
                                </div>
                                <div className="text-white font-semibold">
                                    {(item.product.price * item.quantity).toFixed(2)} PLN
                                </div>
                            </div>
                        ))}
                        <div className="mt-4 pt-4 border-t border-white/10">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold text-white">Suma:</span>
                                <span className="text-lg font-bold text-white">
                                    {getTotalPrice().toFixed(2)} PLN
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}