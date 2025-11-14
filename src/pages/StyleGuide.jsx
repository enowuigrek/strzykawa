import React, { useState } from 'react';
import {
    FaShoppingCart,
    FaHeart,
    FaSearch,
    FaUser,
    FaCoffee,
    FaLeaf,
    FaCheck,
    FaTimes
} from 'react-icons/fa';
import { Button } from '../components/atoms/Button';
import { QuantitySelector } from '../components/atoms/QuantitySelector';
import { CloseButton } from '../components/atoms/CloseButton';
import { MobileMenuToggle } from '../components/atoms/MobileMenuToggle';
import { Chip } from '../components/atoms/Chip';

/**
 * STRZYKAWA - UKRYTY STYLE GUIDE
 * Dostępny pod: /style-guide
 */

export default function StyleGuide() {
    const [cartCount] = useState(3);
    const [showSuccess, setShowSuccess] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeChips, setActiveChips] = useState(['etiopia']);

    const handleSuccessDemo = () => {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
    };

    const toggleChip = (id) => {
        setActiveChips(prev =>
            prev.includes(id)
                ? prev.filter(c => c !== id)
                : [...prev, id]
        );
    };

    return (
        <div className="min-h-screen bg-primary-dark text-white">

            {/* HEADER */}
            <header className="bg-primary border-b border-accent/20 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <h1 className="text-4xl font-bold">🎨 Strzykawa Style Guide</h1>
                    <p className="text-muted mt-2">Ukryty przewodnik po design systemie</p>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">

                {/* PALETA */}
                <Section title="🎨 Paleta Kolorów">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <ColorCard name="primary.DEFAULT" hex="#1E2A25" usage="Tło strony" />
                        <ColorCard name="primary.light" hex="#2C3A35" usage="Hover, karty" />
                        <ColorCard name="primary.dark" hex="#141C18" usage="Footer, header" />
                        <ColorCard name="accent" hex="#6B7F73" usage="Linki, secondary" />
                        <ColorCard name="muted" hex="#9CA8A1" usage="Tekst pomocniczy" />
                        <ColorCard name="success.DEFAULT" hex="#0E8C6F" usage="Success, licznik koszyka" highlight />
                        <ColorCard name="danger.DEFAULT" hex="#C9423A" usage="Błędy, akcje destrukcyjne" />
                        <ColorCard name="badge.blue" hex="#7A8FA6" usage="Badge PRZELEW" />
                        <ColorCard name="badge.orange" hex="#C48F62" usage="Badge ESPRESSO" />
                        <ColorCard name="cta.DEFAULT" hex="#3A5F55" usage="Przycisk płatności" />
                    </div>
                </Section>

                {/* PRZYCISKI */}
                <Section title="🔘 Przyciski (Rounded-full)">
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
                                <Button size="sm">Small</Button>
                                <Button size="md">Medium</Button>
                                <Button size="lg">Large</Button>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl text-accent mb-4">States:</h3>
                            <div className="flex flex-wrap gap-4">
                                <Button>Normal</Button>
                                <Button loading>Loading...</Button>
                                <Button disabled>Disabled</Button>
                                <Button
                                    className={showSuccess ? 'bg-success' : 'bg-accent'}
                                    onClick={handleSuccessDemo}
                                >
                                    {showSuccess ? '✓ Added!' : 'Add'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* BADGES */}
                <Section title="🏷️ Badges">
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl text-accent mb-4">Count Badges (ZAWSZE ZIELONE):</h3>
                            <div className="flex flex-wrap items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <span className="text-muted text-sm">Large:</span>
                                    <span className="px-3 py-1 bg-success text-white text-sm font-bold rounded-full">
                    {cartCount}
                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-muted text-sm">Small:</span>
                                    <span className="px-2 py-0.5 bg-success text-white text-xs font-bold rounded-full">
                    {cartCount}
                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-muted text-sm">Na ikonie:</span>
                                    <div className="relative">
                                        <FaShoppingCart className="w-6 h-6" />
                                        <span className="absolute -top-2 -right-2 bg-success text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {cartCount}
                    </span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-muted text-sm mt-2">
                                ✅ ZASADA: Count badges = bg-success
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl text-accent mb-4">Country Badges (Sharp):</h3>
                            <div className="flex flex-wrap gap-4">
                                <span className="px-4 py-2 bg-[#4AA3DF] text-white text-sm font-semibold">Etiopia</span>
                                <span className="px-4 py-2 bg-[#F4C64E] text-black text-sm font-semibold">Kolumbia</span>
                                <span className="px-4 py-2 bg-[#b62424] text-white text-sm font-semibold">Kenia</span>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* QUANTITY */}
                <Section title="🔢 QuantitySelector">
                    <div className="flex flex-col gap-4">
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
                </Section>

                {/* CHIPS */}
                <Section title="🔖 Chips">
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl text-accent mb-4">Filters:</h3>
                            <div className="flex flex-wrap gap-2">
                                {['etiopia', 'kolumbia'].map(id => (
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
                    </div>
                </Section>

                {/* SPECIAL BUTTONS */}
                <Section title="🎛️ Special Buttons">
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl text-accent mb-4">CloseButton:</h3>
                            <CloseButton onClick={() => alert('Closed!')} />
                        </div>
                        <div>
                            <h3 className="text-xl text-accent mb-4">MobileMenuToggle:</h3>
                            <MobileMenuToggle isOpen={menuOpen} onToggle={() => setMenuOpen(!menuOpen)} />
                        </div>
                    </div>
                </Section>

                {/* IKONY */}
                <Section title="🎯 Ikony">
                    <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                        <IconCard icon={FaCoffee} name="Coffee" />
                        <IconCard icon={FaShoppingCart} name="Cart" />
                        <IconCard icon={FaHeart} name="Heart" />
                        <IconCard icon={FaSearch} name="Search" />
                        <IconCard icon={FaUser} name="User" />
                        <IconCard icon={FaLeaf} name="Leaf" />
                    </div>
                </Section>

                {/* TYPOGRAPHY */}
                <Section title="✍️ Typografia">
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl text-accent mb-4">Font: Dosis</h3>
                            <div className="space-y-2">
                                <p className="text-6xl font-bold">Heading 1</p>
                                <p className="text-5xl font-bold">Heading 2</p>
                                <p className="text-4xl font-semibold">Heading 3</p>
                                <p className="text-3xl font-semibold">Heading 4</p>
                                <p className="text-2xl font-medium">Heading 5</p>
                                <p className="text-xl">Heading 6</p>
                                <p className="text-base">Body text (base)</p>
                                <p className="text-sm text-muted">Small text (muted)</p>
                                <p className="text-xs text-muted/70">Extra small</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl text-accent mb-4">Weights:</h3>
                            <div className="space-y-2">
                                <p className="font-normal">400 - Regular (body)</p>
                                <p className="font-medium">500 - Medium (buttons)</p>
                                <p className="font-semibold">600 - SemiBold (h3-h6)</p>
                                <p className="font-bold">700 - Bold (h1-h2, badges)</p>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* SPACING */}
                <Section title="📏 Spacing">
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl text-accent mb-4">Tailwind Scale:</h3>
                            <div className="space-y-2">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-4 bg-accent"></div>
                                    <span className="text-sm">p-4 (16px) - standard</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-24 h-6 bg-accent"></div>
                                    <span className="text-sm">p-6 (24px) - cards</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-32 h-8 bg-accent"></div>
                                    <span className="text-sm">p-8 (32px) - sections</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-48 h-12 bg-accent"></div>
                                    <span className="text-sm">p-12 (48px) - large sections</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Z-INDEX */}
                <Section title="🔢 Z-Index Hierarchy">
                    <div className="space-y-4">
                        <ZIndexCard level="z-0" usage="Base layer" />
                        <ZIndexCard level="z-10" usage="Overlays (coffee detail)" />
                        <ZIndexCard level="z-20" usage="Dropdowns, tooltips" />
                        <ZIndexCard level="z-30" usage="Sticky filters" />
                        <ZIndexCard level="z-40" usage="Fixed header (scrolled)" />
                        <ZIndexCard level="z-50" usage="Media elements" highlight />
                        <ZIndexCard level="z-[100]" usage="MODALS (highest!)" highlight />
                    </div>
                </Section>

                {/* ANIMATIONS */}
                <Section title="🎬 Animations">
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl text-accent mb-4">Hover Effects:</h3>
                            <div className="flex flex-wrap gap-4">
                                <div className="p-6 bg-primary-light hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                                    Card Hover (scale-[1.02])
                                </div>
                                <button className="px-6 py-2 bg-accent text-white rounded-full hover:scale-105 transition-all duration-200">
                                    Button Hover (scale-105)
                                </button>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl text-accent mb-4">Success State (2s):</h3>
                            <button
                                onClick={handleSuccessDemo}
                                className={`px-6 py-2 text-white rounded-full transition-colors duration-300 ${
                                    showSuccess ? 'bg-success' : 'bg-accent hover:bg-accent/90'
                                }`}
                            >
                                {showSuccess ? '✓ Dodano!' : 'Dodaj do koszyka'}
                            </button>
                        </div>
                    </div>
                </Section>

                {/* ZASADY */}
                <Section title="📐 Zasady">
                    <div className="space-y-6">
                        <Rule good title="✅ SHARP CORNERS" description="Karty, modals - NO rounded">
                            <div className="w-full h-24 bg-primary-light border border-accent/30"></div>
                        </Rule>
                        <Rule good title="✅ ROUNDED-FULL" description="Buttony, badges">
                            <button className="px-6 py-2 bg-accent text-white rounded-full">Button</button>
                        </Rule>
                        <Rule good title="✅ SUCCESS COUNT BADGES" description="bg-success">
                            <span className="px-3 py-1 bg-success text-white rounded-full">3</span>
                        </Rule>
                        <Rule good title="✅ Z-INDEX MODALS" description="z-[100] dla modalów">
                            <span className="px-3 py-1 bg-primary-light border border-accent/30 rounded-full text-xs">z-[100]</span>
                        </Rule>
                    </div>
                </Section>

            </div>

            {/* FOOTER */}
            <footer className="bg-primary-dark border-t border-accent/20 mt-16 py-8">
                <div className="max-w-7xl mx-auto px-4 text-center text-muted">
                    <p>🎨 Strzykawa Design System v1.1</p>
                    <p className="text-xs mt-2">14 Listopada 2025 - Updated</p>
                </div>
            </footer>
        </div>
    );
}

