import React, { useState } from 'react';
import { Section } from '../helpers';
import { useScrollAnimation, scrollAnimations } from '../../../hooks/useScrollAnimation';

function ScrollAnimationDemo({ name, animation, description }) {
    const [isVisible, setIsVisible] = useState(false);

    const reset = () => {
        setIsVisible(false);
        setTimeout(() => setIsVisible(true), 50);
    };

    return (
        <div className="flex flex-col items-center gap-3">
            <div
                className={`w-24 h-24 bg-accent/80 rounded-lg flex items-center justify-center transition-all duration-700 ease-out ${
                    isVisible ? animation.visible : animation.hidden
                }`}
            >
                <span className="text-white text-xs font-mono">{name}</span>
            </div>
            <button
                onClick={reset}
                className="px-3 py-1 bg-primary-light text-white text-xs rounded hover:bg-accent/50 transition-colors"
            >
                {isVisible ? 'Powtorz' : 'Uruchom'}
            </button>
            <span className="text-muted text-xs text-center max-w-[120px]">{description}</span>
        </div>
    );
}

function StaggeredDemo() {
    const [isVisible, setIsVisible] = useState(false);

    const reset = () => {
        setIsVisible(false);
        setTimeout(() => setIsVisible(true), 50);
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-4 justify-center">
                {[0, 1, 2, 3].map((index) => (
                    <div
                        key={index}
                        className={`w-16 h-16 bg-accent/80 rounded-lg transition-all duration-500 ease-out ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'
                        }`}
                        style={{ transitionDelay: isVisible ? `${index * 100}ms` : '0ms' }}
                    />
                ))}
            </div>
            <div className="text-center">
                <button
                    onClick={reset}
                    className="px-4 py-2 bg-primary-light text-white text-sm rounded hover:bg-accent/50 transition-colors"
                >
                    {isVisible ? 'Powtorz stagger' : 'Uruchom stagger'}
                </button>
            </div>
        </div>
    );
}

export function AnimationsSection() {
    return (
        <Section id="animations" title="Animacje">
            <div className="space-y-12">
                {/* Scroll Animations */}
                <div>
                    <h3 className="text-xl text-accent mb-2">Scroll Animations (kawowe nazwy):</h3>
                    <p className="text-muted text-sm mb-6">
                        Hook: <code className="bg-primary-light px-2 py-1 rounded">useScrollAnimation()</code> -
                        animacje przy scrollowaniu z tematycznymi nazwami
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        <ScrollAnimationDemo
                            name="pourDown"
                            animation={scrollAnimations.pourDown}
                            description="Wlewa sie z gory (jak kawa)"
                        />
                        <ScrollAnimationDemo
                            name="pourUp"
                            animation={scrollAnimations.pourUp}
                            description="Pojawia sie z dolu"
                        />
                        <ScrollAnimationDemo
                            name="spread"
                            animation={scrollAnimations.spread}
                            description="Rozlewa sie ze srodka"
                        />
                        <ScrollAnimationDemo
                            name="flowLeft"
                            animation={scrollAnimations.flowLeft}
                            description="Wplywa z lewej"
                        />
                        <ScrollAnimationDemo
                            name="flowRight"
                            animation={scrollAnimations.flowRight}
                            description="Wplywa z prawej"
                        />
                        <ScrollAnimationDemo
                            name="fade"
                            animation={scrollAnimations.fade}
                            description="Proste zanikanie"
                        />
                    </div>
                </div>

                {/* Staggered Animation */}
                <div>
                    <h3 className="text-xl text-accent mb-2">Staggered Animation:</h3>
                    <p className="text-muted text-sm mb-6">
                        Elementy pojawiaja sie z opoznieniem (100ms na element) - idealne dla kart i list
                    </p>
                    <StaggeredDemo />
                    <div className="mt-4 p-4 bg-primary-light rounded-lg">
                        <code className="text-xs text-muted block whitespace-pre">{`// Uzycie staggered delay
style={{ transitionDelay: isVisible ? \`\${index * 100}ms\` : '0ms' }}`}</code>
                    </div>
                </div>

                {/* Transition Duration */}
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
                        <div className="flex items-center gap-4">
                            <button className="px-6 py-2 bg-accent text-white rounded-full transition-all duration-700 hover:scale-105">
                                700ms (scroll)
                            </button>
                            <span className="text-muted text-sm">scroll animations</span>
                        </div>
                    </div>
                </div>

                {/* Hover Effects */}
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

                {/* Tailwind Animations */}
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

                {/* Usage Code */}
                <div>
                    <h3 className="text-xl text-accent mb-4">Uzycie useScrollAnimation:</h3>
                    <div className="p-4 bg-primary-light rounded-lg overflow-x-auto">
                        <code className="text-xs text-muted block whitespace-pre">{`import { useScrollAnimation, scrollAnimations } from '../hooks/useScrollAnimation';

function MyComponent() {
    const [ref, isVisible] = useScrollAnimation({ threshold: 0.2 });

    return (
        <div
            ref={ref}
            className={\`transition-all duration-700 ease-out \${
                isVisible
                    ? scrollAnimations.pourDown.visible
                    : scrollAnimations.pourDown.hidden
            }\`}
        >
            Animowany content
        </div>
    );
}`}</code>
                    </div>
                </div>
            </div>
        </Section>
    );
}
