import React from 'react';
import { CafeLocation } from '../components/features/contact/CafeLocation';
import { RoasteryLocation } from '../components/features/contact/RoasteryLocation';
import { CompanyData } from '../components/features/contact/CompanyData';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { PageLayout } from '../components/layout/PageLayout.jsx';
import { SEO } from '../components/SEO.jsx';
import { useScrollAnimation, scrollAnimations } from '../hooks/useScrollAnimation';

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
                description="Kawiarnia Strzykawa — ul. Dąbrowskiego 4, Częstochowa. Palarnia w Rędzinach. Skontaktuj się z nami: kontakt@strzykawa.com, tel. +48 668 011 806."
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
