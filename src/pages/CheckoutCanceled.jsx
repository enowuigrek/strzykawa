// src/pages/CheckoutCanceled.jsx
import { useEffect } from 'react';
import { useCartStore } from '../store/cartStore';

export function CheckoutCanceled() {
    const markCheckoutCanceled = useCartStore(s => s.markCheckoutCanceled);

    useEffect(() => {
        markCheckoutCanceled();
    }, [markCheckoutCanceled]);

    return (
        <div className="container mx-auto px-4 py-16 text-center text-white">
            <h1 className="text-3xl font-bold mb-4">Płatność nie została ukończona</h1>
            <p className="text-lg">Produkty nadal są w koszyku, możesz spróbować ponownie.</p>
        </div>
    );
}