import React from 'react';
import { FaMapMarkerAlt, FaShoppingBag } from 'react-icons/fa';
import { UniversalButton } from '../UniversalButton';

export function CallToAction() {
    return (
        <div className="text-center">
            <div className="bg-gradient-to-r from-primary-light/20 to-primary/30 border border-white/10 p-8 md:p-12">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                    Zapraszamy do Strzykawy!
                </h2>
                <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                    Przyjdź na kawę, zostań na rozmowę. Odkryj, dlaczego nasza społeczność
                    rośnie każdego dnia i dlaczego Strzykawa to więcej niż kawiarnia.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <UniversalButton
                        href="/kontakt"
                        icon={FaMapMarkerAlt}
                        variant="primary"
                        size="lg"
                    >
                        Znajdź nas
                    </UniversalButton>

                    <UniversalButton
                        href="/kawy"
                        icon={FaShoppingBag}
                        variant="secondary"
                        size="lg"
                    >
                        Zamów kawę
                    </UniversalButton>
                </div>
            </div>
        </div>
    );
}