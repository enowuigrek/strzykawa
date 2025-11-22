import React from 'react';
import { Section, ZIndexCard } from '../helpers';

export function ZIndexSection() {
    return (
        <Section id="z-index" title="Z-Index Hierarchy">
            <p className="text-muted mb-6">Hierarchia warstw w aplikacji</p>
            <div className="space-y-2">
                <ZIndexCard level="z-0" usage="Base layer" />
                <ZIndexCard level="z-10" usage="Elevated cards" />
                <ZIndexCard level="z-20" usage="Coffee overlay, dropdowns" />
                <ZIndexCard level="z-30" usage="Sticky filters" />
                <ZIndexCard level="z-40" usage="Fixed header" />
                <ZIndexCard level="z-50" usage="Mobile navigation" />
                <ZIndexCard level="z-[60]" usage="Modal backdrop" highlight />
                <ZIndexCard level="z-[100]" usage="Modals (highest!)" highlight />
            </div>
        </Section>
    );
}
