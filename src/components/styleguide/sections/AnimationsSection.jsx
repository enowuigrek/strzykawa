import React from 'react';
import { Section } from '../helpers';

export function AnimationsSection() {
    return (
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
    );
}
