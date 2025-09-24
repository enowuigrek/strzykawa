import React from 'react';
import { PageHeader } from '../components/PageHeader';

function B2B() {
    return (
        <div className="min-h-screen bg-primary text-white pt-20">
            <div className="container mx-auto px-6 py-16">
                <PageHeader
                    title="Współpraca B2B"
                    description="Pracujemy nad szczegółami oferty współpracy dla firm, restauracji i innych partnerów biznesowych."
                />

                <div className="text-center max-w-4xl mx-auto">
                    <div className="text-center">
                        <p className="text-white/70 mb-4">
                            Masz pytania dotyczące współpracy?
                        </p>
                        <a
                            href="/kontakt"
                            className="inline-block bg-accent hover:bg-accent/80 text-white px-8 py-3 rounded-full transition-colors"
                        >
                            Skontaktuj się z nami
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default B2B;