import React from 'react';
import { CafeLocation } from '../components/features/contact/CafeLocation';
import { RoasteryLocation } from '../components/features/contact/RoasteryLocation';
import { CompanyData } from '../components/features/contact/CompanyData';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { PageLayout } from '../components/layout/PageLayout.jsx';
import { SEO } from '../components/SEO.jsx';
import { useScrollAnimation, scrollAnimations } from '../hooks/useScrollAnimation';
import { CAFE_STREET, CAFE_CITY, CONTACT_EMAIL, CONTACT_PHONE } from '../constants/contact';

export function Contact() {
    useScrollToTop();

    const [topRef, topVisible] = useScrollAnimation({ threshold: 0.15 });

    return (
        <PageLayout
            title="Kontakt & Lokalizacja"
            description=""
        >
            <SEO
                title="Kontakt i lokalizacja"
                description={`Kawiarnia Strzykawa — ${CAFE_STREET}, ${CAFE_CITY}. Palarnia w Rędzinach. Skontaktuj się z nami: ${CONTACT_EMAIL}, tel. ${CONTACT_PHONE}.`}
                canonical="https://strzykawa.com/kontakt"
            />
            <div className="container px-6 sm:px-8 lg:px-12 py-8">

                {/* Górny rząd: Dane firmy | Kawiarnia | Palarnia */}
                <div
                    ref={topRef}
                    className={`grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 py-8 lg:py-10 transition-all duration-700 ease-out ${
                        topVisible ? scrollAnimations.pourDown.visible : scrollAnimations.pourDown.hidden
                    }`}
                >
                    <CompanyData />
                    <CafeLocation />
                    <RoasteryLocation />
                </div>

            </div>
        </PageLayout>
    );
}
