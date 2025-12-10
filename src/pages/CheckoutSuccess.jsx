// src/pages/CheckoutSuccess.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FaCheckCircle, FaEnvelope, FaTruck } from 'react-icons/fa';
import { useCartStore } from '../store/cartStore';
import { PageLayout } from "../components/layout/PageLayout.jsx";
import { Button } from '../components/atoms/Button';

export function CheckoutSuccess() {
    const markCheckoutCompleted = useCartStore(s => s.markCheckoutCompleted);
    const [searchParams] = useSearchParams();
    const [orderId, setOrderId] = useState(null);

    useEffect(() => {
        // Pobierz order ID z URL params (jeśli Shopify przekazuje)
        const orderIdParam = searchParams.get('order_id') || searchParams.get('orderId');
        if (orderIdParam) {
            setOrderId(orderIdParam);
        }

        // Oznacz checkout jako zakończony (czyści koszyk)
        markCheckoutCompleted();
    }, [markCheckoutCompleted, searchParams]);

    return (
        <PageLayout
            title="Zamówienie złożone pomyślnie!"
            description="w Strzykawa Coffee Roastery"
        >
            <div className="container mx-auto max-w-2xl px-4 py-12">
                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-success flex items-center justify-center">
                        <FaCheckCircle className="w-10 h-10 text-white" />
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
                    Dziękujemy za zamówienie!
                </h1>

                {/* Order ID */}
                {orderId && (
                    <div className="bg-primary-light border border-accent/20 p-4 mb-6">
                        <p className="text-muted text-sm text-center mb-1">
                            Numer zamówienia:
                        </p>
                        <p className="text-white text-xl font-semibold text-center">
                            #{orderId}
                        </p>
                    </div>
                )}

                {/* Info boxes */}
                <div className="space-y-4 mb-8">
                    {/* Email confirmation */}
                    <div className="bg-primary-light border border-white/10 p-4 flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                            <FaEnvelope className="w-5 h-5 text-accent" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-white font-semibold mb-1">
                                Potwierdzenie wysłane
                            </h3>
                            <p className="text-muted text-sm">
                                Potwierdzenie zamówienia zostało wysłane na Twój adres e-mail. Sprawdź skrzynkę odbiorczą (i folder spam).
                            </p>
                        </div>
                    </div>

                    {/* Shipping info */}
                    <div className="bg-primary-light border border-white/10 p-4 flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                            <FaTruck className="w-5 h-5 text-accent" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-white font-semibold mb-1">
                                Wysyłka zamówienia
                            </h3>
                            <p className="text-muted text-sm">
                                Twoje zamówienie zostanie wysłane w ciągu 1-2 dni roboczych. Numer przesyłki otrzymasz w osobnej wiadomości e-mail.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA Button */}
                <div className="mb-6">
                    <Link to="/coffees">
                        <Button
                            variant="primary"
                            size="lg"
                            fullWidth
                        >
                            Wróć do sklepu
                        </Button>
                    </Link>
                </div>

                {/* Additional info */}
                <div className="mt-8 text-center">
                    <p className="text-muted text-sm">
                        Masz pytania? <a href="mailto:kontakt@strzykawa.pl" className="text-accent hover:text-accent/80 underline">Skontaktuj się z nami</a>
                    </p>
                </div>
            </div>
        </PageLayout>
    );
}