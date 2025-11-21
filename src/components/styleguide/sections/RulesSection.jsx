import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Section, Rule } from '../helpers';

export function RulesSection() {
    return (
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
    );
}
