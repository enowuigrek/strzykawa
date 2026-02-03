import React from 'react';
import { Section } from '../helpers';

export function TypographySection() {
    return (
        <Section id="typography" title="Typografia">
            <div className="space-y-8">
                <div>
                    <h3 className="text-xl text-accent mb-4">Font: Dosis</h3>
                    <div className="space-y-3 bg-primary-light p-6">
                        <p className="text-5xl">Page Title (5xl)</p>
                        <p className="text-4xl">Section Title (4xl)</p>
                        <p className="text-3xl">Subsection (3xl)</p>
                        <p className="text-2xl">Card Title (2xl)</p>
                        <p className="text-xl">Heading (xl)</p>
                        <p className="text-lg">Large text (lg)</p>
                        <p className="text-base">Body text (base) - Lorem ipsum dolor sit amet</p>
                        <p className="text-sm text-muted">Small text (sm muted) - labels, secondary info</p>
                        <p className="text-xs text-muted/70">Extra small (xs muted/70) - badges, captions</p>
                    </div>
                </div>
                <div>
                    <h3 className="text-xl text-accent mb-4">Font Weights:</h3>
                    <div className="space-y-2 bg-primary-light p-6">
                        <p className="font-normal">400 - Regular (headings, body, prices)</p>
                        <p className="font-medium">500 - Medium (buttons, form labels, emphasis)</p>
                        <p className="font-bold">700 - Bold (ONLY count badges)</p>
                    </div>
                </div>
                <div>
                    <h3 className="text-xl text-accent mb-4">Zasady:</h3>
                    <div className="space-y-2 bg-primary-light p-6 text-sm text-white/80">
                        <p>- font-bold (700) TYLKO na badge'ach count (koszyk, filtry)</p>
                        <p>- font-medium (500) na labelkach formularzy, buttonach, akcentach</p>
                        <p>- font-normal (400) na wszystkim innym: nagłówki, ceny, opisy</p>
                        <p>- NIE używamy font-semibold (600) - zastąpiony przez font-medium</p>
                    </div>
                </div>
            </div>
        </Section>
    );
}
