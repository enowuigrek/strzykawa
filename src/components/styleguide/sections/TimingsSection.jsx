import React from 'react';
import { Section, TimingRow } from '../helpers';
import { ANIMATION_DURATION, FEEDBACK_DURATION, LOADING_DELAY, SCROLL_THRESHOLDS } from '../../../constants/timings';

export function TimingsSection() {
    return (
        <Section id="timings" title="Czasy (constants/timings.js)">
            <div className="space-y-8">
                <div>
                    <h3 className="text-xl text-accent mb-4">Animation Duration:</h3>
                    <div className="space-y-2">
                        <TimingRow name="FAST" value={ANIMATION_DURATION.FAST} usage="Szybkie micro-interakcje" />
                        <TimingRow name="MEDIUM" value={ANIMATION_DURATION.MEDIUM} usage="Srednie animacje" />
                        <TimingRow name="SLOW" value={ANIMATION_DURATION.SLOW} usage="Wolne animacje" />
                    </div>
                </div>
                <div>
                    <h3 className="text-xl text-accent mb-4">Feedback Duration:</h3>
                    <div className="space-y-2">
                        <TimingRow name="SUCCESS" value={FEEDBACK_DURATION.SUCCESS} usage="Komunikat sukcesu" highlight />
                        <TimingRow name="ERROR" value={FEEDBACK_DURATION.ERROR} usage="Komunikat bledu" />
                    </div>
                </div>
                <div>
                    <h3 className="text-xl text-accent mb-4">Loading Delay:</h3>
                    <div className="space-y-2">
                        <TimingRow name="LOGIN" value={LOADING_DELAY.LOGIN} usage="Symulowane logowanie" />
                        <TimingRow name="REGISTER" value={LOADING_DELAY.REGISTER} usage="Symulowana rejestracja" />
                        <TimingRow name="API_CALL" value={LOADING_DELAY.API_CALL} usage="Min. opoznienie API" />
                    </div>
                </div>
                <div>
                    <h3 className="text-xl text-accent mb-4">Scroll Thresholds:</h3>
                    <div className="space-y-2">
                        <TimingRow name="HEADER_BACKGROUND" value={SCROLL_THRESHOLDS.HEADER_BACKGROUND} usage="Zmiana tla headera" unit="px" />
                        <TimingRow name="HEADER_AUTOHIDE" value={SCROLL_THRESHOLDS.HEADER_AUTOHIDE} usage="Chowanie headera" unit="px" />
                        <TimingRow name="STICKY_FILTERS" value={SCROLL_THRESHOLDS.STICKY_FILTERS} usage="Sticky filtry" unit="px" />
                    </div>
                </div>
            </div>
        </Section>
    );
}
