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

// 2023 - Pierwszy krok w roasting - Mały płomień
export function FlameSmallAnimation() {
    return (
        <svg
            className="w-full h-32 opacity-25"
            viewBox="0 0 400 100"
            preserveAspectRatio="xMidYMid meet"
        >
            {/* Mały płomień */}
            <g transform="translate(180, 20)">
                {/* Zewnętrzna część płomienia */}
                <path
                    d="M20,60 Q15,45 20,30 Q25,15 20,0 Q15,15 10,30 Q5,45 10,60 Z"
                    fill="currentColor"
                    className="text-accent"
                >
                    <animate
                        attributeName="d"
                        values="
                            M20,60 Q15,45 20,30 Q25,15 20,0 Q15,15 10,30 Q5,45 10,60 Z;
                            M20,60 Q18,45 20,28 Q22,12 20,0 Q18,12 16,28 Q14,45 16,60 Z;
                            M20,60 Q12,45 20,32 Q28,18 20,0 Q12,18 4,32 Q-2,45 4,60 Z;
                            M20,60 Q15,45 20,30 Q25,15 20,0 Q15,15 10,30 Q5,45 10,60 Z
                        "
                        dur="2s"
                        repeatCount="indefinite"
                    />
                    <animate
                        attributeName="opacity"
                        values="0.6;0.9;0.7;0.6"
                        dur="2s"
                        repeatCount="indefinite"
                    />
                </path>

                {/* Wewnętrzna jasna część */}
                <path
                    d="M20,50 Q17,40 20,30 Q23,20 20,10 Q17,20 14,30 Q11,40 14,50 Z"
                    fill="currentColor"
                    className="text-white"
                    opacity="0.3"
                >
                    <animate
                        attributeName="d"
                        values="
                            M20,50 Q17,40 20,30 Q23,20 20,10 Q17,20 14,30 Q11,40 14,50 Z;
                            M20,50 Q19,40 20,28 Q21,18 20,10 Q19,18 18,28 Q17,40 18,50 Z;
                            M20,50 Q15,40 20,32 Q25,22 20,10 Q15,22 10,32 Q7,40 10,50 Z;
                            M20,50 Q17,40 20,30 Q23,20 20,10 Q17,20 14,30 Q11,40 14,50 Z
                        "
                        dur="2s"
                        repeatCount="indefinite"
                    />
                </path>
            </g>
        </svg>
    );
}

// 2024 - Palarnia kawy - Duży ogień
export function FlameLargeAnimation() {
    return (
        <svg
            className="w-full h-32 opacity-25"
            viewBox="0 0 400 100"
            preserveAspectRatio="xMidYMid meet"
        >
            {/* Duży ogień - trzy płomienie */}
            {/* Lewy płomień */}
            <g transform="translate(120, 10)">
                <path
                    d="M25,70 Q18,50 25,35 Q32,20 25,0 Q18,20 11,35 Q4,50 11,70 Z"
                    fill="currentColor"
                    className="text-accent"
                >
                    <animate
                        attributeName="d"
                        values="
                            M25,70 Q18,50 25,35 Q32,20 25,0 Q18,20 11,35 Q4,50 11,70 Z;
                            M25,70 Q22,50 25,32 Q28,15 25,0 Q22,15 19,32 Q16,50 19,70 Z;
                            M25,70 Q15,50 25,38 Q35,22 25,0 Q15,22 5,38 Q0,50 5,70 Z;
                            M25,70 Q18,50 25,35 Q32,20 25,0 Q18,20 11,35 Q4,50 11,70 Z
                        "
                        dur="1.8s"
                        repeatCount="indefinite"
                    />
                    <animate
                        attributeName="opacity"
                        values="0.6;0.9;0.7;0.6"
                        dur="1.8s"
                        repeatCount="indefinite"
                    />
                </path>
            </g>

            {/* Środkowy płomień (największy) */}
            <g transform="translate(165, 0)">
                <path
                    d="M35,80 Q25,55 35,35 Q45,15 35,0 Q25,15 15,35 Q5,55 15,80 Z"
                    fill="currentColor"
                    className="text-accent"
                >
                    <animate
                        attributeName="d"
                        values="
                            M35,80 Q25,55 35,35 Q45,15 35,0 Q25,15 15,35 Q5,55 15,80 Z;
                            M35,80 Q30,55 35,30 Q40,12 35,0 Q30,12 25,30 Q20,55 25,80 Z;
                            M35,80 Q20,55 35,38 Q50,20 35,0 Q20,20 5,38 Q0,55 5,80 Z;
                            M35,80 Q25,55 35,35 Q45,15 35,0 Q25,15 15,35 Q5,55 15,80 Z
                        "
                        dur="2s"
                        repeatCount="indefinite"
                    />
                    <animate
                        attributeName="opacity"
                        values="0.7;1;0.8;0.7"
                        dur="2s"
                        repeatCount="indefinite"
                    />
                </path>
                {/* Jasne jądro */}
                <path
                    d="M35,65 Q30,48 35,35 Q40,22 35,12 Q30,22 25,35 Q20,48 25,65 Z"
                    fill="currentColor"
                    className="text-white"
                    opacity="0.4"
                >
                    <animate
                        attributeName="d"
                        values="
                            M35,65 Q30,48 35,35 Q40,22 35,12 Q30,22 25,35 Q20,48 25,65 Z;
                            M35,65 Q32,48 35,32 Q38,20 35,12 Q32,20 29,32 Q26,48 29,65 Z;
                            M35,65 Q27,48 35,38 Q43,25 35,12 Q27,25 19,38 Q15,48 19,65 Z;
                            M35,65 Q30,48 35,35 Q40,22 35,12 Q30,22 25,35 Q20,48 25,65 Z
                        "
                        dur="2s"
                        repeatCount="indefinite"
                    />
                </path>
            </g>

            {/* Prawy płomień */}
            <g transform="translate(230, 10)">
                <path
                    d="M25,70 Q18,50 25,35 Q32,20 25,0 Q18,20 11,35 Q4,50 11,70 Z"
                    fill="currentColor"
                    className="text-accent"
                >
                    <animate
                        attributeName="d"
                        values="
                            M25,70 Q18,50 25,35 Q32,20 25,0 Q18,20 11,35 Q4,50 11,70 Z;
                            M25,70 Q20,50 25,38 Q30,22 25,0 Q20,22 15,38 Q12,50 15,70 Z;
                            M25,70 Q22,50 25,32 Q28,15 25,0 Q22,15 19,32 Q16,50 19,70 Z;
                            M25,70 Q18,50 25,35 Q32,20 25,0 Q18,20 11,35 Q4,50 11,70 Z
                        "
                        dur="2.2s"
                        repeatCount="indefinite"
                    />
                    <animate
                        attributeName="opacity"
                        values="0.6;0.8;0.9;0.6"
                        dur="2.2s"
                        repeatCount="indefinite"
                    />
                </path>
            </g>
        </svg>
    );
}

