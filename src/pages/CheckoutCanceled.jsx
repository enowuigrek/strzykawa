// src/pages/CheckoutCanceled.jsx
import React, { useEffect } from 'react';
import { useCartStore } from '../store/cartStore';
import {PageLayout} from "../components/layout/PageLayout.jsx";
import {Link} from "react-router-dom";

export function CheckoutCanceled() {
    const markCheckoutCanceled = useCartStore(s => s.markCheckoutCanceled);

    useEffect(() => {
        markCheckoutCanceled();
    }, [markCheckoutCanceled]);

    return (
        <PageLayout
            title="Płatność nie została ukończona"
            description="Produkty nadal są w koszyku, możesz spróbować ponownie."
        >
            <div className="container mx-auto px-6 py-12 text-center">
                <Link
                    to="/"
                    className="inline-block mt-6 px-6 py-3 bg-secondary text-accent rounded-lg font-medium hover:bg-secondary-light transition-colors"
                >
                    Wróć na stronę główną
                </Link>
            </div>
        </PageLayout>
    );
}