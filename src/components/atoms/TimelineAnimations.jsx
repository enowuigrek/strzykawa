import React from 'react';

/**
 * TimelineAnimations - Delikatne SVG animacje dla timeline sections
 * Każdy rok ma swoją unikalną animację
 */

// 2020 - Początek podróży - Fale kawy
export function WaveAnimation() {
    return (
        <svg
            className="w-full h-32 opacity-20"
            viewBox="0 0 400 100"
            preserveAspectRatio="none"
        >
            <path
                d="M0,50 Q100,30 200,50 T400,50 L400,100 L0,100 Z"
                fill="currentColor"
                className="text-accent"
            >
                <animate
                    attributeName="d"
                    dur="8s"
                    repeatCount="indefinite"
                    values="
                        M0,50 Q100,30 200,50 T400,50 L400,100 L0,100 Z;
                        M0,50 Q100,70 200,50 T400,50 L400,100 L0,100 Z;
                        M0,50 Q100,30 200,50 T400,50 L400,100 L0,100 Z
                    "
                />
            </path>
        </svg>
    );
}

// 2022 - Rozbudowa i rozwój - Rosnące kręgi
export function CirclesAnimation() {
    return (
        <svg
            className="w-full h-32 opacity-15"
            viewBox="0 0 400 100"
            preserveAspectRatio="xMidYMid meet"
        >
            <circle cx="100" cy="50" r="5" fill="currentColor" className="text-accent">
                <animate
                    attributeName="r"
                    values="5;25;5"
                    dur="4s"
                    repeatCount="indefinite"
                />
                <animate
                    attributeName="opacity"
                    values="1;0.2;1"
                    dur="4s"
                    repeatCount="indefinite"
                />
            </circle>
            <circle cx="200" cy="50" r="5" fill="currentColor" className="text-accent">
                <animate
                    attributeName="r"
                    values="5;25;5"
                    dur="4s"
                    begin="1s"
                    repeatCount="indefinite"
                />
                <animate
                    attributeName="opacity"
                    values="1;0.2;1"
                    dur="4s"
                    begin="1s"
                    repeatCount="indefinite"
                />
            </circle>
            <circle cx="300" cy="50" r="5" fill="currentColor" className="text-accent">
                <animate
                    attributeName="r"
                    values="5;25;5"
                    dur="4s"
                    begin="2s"
                    repeatCount="indefinite"
                />
                <animate
                    attributeName="opacity"
                    values="1;0.2;1"
                    dur="4s"
                    begin="2s"
                    repeatCount="indefinite"
                />
            </circle>
        </svg>
    );
}

// 2023 - Pierwszy krok w roasting - Delikatne płomienie/para
export function SteamAnimation() {
    return (
        <svg
            className="w-full h-32 opacity-20"
            viewBox="0 0 400 100"
            preserveAspectRatio="xMidYMid meet"
        >
            {/* Para unosząca się */}
            <path
                d="M100,80 Q100,60 110,40 Q120,20 130,0"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-accent"
                strokeLinecap="round"
            >
                <animate
                    attributeName="opacity"
                    values="0;0.8;0"
                    dur="3s"
                    repeatCount="indefinite"
                />
                <animate
                    attributeName="d"
                    values="
                        M100,80 Q100,60 110,40 Q120,20 130,0;
                        M100,80 Q110,60 100,40 Q90,20 100,0;
                        M100,80 Q100,60 110,40 Q120,20 130,0
                    "
                    dur="3s"
                    repeatCount="indefinite"
                />
            </path>
            <path
                d="M200,80 Q200,60 210,40 Q220,20 230,0"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-accent"
                strokeLinecap="round"
            >
                <animate
                    attributeName="opacity"
                    values="0;0.8;0"
                    dur="3s"
                    begin="1s"
                    repeatCount="indefinite"
                />
                <animate
                    attributeName="d"
                    values="
                        M200,80 Q200,60 210,40 Q220,20 230,0;
                        M200,80 Q210,60 200,40 Q190,20 200,0;
                        M200,80 Q200,60 210,40 Q220,20 230,0
                    "
                    dur="3s"
                    begin="1s"
                    repeatCount="indefinite"
                />
            </path>
            <path
                d="M300,80 Q300,60 310,40 Q320,20 330,0"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-accent"
                strokeLinecap="round"
            >
                <animate
                    attributeName="opacity"
                    values="0;0.8;0"
                    dur="3s"
                    begin="2s"
                    repeatCount="indefinite"
                />
                <animate
                    attributeName="d"
                    values="
                        M300,80 Q300,60 310,40 Q320,20 330,0;
                        M300,80 Q310,60 300,40 Q290,20 300,0;
                        M300,80 Q300,60 310,40 Q320,20 330,0
                    "
                    dur="3s"
                    begin="2s"
                    repeatCount="indefinite"
                />
            </path>
        </svg>
    );
}

