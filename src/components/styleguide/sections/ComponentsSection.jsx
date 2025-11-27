import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Section } from '../helpers';
import { QuantitySelector } from '../../atoms/QuantitySelector';
import { CloseButton } from '../../atoms/CloseButton';
import { MobileMenuToggle } from '../../atoms/MobileMenuToggle';
import { Chip } from '../../atoms/Chip';
import { Spinner } from '../../atoms/Spinner';

export function ComponentsSection({ quantity, setQuantity, menuOpen, setMenuOpen, activeChips, toggleChip }) {
    return (
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
                <div>
                    <h3 className="text-xl text-accent mb-4">Gallery Navigation Arrows:</h3>
                    <p className="text-muted text-sm mb-4">Strzalki nawigacji w galeriach - pojawiaja sie na hover</p>
                    <div className="flex items-center gap-4">
                        <button className="w-10 h-10 bg-primary/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:bg-accent hover:border-accent">
                            <FaChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-muted text-sm">Default</span>
                        <button className="w-10 h-10 bg-accent border border-accent flex items-center justify-center text-white">
                            <FaChevronRight className="w-4 h-4" />
                        </button>
                        <span className="text-muted text-sm">Hover state</span>
                    </div>
                    <div className="mt-4 p-4 bg-primary-light">
                        <code className="text-xs text-muted block">
                            bg-primary/80 backdrop-blur-sm border border-white/10 → hover:bg-accent hover:border-accent
                        </code>
                    </div>
                </div>
                <div>
                    <h3 className="text-xl text-accent mb-4">Image Counter Badge:</h3>
                    <p className="text-muted text-sm mb-4">Licznik zdjec w galeriach</p>
                    <div className="flex items-center gap-4">
                        <div className="px-2 py-1 bg-primary/80 backdrop-blur-sm border border-white/10 text-white text-sm font-medium">
                            1/5
                        </div>
                        <span className="text-muted text-sm">bg-primary/80 backdrop-blur-sm border border-white/10</span>
                    </div>
                </div>
            </div>
        </Section>
    );
}