// 2025 - Nowy rozdział - Logo i kubek cuppingowy z parą
export function LogoCuppingAnimation() {
    return (
        <div className="w-full h-32 flex items-center justify-center gap-8 opacity-80">
            {/* Logo pionowe */}
            <div className="h-24 flex items-center">
                <img
                    src="/logo/vertical-logo.png"
                    alt="Strzykawa Logo"
                    className="h-full w-auto object-contain opacity-90"
                />
            </div>

            {/* Kubek cuppingowy z animowaną parą */}
            <svg
                className="h-24 w-24"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid meet"
            >
                {/* Kubek cuppingowy (bez ucha) */}
                <g transform="translate(50, 50)">
                    {/* Korpus kubka */}
                    <path
                        d="M-15,10 L-12,-15 L12,-15 L15,10 Q15,15 10,18 Q5,20 0,20 Q-5,20 -10,18 Q-15,15 -15,10 Z"
                        fill="currentColor"
                        className="text-accent"
                        opacity="0.8"
                    />
                    {/* Brzeg kubka */}
                    <ellipse
                        cx="0"
                        cy="-15"
                        rx="12"
                        ry="3"
                        fill="currentColor"
                        className="text-accent"
                        opacity="0.9"
                    />
                    {/* Powierzchnia kawy */}
                    <ellipse
                        cx="0"
                        cy="-13"
                        rx="10"
                        ry="2"
                        fill="currentColor"
                        className="text-primary-dark"
                        opacity="0.6"
                    />

                    {/* Para unosząca się - 3 strumienie */}
                    {/* Lewy strumień pary */}
                    <path
                        d="M-6,-15 Q-8,-25 -6,-35 Q-4,-45 -6,-50"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                        className="text-white"
                        strokeLinecap="round"
                        opacity="0.6"
                    >
                        <animate
                            attributeName="opacity"
                            values="0;0.6;0"
                            dur="3s"
                            repeatCount="indefinite"
                        />
                        <animate
                            attributeName="d"
                            values="
                                M-6,-15 Q-8,-25 -6,-35 Q-4,-45 -6,-50;
                                M-6,-15 Q-4,-25 -6,-35 Q-8,-45 -6,-50;
                                M-6,-15 Q-8,-25 -6,-35 Q-4,-45 -6,-50
                            "
                            dur="3s"
                            repeatCount="indefinite"
                        />
                    </path>

                    {/* Środkowy strumień pary */}
                    <path
                        d="M0,-15 Q2,-25 0,-35 Q-2,-45 0,-52"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                        className="text-white"
                        strokeLinecap="round"
                        opacity="0.6"
                    >
                        <animate
                            attributeName="opacity"
                            values="0;0.6;0"
                            dur="3s"
                            begin="1s"
                            repeatCount="indefinite"
                        />
                        <animate
                            attributeName="d"
                            values="
                                M0,-15 Q2,-25 0,-35 Q-2,-45 0,-52;
                                M0,-15 Q-2,-25 0,-35 Q2,-45 0,-52;
                                M0,-15 Q2,-25 0,-35 Q-2,-45 0,-52
                            "
                            dur="3s"
                            begin="1s"
                            repeatCount="indefinite"
                        />
                    </path>

                    {/* Prawy strumień pary */}
                    <path
                        d="M6,-15 Q8,-25 6,-35 Q4,-45 6,-50"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                        className="text-white"
                        strokeLinecap="round"
                        opacity="0.6"
                    >
                        <animate
                            attributeName="opacity"
                            values="0;0.6;0"
                            dur="3s"
                            begin="2s"
                            repeatCount="indefinite"
                        />
                        <animate
                            attributeName="d"
                            values="
                                M6,-15 Q8,-25 6,-35 Q4,-45 6,-50;
                                M6,-15 Q4,-25 6,-35 Q8,-45 6,-50;
                                M6,-15 Q8,-25 6,-35 Q4,-45 6,-50
                            "
                            dur="3s"
                            begin="2s"
                            repeatCount="indefinite"
                        />
                    </path>
                </g>
            </svg>
        </div>
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
            return <FlameSmallAnimation />;
        case '2024':
            return <FlameLargeAnimation />;
        case '2025':
            return <LogoCuppingAnimation />;
        default:
            return null;
    }
}
