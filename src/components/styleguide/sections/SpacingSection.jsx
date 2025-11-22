import React from 'react';
import { Section, SpacingRow } from '../helpers';

export function SpacingSection() {
    return (
        <Section id="spacing" title="Odstepy">
            <p className="text-muted mb-6">Standardowa skala Tailwind - najczesciej uzywane wartosci</p>
            <div className="space-y-4">
                <SpacingRow size="2" px="8px" usage="gap-2, p-2" />
                <SpacingRow size="3" px="12px" usage="gap-3, p-3" />
                <SpacingRow size="4" px="16px" usage="gap-4, p-4 - standard" highlight />
                <SpacingRow size="6" px="24px" usage="gap-6, p-6 - cards, modals" highlight />
                <SpacingRow size="8" px="32px" usage="gap-8, p-8 - sections" />
                <SpacingRow size="12" px="48px" usage="gap-12, py-12 - large sections" />
                <SpacingRow size="16" px="64px" usage="py-16 - hero sections" />
            </div>
        </Section>
    );
}
