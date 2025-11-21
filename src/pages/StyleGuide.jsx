import React, { useState } from 'react';
import {
    FaShoppingCart, FaHeart, FaSearch, FaUser, FaCoffee, FaLeaf, FaCheck, FaTimes,
    FaFacebook, FaInstagram, FaArrowLeft, FaHome, FaChevronRight, FaMapMarkerAlt,
    FaShoppingBag, FaEye, FaEyeSlash, FaLock, FaSignInAlt, FaSignOutAlt, FaStar,
    FaPhone, FaEnvelope, FaClock, FaExternalLinkAlt, FaFire, FaRoute, FaUserPlus
} from 'react-icons/fa';
import { FiMinus, FiPlus, FiFilter } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { HiChevronDown, HiExternalLink, HiShoppingBag } from 'react-icons/hi';
import { SiShopify, SiReact } from 'react-icons/si';
import { BiCoffeeTogo } from 'react-icons/bi';

import { Button } from '../components/atoms/Button';
import { QuantitySelector } from '../components/atoms/QuantitySelector';
import { CloseButton } from '../components/atoms/CloseButton';
import { MobileMenuToggle } from '../components/atoms/MobileMenuToggle';
import { Chip } from '../components/atoms/Chip';
import { Spinner } from '../components/atoms/Spinner';
import { COUNTRY_COLORS, DEFAULT_COUNTRY_COLOR, ROAST_TYPE_COLORS } from '../constants/colors';
import { ANIMATION_DURATION, FEEDBACK_DURATION, LOADING_DELAY, SCROLL_THRESHOLDS } from '../constants/timings';

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

                {/* COLORS */}
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

                {/* COUNTRY COLORS */}
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

                {/* TYPOGRAPHY */}
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

                {/* SPACING */}
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

                {/* BUTTONS */}
                <Section id="buttons" title="Przyciski">
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl text-accent mb-4">Variants:</h3>
                            <div className="flex flex-wrap gap-4">
                                <Button variant="primary" leftIcon={FaCoffee}>Primary</Button>
                                <Button variant="secondary" leftIcon={FaHeart}>Secondary</Button>
                                <Button variant="ghost" leftIcon={FaSearch}>Ghost</Button>
                                <Button variant="success" leftIcon={FaCheck}>Success</Button>
                                <Button variant="danger" leftIcon={FaTimes}>Danger</Button>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl text-accent mb-4">Sizes:</h3>
                            <div className="flex flex-wrap items-center gap-4">
                                <Button size="sm">Small (sm)</Button>
                                <Button size="md">Medium (md)</Button>
                                <Button size="lg">Large (lg)</Button>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl text-accent mb-4">States:</h3>
                            <div className="flex flex-wrap gap-4">
                                <Button>Normal</Button>
                                <Button loading>Loading...</Button>
                                <Button disabled>Disabled</Button>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl text-accent mb-4">Full Width:</h3>
                            <Button variant="primary" fullWidth leftIcon={FaShoppingCart}>
                                Dodaj do koszyka
                            </Button>
                        </div>
                        <div>
                            <h3 className="text-xl text-accent mb-4">Success Animation:</h3>
                            <Button
                                variant={showSuccess ? 'success' : 'primary'}
                                onClick={handleSuccessDemo}
                                leftIcon={showSuccess ? FaCheck : FaShoppingCart}
                            >
                                {showSuccess ? 'Dodano!' : 'Kliknij aby dodac'}
                            </Button>
                            <p className="text-muted text-sm mt-2">Animacja trwa {FEEDBACK_DURATION.SUCCESS}ms</p>
                        </div>
                    </div>
                </Section>

                {/* BADGES */}
                <Section id="badges" title="Badges">
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl text-accent mb-4">Count Badges (zawsze bg-success):</h3>
                            <div className="flex flex-wrap items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <span className="text-muted text-sm">Large:</span>
                                    <span className="px-3 py-1 bg-success text-white text-sm font-bold rounded-full">3</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-muted text-sm">Small:</span>
                                    <span className="px-2 py-0.5 bg-success text-white text-xs font-bold rounded-full">3</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-muted text-sm">Na ikonie:</span>
                                    <div className="relative">
                                        <FaShoppingCart className="w-6 h-6" />
                                        <span className="absolute -top-2 -right-2 bg-success text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">3</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl text-accent mb-4">Roast Type Badges (rounded-full):</h3>
                            <div className="flex flex-wrap gap-4">
                                <span className="w-16 h-16 rounded-full flex items-center justify-center text-xs uppercase tracking-wider text-white" style={{ backgroundColor: ROAST_TYPE_COLORS.Espresso }}>Espresso</span>
                                <span className="w-16 h-16 rounded-full flex items-center justify-center text-xs uppercase tracking-wider text-white" style={{ backgroundColor: ROAST_TYPE_COLORS.Filter }}>Przelew</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl text-accent mb-4">Country Badges (sharp corners):</h3>
                            <div className="flex flex-wrap gap-4">
                                {Object.entries(COUNTRY_COLORS).map(([country, color]) => (
                                    <span
                                        key={country}
                                        className="px-4 py-2 text-sm font-semibold"
                                        style={{
                                            backgroundColor: color,
                                            color: ['Kolumbia'].includes(country) ? '#000' : '#fff'
                                        }}
                                    >
                                        {country}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </Section>

                {/* ICONS */}
                <Section id="icons" title="Ikony">
                    <p className="text-muted mb-6">Wszystkie ikony uzywane w projekcie (react-icons)</p>
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-lg text-accent mb-4">Fa (Font Awesome):</h3>
                            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                                <IconCard icon={FaCoffee} name="FaCoffee" />
                                <IconCard icon={FaShoppingCart} name="FaShoppingCart" />
                                <IconCard icon={FaHeart} name="FaHeart" />
                                <IconCard icon={FaSearch} name="FaSearch" />
                                <IconCard icon={FaUser} name="FaUser" />
                                <IconCard icon={FaLeaf} name="FaLeaf" />
                                <IconCard icon={FaCheck} name="FaCheck" />
                                <IconCard icon={FaTimes} name="FaTimes" />
                                <IconCard icon={FaFacebook} name="FaFacebook" />
                                <IconCard icon={FaInstagram} name="FaInstagram" />
                                <IconCard icon={FaArrowLeft} name="FaArrowLeft" />
                                <IconCard icon={FaHome} name="FaHome" />
                                <IconCard icon={FaChevronRight} name="FaChevronRight" />
                                <IconCard icon={FaMapMarkerAlt} name="FaMapMarkerAlt" />
                                <IconCard icon={FaShoppingBag} name="FaShoppingBag" />
                                <IconCard icon={FaEye} name="FaEye" />
                                <IconCard icon={FaEyeSlash} name="FaEyeSlash" />
                                <IconCard icon={FaLock} name="FaLock" />
                                <IconCard icon={FaSignInAlt} name="FaSignInAlt" />
                                <IconCard icon={FaSignOutAlt} name="FaSignOutAlt" />
                                <IconCard icon={FaStar} name="FaStar" />
                                <IconCard icon={FaPhone} name="FaPhone" />
                                <IconCard icon={FaEnvelope} name="FaEnvelope" />
                                <IconCard icon={FaClock} name="FaClock" />
                                <IconCard icon={FaExternalLinkAlt} name="FaExternalLinkAlt" />
                                <IconCard icon={FaFire} name="FaFire" />
                                <IconCard icon={FaRoute} name="FaRoute" />
                                <IconCard icon={FaUserPlus} name="FaUserPlus" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg text-accent mb-4">Fi (Feather):</h3>
                            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                                <IconCard icon={FiMinus} name="FiMinus" />
                                <IconCard icon={FiPlus} name="FiPlus" />
                                <IconCard icon={FiFilter} name="FiFilter" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg text-accent mb-4">Hi (Heroicons):</h3>
                            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                                <IconCard icon={HiChevronDown} name="HiChevronDown" />
                                <IconCard icon={HiExternalLink} name="HiExternalLink" />
                                <IconCard icon={HiShoppingBag} name="HiShoppingBag" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg text-accent mb-4">Inne:</h3>
                            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                                <IconCard icon={IoClose} name="IoClose" />
                                <IconCard icon={SiShopify} name="SiShopify" />
                                <IconCard icon={SiReact} name="SiReact" />
                                <IconCard icon={BiCoffeeTogo} name="BiCoffeeTogo" />
                            </div>
                        </div>
                    </div>
                </Section>

                {/* COMPONENTS */}
                <Section id="components" title="Komponenty">
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl text-accent mb-4">QuantitySelector:</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <span className="text-muted w-24">Small:</span>
                                    <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} size="sm" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-muted w-24">Medium:</span>
                                    <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} size="md" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-muted w-24">Large:</span>
                                    <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} size="lg" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl text-accent mb-4">Chips:</h3>
                            <div className="flex flex-wrap gap-2">
                                {['etiopia', 'kolumbia', 'brazylia'].map(id => (
                                    <Chip
                                        key={id}
                                        label={id.charAt(0).toUpperCase() + id.slice(1)}
                                        count={5}
                                        active={activeChips.includes(id)}
                                        onClick={() => toggleChip(id)}
                                        variant="filter"
                                    />
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl text-accent mb-4">CloseButton:</h3>
                            <div className="flex items-center gap-4">
                                <CloseButton onClick={() => {}} />
                                <span className="text-muted text-sm">Uzywany w modalach</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl text-accent mb-4">MobileMenuToggle:</h3>
                            <div className="flex items-center gap-4">
                                <MobileMenuToggle isOpen={menuOpen} onToggle={() => setMenuOpen(!menuOpen)} />
                                <span className="text-muted text-sm">Kliknij aby przelaczac</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl text-accent mb-4">Spinner:</h3>
                            <div className="flex items-center gap-8">
                                <div className="flex flex-col items-center gap-2">
                                    <Spinner size="sm" />
                                    <span className="text-muted text-sm">Small</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <Spinner size="md" />
                                    <span className="text-muted text-sm">Medium</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <Spinner size="lg" />
                                    <span className="text-muted text-sm">Large</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Z-INDEX */}
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

                {/* ANIMATIONS */}
                <Section id="animations" title="Animacje">
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl text-accent mb-4">Transition Duration:</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <button className="px-6 py-2 bg-accent text-white rounded-full transition-all duration-150 hover:scale-105">
                                        150ms (fast)
                                    </button>
                                    <span className="text-muted text-sm">micro-interactions</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button className="px-6 py-2 bg-accent text-white rounded-full transition-all duration-300 hover:scale-105">
                                        300ms (standard)
                                    </button>
                                    <span className="text-muted text-sm">najczestszy</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button className="px-6 py-2 bg-accent text-white rounded-full transition-all duration-500 hover:scale-105">
                                        500ms (slow)
                                    </button>
                                    <span className="text-muted text-sm">modals, overlays</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl text-accent mb-4">Hover Effects:</h3>
                            <div className="flex flex-wrap gap-4">
                                <div className="p-6 bg-primary-light hover:scale-[1.02] transition-all duration-300 cursor-pointer border border-accent/30">
                                    Card Hover (scale-[1.02])
                                </div>
                                <button className="px-6 py-2 bg-accent text-white rounded-full hover:scale-105 transition-all duration-200">
                                    Button Hover (scale-105)
                                </button>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl text-accent mb-4">Tailwind Animations:</h3>
                            <div className="flex flex-wrap gap-8">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-8 h-8 bg-accent rounded-full animate-spin"></div>
                                    <span className="text-muted text-sm">animate-spin</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-8 h-8 bg-accent rounded-full animate-pulse"></div>
                                    <span className="text-muted text-sm">animate-pulse</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-8 h-8 bg-accent rounded-full animate-bounce"></div>
                                    <span className="text-muted text-sm">animate-bounce</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* TIMINGS */}
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

                {/* RULES */}
                <Section id="rules" title="Zasady Projektowe">
                    <div className="space-y-6">
                        <Rule title="Sharp Corners dla kart i modali" good>
                            <p className="text-muted mb-4">Karty, modale, inputy - BEZ zaokraglen</p>
                            <div className="w-full h-24 bg-primary-light border border-accent/30"></div>
                        </Rule>
                        <Rule title="Rounded-full dla buttonow i badges" good>
                            <p className="text-muted mb-4">Wszystkie przyciski i count badges</p>
                            <div className="flex gap-4">
                                <button className="px-6 py-2 bg-accent text-white rounded-full">Button</button>
                                <span className="px-3 py-1 bg-success text-white rounded-full font-bold">3</span>
                            </div>
                        </Rule>
                        <Rule title="Count badges = bg-success" good>
                            <p className="text-muted mb-4">Liczniki zawsze zielone</p>
                            <div className="relative inline-block">
                                <FaShoppingCart className="w-8 h-8" />
                                <span className="absolute -top-2 -right-2 bg-success text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">3</span>
                            </div>
                        </Rule>
                        <Rule title="Modals na z-[100]" good>
                            <p className="text-muted mb-4">Modale zawsze najwyzej</p>
                            <span className="px-3 py-1 bg-primary-light border border-accent/30 text-sm font-mono">z-[100]</span>
                        </Rule>
                        <Rule title="Brak emotikon na stronie" good>
                            <p className="text-muted mb-4">Strona ma profesjonalny charakter</p>
                        </Rule>
                        <Rule title="Divider nie dotyka krawedzi" good>
                            <p className="text-muted mb-4">W modalach linie sa wciete (px-4/px-6)</p>
                            <div className="bg-primary-light p-4 border border-accent/30">
                                <div className="font-semibold mb-2">Header</div>
                                <div className="px-4">
                                    <div className="border-b border-white/10"></div>
                                </div>
                                <div className="mt-2 text-muted text-sm">Content...</div>
                            </div>
                        </Rule>
                    </div>
                </Section>

            </main>
        </div>
    );
}