// 2024 - Palarnia kawy - Krążące ziarna
export function BeansAnimation() {
    return (
        <svg
            className="w-full h-32 opacity-15"
            viewBox="0 0 400 100"
            preserveAspectRatio="xMidYMid meet"
        >
            {/* Ziarnko 1 */}
            <ellipse cx="200" cy="50" rx="8" ry="12" fill="currentColor" className="text-accent">
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    values="0 200 50; 360 200 50"
                    dur="10s"
                    repeatCount="indefinite"
                />
                <animate
                    attributeName="cx"
                    values="200; 250; 200; 150; 200"
                    dur="10s"
                    repeatCount="indefinite"
                />
                <animate
                    attributeName="cy"
                    values="50; 30; 50; 70; 50"
                    dur="10s"
                    repeatCount="indefinite"
                />
            </ellipse>

            {/* Ziarnko 2 */}
            <ellipse cx="200" cy="50" rx="8" ry="12" fill="currentColor" className="text-accent">
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    values="180 200 50; 540 200 50"
                    dur="12s"
                    repeatCount="indefinite"
                />
                <animate
                    attributeName="cx"
                    values="200; 150; 200; 250; 200"
                    dur="12s"
                    repeatCount="indefinite"
                />
                <animate
                    attributeName="cy"
                    values="50; 70; 50; 30; 50"
                    dur="12s"
                    repeatCount="indefinite"
                />
            </ellipse>

            {/* Ziarnko 3 */}
            <ellipse cx="200" cy="50" rx="8" ry="12" fill="currentColor" className="text-accent">
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    values="90 200 50; 450 200 50"
                    dur="11s"
                    repeatCount="indefinite"
                />
                <animate
                    attributeName="cx"
                    values="200; 230; 200; 170; 200"
                    dur="11s"
                    repeatCount="indefinite"
                />
                <animate
                    attributeName="cy"
                    values="50; 40; 50; 60; 50"
                    dur="11s"
                    repeatCount="indefinite"
                />
            </ellipse>
        </svg>
    );
}

// 2025 - Nowy rozdział - Rozwijające się formy
export function BloomAnimation() {
    return (
        <svg
            className="w-full h-32 opacity-15"
            viewBox="0 0 400 100"
            preserveAspectRatio="xMidYMid meet"
        >
            {/* Gwiazdka rozwijająca się */}
            <polygon
                points="200,20 210,40 230,45 215,60 220,80 200,70 180,80 185,60 170,45 190,40"
                fill="currentColor"
                className="text-accent"
            >
                <animateTransform
                    attributeName="transform"
                    type="scale"
                    values="0.5 0.5; 1.2 1.2; 0.5 0.5"
                    dur="6s"
                    repeatCount="indefinite"
                    additive="sum"
                />
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    values="0 200 50; 360 200 50"
                    dur="12s"
                    repeatCount="indefinite"
                    additive="sum"
                />
                <animate
                    attributeName="opacity"
                    values="0.3;1;0.3"
                    dur="6s"
                    repeatCount="indefinite"
                />
            </polygon>

            {/* Drugie kółko */}
            <circle cx="200" cy="50" r="30" stroke="currentColor" strokeWidth="2" fill="none" className="text-accent">
                <animate
                    attributeName="r"
                    values="20;35;20"
                    dur="5s"
                    repeatCount="indefinite"
                />
                <animate
                    attributeName="opacity"
                    values="0.8;0.2;0.8"
                    dur="5s"
                    repeatCount="indefinite"
                />
            </circle>
        </svg>
    );
}

// Mapper dla łatwego użycia
export function TimelineAnimation({ year }) {
    switch (year) {
        case '2020':
            return <WaveAnimation />;
        case '2022':
            return <CirclesAnimation />;
        case '2023':
            return <SteamAnimation />;
        case '2024':
            return <BeansAnimation />;
        case '2025':
            return <BloomAnimation />;
        default:
            return null;
    }
}
