// src/pages/CheckoutSuccess.jsx
import React, { useEffect } from 'react';
import { useCartStore } from '../store/cartStore';
import {Button} from "../components/atoms/Button.jsx";
import {PageLayout} from "../components/layout/PageLayout.jsx";

export function CheckoutSuccess() {
    const markCheckoutCompleted = useCartStore(s => s.markCheckoutCompleted);

    useEffect(() => {
        markCheckoutCompleted();
    }, [markCheckoutCompleted]);

    return (
    <PageLayout
        title="Dziękujemy za zamówienie!"
        description="Potwierdzenie płatności zostało wysłane na Twój e-mail.."
    >
    </PageLayout>
    );
}