// HELPER COMPONENTS

function Section({ id, title, children }) {
    return (
        <section id={id} className="scroll-mt-8">
            <h2 className="text-3xl font-bold border-b border-accent/30 pb-4 mb-6">{title}</h2>
            {children}
        </section>
    );
}

function ColorCard({ name, hex, usage, highlight }) {
    return (
        <div className="space-y-2">
            <div
                className={`w-full h-20 border-2 ${highlight ? 'border-success' : 'border-white/10'}`}
                style={{ backgroundColor: hex }}
            ></div>
            <p className="font-mono text-sm text-accent">{name}</p>
            <p className="font-mono text-xs text-muted">{hex}</p>
            <p className="text-xs text-white/70">{usage}</p>
        </div>
    );
}

function SpacingRow({ size, px, usage, highlight }) {
    return (
        <div className={`flex items-center gap-4 p-3 ${highlight ? 'bg-accent/10 border border-accent/30' : 'bg-primary-light'}`}>
            <div className="w-12 font-mono text-accent">p-{size}</div>
            <div className="w-16 text-muted">{px}</div>
            <div className="flex-1 text-white/70 text-sm">{usage}</div>
            <div className="h-6 bg-accent" style={{ width: `${parseInt(px)}px` }}></div>
        </div>
    );
}

