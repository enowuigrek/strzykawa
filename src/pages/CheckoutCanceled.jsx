// src/pages/CheckoutCanceled.jsx
import React, { useEffect } from 'react';
import { useCartStore } from '../store/cartStore';
import {PageLayout} from "../components/layout/PageLayout.jsx";

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
        </PageLayout>
    );
}