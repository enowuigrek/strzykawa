import React from 'react';
import { ContactInfo } from '../components/contact/ContactInfo';
import { ContactMap } from '../components/contact/ContactMap';
import { PageHeader } from '../components/PageHeader';
import { useScrollToTop } from '../hooks/useScrollToTop';

function ContactSection() {
    useScrollToTop();

    return (
        <div className="min-h-screen bg-primary pt-20">
            <div className="container mx-auto px-6 py-16">

                {/* Section Header */}
                <PageHeader
                    title="Kontakt & Lokalizacja"
                    description="Znajdź nas w sercu miasta. Zapraszamy na kawę i rozmowę o najlepszych ziarnach z całego świata. Odwiedź także naszą palarnię i zobacz jak powstają nasze kawy specialty."
                />

                {/* Main Content - pojedyncza kolumna na mobile, dwie na desktop */}
                <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-5 lg:gap-8">

                    {/* Contact Information - zajmuje 3/5 na desktop */}
                    <div className="lg:col-span-3">
                        <ContactInfo />
                    </div>

                    {/* Map - zajmuje 2/5 na desktop */}
                    <div className="lg:col-span-2">
                        <ContactMap />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ContactSection;