// HELPERS
function Section({ title, children }) {
    return (
        <section className="space-y-6">
            <h2 className="text-3xl font-bold border-b border-accent/30 pb-4">{title}</h2>
            {children}
        </section>
    );
}

function ColorCard({ name, hex, usage, highlight }) {
    return (
        <div className="space-y-2">
            <div
                className={`w-full h-24 border-2 ${highlight ? 'border-success' : 'border-white/10'}`}
                style={{ backgroundColor: hex }}
            ></div>
            <p className="font-mono text-sm text-accent">{name}</p>
            <p className="font-mono text-xs text-muted">{hex}</p>
            <p className="text-xs text-white/70">{usage}</p>
        </div>
    );
}

function IconCard({ icon: Icon, name }) {
    return (
        <div className="flex flex-col items-center gap-2 p-4 bg-primary-light border border-accent/30">
            <Icon className="w-8 h-8 text-accent" />
            <p className="text-xs text-muted">{name}</p>
        </div>
    );
}

function Rule({ good, title, description, children }) {
    return (
        <div className={`p-6 border-2 ${good ? 'border-success/30' : 'border-accent/30'}`}>
            <h4 className="text-lg font-semibold mb-2">{title}</h4>
            <p className="text-muted text-sm mb-4">{description}</p>
            {children}
        </div>
    );
}

function ZIndexCard({ level, usage, highlight }) {
    return (
        <div className={`flex items-center justify-between p-4 border ${highlight ? 'border-success/30 bg-success/10' : 'border-accent/30 bg-primary-light'}`}>
            <span className="font-mono text-accent">{level}</span>
            <span className="text-sm text-white/70">{usage}</span>
        </div>
    );
}