function IconCard({ icon: Icon, name }) {
    return (
        <div className="flex flex-col items-center gap-2 p-3 bg-primary-light border border-accent/30 hover:border-accent transition-colors">
            <Icon className="w-6 h-6 text-accent" />
            <p className="text-xs text-muted text-center truncate w-full">{name}</p>
        </div>
    );
}

function ZIndexCard({ level, usage, highlight }) {
    return (
        <div className={`flex items-center justify-between p-4 border ${highlight ? 'border-success/50 bg-success/10' : 'border-accent/30 bg-primary-light'}`}>
            <span className="font-mono text-accent">{level}</span>
            <span className="text-sm text-white/70">{usage}</span>
        </div>
    );
}

function TimingRow({ name, value, usage, unit = 'ms', highlight }) {
    return (
        <div className={`flex items-center justify-between p-3 ${highlight ? 'bg-success/10 border border-success/30' : 'bg-primary-light border border-accent/30'}`}>
            <span className="font-mono text-accent">{name}</span>
            <span className="font-mono text-white">{value}{unit}</span>
            <span className="text-sm text-muted">{usage}</span>
        </div>
    );
}

function Rule({ title, good, children }) {
    return (
        <div className={`p-6 border-2 ${good ? 'border-success/30' : 'border-danger/30'}`}>
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                {good ? <FaCheck className="text-success" /> : <FaTimes className="text-danger" />}
                {title}
            </h4>
            {children}
        </div>
    );
}
