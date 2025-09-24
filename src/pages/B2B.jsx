import React from 'react';
import { PageHeader } from '../components/PageHeader';
import {FaMapMarkerAlt} from "react-icons/fa";
import {UniversalButton} from "../components/UniversalButton.jsx";

function B2B() {
    return (
        <div className="min-h-screen bg-primary pt-20">
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
                        <UniversalButton
                            href="/kontakt"
                            variant="primary"
                            size="lg"
                        >
                            Skontaktuj się z nami
                        </UniversalButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default B2B;