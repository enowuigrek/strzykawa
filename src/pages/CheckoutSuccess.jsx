// src/pages/CheckoutSuccess.jsx
import { useEffect } from 'react';
import { useCartStore } from '../store/cartStore';

export function CheckoutSuccess() {
    const markCheckoutCompleted = useCartStore(s => s.markCheckoutCompleted);

    useEffect(() => {
        markCheckoutCompleted();
    }, [markCheckoutCompleted]);

    return (
        <div className="container mx-auto px-4 py-16 text-center text-white">
            <h1 className="text-3xl font-bold mb-4">Dziękujemy za zamówienie!</h1>
            <p className="text-lg">Potwierdzenie płatności zostało wysłane na Twój e-mail.</p>
        </div>
    );
}