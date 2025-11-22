import React from 'react';
import { Section, ColorCard } from '../helpers';
import { COUNTRY_COLORS, DEFAULT_COUNTRY_COLOR, ROAST_TYPE_COLORS } from '../../../constants/colors';

export function ColorsSection() {
    return (
        <Section id="colors" title="Paleta Kolorow">
            <p className="text-muted mb-6">Glowne kolory zdefiniowane w tailwind.config.js</p>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <ColorCard name="primary" hex="#1E2A25" usage="Tlo strony" />
                <ColorCard name="primary-light" hex="#2C3A35" usage="Hover, karty" />
                <ColorCard name="primary-dark" hex="#141C18" usage="Footer, header" />
                <ColorCard name="accent" hex="#6B7F73" usage="Linki, secondary" />
                <ColorCard name="muted" hex="#9CA8A1" usage="Tekst pomocniczy" />
                <ColorCard name="success" hex="#0E8C6F" usage="Success, licznik koszyka" highlight />
                <ColorCard name="success-dark" hex="#0B6F55" usage="Success hover" />
                <ColorCard name="danger" hex="#C9423A" usage="Bledy, akcje destrukcyjne" />
                <ColorCard name="danger-dark" hex="#A7322D" usage="Danger hover" />
                <ColorCard name="badge-blue" hex="#7A8FA6" usage="Badge FILTER/PRZELEW" />
                <ColorCard name="badge-orange" hex="#C48F62" usage="Badge ESPRESSO" />
                <ColorCard name="cta" hex="#3A5F55" usage="Przycisk platnosci" />
                <ColorCard name="cta-hover" hex="#2F4F46" usage="CTA hover" />
            </div>
        </Section>
    );
}

export function CountryColorsSection() {
    return (
        <Section id="country-colors" title="Kolory Krajow">
            <p className="text-muted mb-6">Kolory pochodzenia kawy - uzywane w overlay i akcentach</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Object.entries(COUNTRY_COLORS).map(([country, color]) => (
                    <ColorCard key={country} name={country} hex={color} usage="Kraj pochodzenia" />
                ))}
                <ColorCard name="Default" hex={DEFAULT_COUNTRY_COLOR} usage="Nieznany kraj" />
            </div>
            <div className="mt-8">
                <h3 className="text-xl text-accent mb-4">Roast Type Colors:</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries(ROAST_TYPE_COLORS).map(([type, color]) => (
                        <ColorCard key={type} name={type} hex={color} usage="Typ parzenia" />
                    ))}
                </div>
            </div>
        </Section>
    );
}
