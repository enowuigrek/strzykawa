// src/pages/CheckoutSuccess.jsx
import React, { useEffect } from 'react';
import { useCartStore } from '../store/cartStore';
import {PageLayout} from "../components/layout/PageLayout.jsx";
import {Link} from "react-router-dom";

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
        <div className="container mx-auto px-6 py-12 text-center">
            <Link
                to="/"
                className="inline-block mt-6 px-6 py-3 bg-secondary text-accent rounded-full font-medium hover:bg-secondary-light transition-colors"
            >
                Wróć na stronę główną
            </Link>
        </div>
    </PageLayout>
    );
}