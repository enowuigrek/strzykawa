// src/pages/CheckoutCanceled.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaShoppingCart, FaQuestionCircle } from 'react-icons/fa';
import { useCartStore } from '../store/cartStore';
import { PageLayout } from "../components/layout/PageLayout.jsx";
import { Button } from '../components/atoms/Button';

export function CheckoutCanceled() {
    const markCheckoutCanceled = useCartStore(s => s.markCheckoutCanceled);

    useEffect(() => {
        // Oznacz checkout jako anulowany (ZACHOWUJE koszyk)
        markCheckoutCanceled();
    }, [markCheckoutCanceled]);

    // Funkcja do otwarcia koszyka
    const handleOpenCart = () => {
        window.dispatchEvent(new CustomEvent('openCart'));
    };

    return (
        <PageLayout
            title="Płatność nie została ukończona"
            description="Nie martw się - Twoje produkty są bezpieczne w koszyku"
        >
            <div className="container mx-auto max-w-2xl px-4 py-12">
                {/* Warning Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-yellow-500/20 border-2 border-yellow-500/40 flex items-center justify-center">
                        <FaExclamationTriangle className="w-10 h-10 text-yellow-500" />
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
                    Płatność nie została zakończona
                </h1>

                <p className="text-muted text-center text-lg mb-8">
                    Nie martw się - Twoje produkty pozostały w koszyku i możesz spróbować ponownie.
                </p>

                {/* Info boxes */}
                <div className="space-y-4 mb-8">
                    {/* Cart preserved */}
                    <div className="bg-primary-light border border-white/10 rounded-lg p-4 flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                            <FaShoppingCart className="w-5 h-5 text-accent" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-white font-semibold mb-1">
                                Koszyk zachowany
                            </h3>
                            <p className="text-muted text-sm">
                                Wszystkie produkty pozostały w Twoim koszyku. Możesz dokończyć zakupy w dowolnym momencie.
                            </p>
                        </div>
                    </div>

                    {/* Possible reasons */}
                    <div className="bg-primary-light border border-white/10 rounded-lg p-4 flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                            <FaQuestionCircle className="w-5 h-5 text-accent" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-white font-semibold mb-2">
                                Możliwe przyczyny:
                            </h3>
                            <ul className="text-muted text-sm space-y-1 list-disc list-inside">
                                <li>Anulowanie płatności przez użytkownika</li>
                                <li>Problem z połączeniem internetowym</li>
                                <li>Niewystarczające środki na koncie</li>
                                <li>Błąd podczas przetwarzania płatności</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <button
                        onClick={handleOpenCart}
                        className="flex-1"
                    >
                        <Button
                            variant="primary"
                            size="lg"
                            fullWidth
                            leftIcon={FaShoppingCart}
                        >
                            Wróć do koszyka
                        </Button>
                    </button>
                    <Link to="/coffees" className="flex-1">
                        <Button
                            variant="secondary"
                            size="lg"
                            fullWidth
                        >
                            Kontynuuj zakupy
                        </Button>
                    </Link>
                </div>

                {/* Additional info */}
                <div className="mt-8 text-center">
                    <p className="text-muted text-sm">
                        Potrzebujesz pomocy? <Link to="/contact" className="text-accent hover:text-accent/80 underline">Skontaktuj się z nami</Link>
                    </p>
                </div>
            </div>
        </PageLayout>
    );
}