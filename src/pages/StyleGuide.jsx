import React, { useState } from 'react';
import { FEEDBACK_DURATION } from '../constants/timings';

// Section components
import {
    ColorsSection,
    CountryColorsSection,
    TypographySection,
    SpacingSection,
    ButtonsSection,
    BadgesSection,
    IconsSection,
    ComponentsSection,
    ZIndexSection,
    AnimationsSection,
    TimingsSection,
    RulesSection
} from '../components/styleguide/sections';

/**
 * STRZYKAWA - STYLE GUIDE
 * Tajny przewodnik po design systemie
 * Dostepny pod: /style-guide
 */

const SECTIONS = [
    { id: 'colors', label: 'Kolory' },
    { id: 'country-colors', label: 'Kolory krajow' },
    { id: 'typography', label: 'Typografia' },
    { id: 'spacing', label: 'Odstepy' },
    { id: 'buttons', label: 'Przyciski' },
    { id: 'badges', label: 'Badges' },
    { id: 'icons', label: 'Ikony' },
    { id: 'components', label: 'Komponenty' },
    { id: 'z-index', label: 'Z-Index' },
    { id: 'animations', label: 'Animacje' },
    { id: 'timings', label: 'Czasy' },
    { id: 'rules', label: 'Zasady' },
];

export default function StyleGuide() {
    const [activeSection, setActiveSection] = useState('colors');
    const [quantity, setQuantity] = useState(1);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeChips, setActiveChips] = useState(['etiopia']);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSuccessDemo = () => {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), FEEDBACK_DURATION.SUCCESS);
    };

    const toggleChip = (id) => {
        setActiveChips(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        );
    };

    const scrollToSection = (id) => {
        setActiveSection(id);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="min-h-screen bg-primary-dark text-white flex">
            {/* SIDEBAR NAVIGATION */}
            <aside className="w-64 bg-primary border-r border-accent/20 fixed h-full overflow-y-auto">
                <div className="p-6 border-b border-accent/20">
                    <h1 className="text-2xl font-bold">Style Guide</h1>
                    <p className="text-muted text-sm mt-1">Strzykawa Design System</p>
                </div>
                <nav className="p-4">
                    {SECTIONS.map(section => (
                        <button
                            key={section.id}
                            onClick={() => scrollToSection(section.id)}
                            className={`w-full text-left px-4 py-2 mb-1 transition-all rounded ${
                                activeSection === section.id
                                    ? 'bg-accent text-white'
                                    : 'text-muted hover:bg-primary-light hover:text-white'
                            }`}
                        >
                            {section.label}
                        </button>
                    ))}
                </nav>
                <div className="p-4 border-t border-accent/20 mt-auto">
                    <p className="text-xs text-muted">v1.2 | 21.11.2025</p>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 ml-64 p-8 space-y-16">
                <ColorsSection />
                <CountryColorsSection />
                <TypographySection />
                <SpacingSection />
                <ButtonsSection showSuccess={showSuccess} onSuccessDemo={handleSuccessDemo} />
                <BadgesSection />
                <IconsSection />
                <ComponentsSection
                    quantity={quantity}
                    setQuantity={setQuantity}
                    menuOpen={menuOpen}
                    setMenuOpen={setMenuOpen}
                    activeChips={activeChips}
                    toggleChip={toggleChip}
                />
                <ZIndexSection />
                <AnimationsSection />
                <TimingsSection />
                <RulesSection />
            </main>
        </div>
    );
}
