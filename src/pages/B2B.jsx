import React from 'react';
import { PageHeader } from '../components/PageHeader';
import {UniversalButton} from "../components/UniversalButton.jsx";
import {PageLayout} from "../components/PageLayout.jsx";

function B2B() {
    return (
        <PageLayout
            title="Współpraca B2B"
            description="Pracujemy nad szczegółami oferty współpracy dla firm, restauracji i innych partnerów biznesowych."
        >

            <div className="text-center max-w-4xl mx-auto">
                <div className="text-center">
                    <p className="text-white/70 mb-4">
                        Masz pytania dotyczące współpracy?
                    </p>
                    <UniversalButton
                        href="/kontakt"
                        variant="primary"
                        size="lg"
                    >
                        Skontaktuj się z nami
                    </UniversalButton>
                </div>
            </div>
        </PageLayout>
    );
}

export default B2B;