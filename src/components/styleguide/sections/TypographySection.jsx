import React from 'react';
import { Section } from '../helpers';

export function TypographySection() {
    return (
        <Section id="typography" title="Typografia">
            <div className="space-y-8">
                <div>
                    <h3 className="text-xl text-accent mb-4">Font: Dosis</h3>
                    <div className="space-y-3 bg-primary-light p-6">
                        <p className="text-6xl font-bold">Heading 1 (6xl bold)</p>
                        <p className="text-5xl font-bold">Heading 2 (5xl bold)</p>
                        <p className="text-4xl font-semibold">Heading 3 (4xl semibold)</p>
                        <p className="text-3xl font-semibold">Heading 4 (3xl semibold)</p>
                        <p className="text-2xl font-medium">Heading 5 (2xl medium)</p>
                        <p className="text-xl">Heading 6 (xl)</p>
                        <p className="text-base">Body text (base) - Lorem ipsum dolor sit amet</p>
                        <p className="text-sm text-muted">Small text (sm muted)</p>
                        <p className="text-xs text-muted/70">Extra small (xs muted/70)</p>
                    </div>
                </div>
                <div>
                    <h3 className="text-xl text-accent mb-4">Font Weights:</h3>
                    <div className="space-y-2 bg-primary-light p-6">
                        <p className="font-normal">400 - Regular (body text)</p>
                        <p className="font-medium">500 - Medium (buttons, labels)</p>
                        <p className="font-semibold">600 - SemiBold (h3-h6)</p>
                        <p className="font-bold">700 - Bold (h1-h2, badges)</p>
                    </div>
                </div>
            </div>
        </Section>
    );
}
