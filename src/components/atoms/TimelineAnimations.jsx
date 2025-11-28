import React from 'react';

/**
 * TimelineAnimations - Delikatne SVG animacje dla timeline sections
 * Każdy rok ma swoją unikalną animację nawiązującą do treści
 */

// 2020 - Początek podróży - Fale kawy (ZACHOWANE - user lubi!)
export function WaveAnimation() {
    return (
        <svg
            className="w-full h-48 opacity-35"
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

// 2022 - Rozbudowa i rozwój - Stoliki/miejsca siedzące pojawiające się
export function TablesAnimation() {
    return (
        <svg
            className="w-full h-48 opacity-30"
            viewBox="0 0 400 100"
            preserveAspectRatio="xMidYMid meet"
        >
            {/* Stolik 1 - lewa strona */}
            <g>
                <rect x="60" y="60" width="50" height="6" fill="currentColor" className="text-accent">
                    <animate
                        attributeName="opacity"
                        values="0;1;1"
                        dur="6s"
                        begin="0s"
                        repeatCount="indefinite"
                    />
                </rect>
                <rect x="64" y="66" width="6" height="24" fill="currentColor" className="text-accent">
                    <animate
                        attributeName="opacity"
                        values="0;1;1"
                        dur="6s"
                        begin="0s"
                        repeatCount="indefinite"
                    />
                </rect>
                <rect x="100" y="66" width="6" height="24" fill="currentColor" className="text-accent">
                    <animate
                        attributeName="opacity"
                        values="0;1;1"
                        dur="6s"
                        begin="0s"
                        repeatCount="indefinite"
                    />
                </rect>
            </g>

            {/* Stolik 2 - środek */}
            <g>
                <rect x="180" y="50" width="50" height="6" fill="currentColor" className="text-accent">
                    <animate
                        attributeName="opacity"
                        values="0;0;1;1"
                        dur="6s"
                        begin="0s"
                        repeatCount="indefinite"
                    />
                </rect>
                <rect x="184" y="56" width="6" height="34" fill="currentColor" className="text-accent">
                    <animate
                        attributeName="opacity"
                        values="0;0;1;1"
                        dur="6s"
                        begin="0s"
                        repeatCount="indefinite"
                    />
                </rect>
                <rect x="220" y="56" width="6" height="34" fill="currentColor" className="text-accent">
                    <animate
                        attributeName="opacity"
                        values="0;0;1;1"
                        dur="6s"
                        begin="0s"
                        repeatCount="indefinite"
                    />
                </rect>
            </g>

            {/* Stolik 3 - prawa strona */}
            <g>
                <rect x="300" y="55" width="50" height="6" fill="currentColor" className="text-accent">
                    <animate
                        attributeName="opacity"
                        values="0;0;0;1"
                        dur="6s"
                        begin="0s"
                        repeatCount="indefinite"
                    />
                </rect>
                <rect x="304" y="61" width="6" height="29" fill="currentColor" className="text-accent">
                    <animate
                        attributeName="opacity"
                        values="0;0;0;1"
                        dur="6s"
                        begin="0s"
                        repeatCount="indefinite"
                    />
                </rect>
                <rect x="340" y="61" width="6" height="29" fill="currentColor" className="text-accent">
                    <animate
                        attributeName="opacity"
                        values="0;0;0;1"
                        dur="6s"
                        begin="0s"
                        repeatCount="indefinite"
                    />
                </rect>
            </g>

            {/* Ludzie - kropki nad stolikami pojawiające się */}
            <circle cx="70" cy="50" r="5" fill="currentColor" className="text-accent">
                <animate attributeName="opacity" values="0;0;1" dur="6s" repeatCount="indefinite" />
            </circle>
            <circle cx="105" cy="50" r="5" fill="currentColor" className="text-accent">
                <animate attributeName="opacity" values="0;0;1" dur="6s" repeatCount="indefinite" />
            </circle>
            <circle cx="190" cy="40" r="5" fill="currentColor" className="text-accent">
                <animate attributeName="opacity" values="0;0;0;1" dur="6s" repeatCount="indefinite" />
            </circle>
            <circle cx="225" cy="40" r="5" fill="currentColor" className="text-accent">
                <animate attributeName="opacity" values="0;0;0;1" dur="6s" repeatCount="indefinite" />
            </circle>
            <circle cx="310" cy="45" r="5" fill="currentColor" className="text-accent">
                <animate attributeName="opacity" values="0;0;0;0;1" dur="6s" repeatCount="indefinite" />
            </circle>
            <circle cx="345" cy="45" r="5" fill="currentColor" className="text-accent">
                <animate attributeName="opacity" values="0;0;0;0;1" dur="6s" repeatCount="indefinite" />
            </circle>
        </svg>
    );
}

// 2023 - Pierwszy krok w roasting - Ziarna wpadające do małego pieca
export function SmallRoasterAnimation() {
    return (
        <svg
            className="w-full h-48 opacity-35"
            viewBox="0 0 400 100"
            preserveAspectRatio="xMidYMid meet"
        >
            {/* Mały piec - prostokąt z otworem na górze */}
            <rect x="160" y="45" width="80" height="50" fill="none" stroke="currentColor" strokeWidth="3" className="text-accent" />
            <rect x="165" y="40" width="70" height="6" fill="currentColor" className="text-accent" opacity="0.3" />

            {/* Ziarna wpadające (kropki spadające w loop) */}
            <circle cx="200" cy="10" r="5" fill="currentColor" className="text-accent">
                <animate
                    attributeName="cy"
                    values="10;40;40;10"
                    dur="3s"
                    repeatCount="indefinite"
                />
                <animate
                    attributeName="opacity"
                    values="1;1;0;0;1"
                    dur="3s"
                    repeatCount="indefinite"
                />
            </circle>
            <circle cx="190" cy="10" r="5" fill="currentColor" className="text-accent">
                <animate
                    attributeName="cy"
                    values="10;40;40;10"
                    dur="3s"
                    begin="0.3s"
                    repeatCount="indefinite"
                />
                <animate
                    attributeName="opacity"
                    values="1;1;0;0;1"
                    dur="3s"
                    begin="0.3s"
                    repeatCount="indefinite"
                />
            </circle>
            <circle cx="210" cy="10" r="5" fill="currentColor" className="text-accent">
                <animate
                    attributeName="cy"
                    values="10;40;40;10"
                    dur="3s"
                    begin="0.6s"
                    repeatCount="indefinite"
                />
                <animate
                    attributeName="opacity"
                    values="1;1;0;0;1"
                    dur="3s"
                    begin="0.6s"
                    repeatCount="indefinite"
                />
            </circle>

            {/* Ciepło/para z pieca (fale unoszące się) */}
            <path
                d="M170,45 Q175,40 180,45"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="none"
                className="text-accent"
                opacity="0.4"
            >
                <animate
                    attributeName="d"
                    values="
                        M170,45 Q175,40 180,45;
                        M170,45 Q175,43 180,45;
                        M170,45 Q175,40 180,45
                    "
                    dur="2s"
                    repeatCount="indefinite"
                />
            </path>
            <path
                d="M220,45 Q225,40 230,45"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="none"
                className="text-accent"
                opacity="0.4"
            >
                <animate
                    attributeName="d"
                    values="
                        M220,45 Q225,40 230,45;
                        M220,45 Q225,43 230,45;
                        M220,45 Q225,40 230,45
                    "
                    dur="2s"
                    begin="0.5s"
                    repeatCount="indefinite"
                />
            </path>
        </svg>
    );
}

// 2024 - Palarnia kawy - Budynek palarni budujący się / większy piec
export function RoasteryAnimation() {
    return (
        <svg
            className="w-full h-48 opacity-30"
            viewBox="0 0 400 100"
            preserveAspectRatio="xMidYMid meet"
        >
            {/* Budynek palarni - buduje się od dołu */}
            <rect x="130" y="35" width="140" height="55" fill="none" stroke="currentColor" strokeWidth="3" className="text-accent">
                <animate
                    attributeName="height"
                    values="0;55"
                    dur="4s"
                    repeatCount="indefinite"
                />
                <animate
                    attributeName="y"
                    values="90;35"
                    dur="4s"
                    repeatCount="indefinite"
                />
            </rect>

            {/* Dach */}
            <polygon points="125,35 200,15 275,35" fill="none" stroke="currentColor" strokeWidth="3" className="text-accent">
                <animate
                    attributeName="opacity"
                    values="0;0;0;1"
                    dur="4s"
                    repeatCount="indefinite"
                />
            </polygon>

            {/* Okna pojawiające się */}
            <rect x="150" y="50" width="28" height="20" fill="currentColor" className="text-accent" opacity="0.3">
                <animate
                    attributeName="opacity"
                    values="0;0;0.3"
                    dur="4s"
                    repeatCount="indefinite"
                />
            </rect>
            <rect x="186" y="50" width="28" height="20" fill="currentColor" className="text-accent" opacity="0.3">
                <animate
                    attributeName="opacity"
                    values="0;0;0;0.3"
                    dur="4s"
                    repeatCount="indefinite"
                />
            </rect>
            <rect x="222" y="50" width="28" height="20" fill="currentColor" className="text-accent" opacity="0.3">
                <animate
                    attributeName="opacity"
                    values="0;0;0;0;0.3"
                    dur="4s"
                    repeatCount="indefinite"
                />
            </rect>

            {/* Dym z komina */}
            <circle cx="200" cy="15" r="6" fill="currentColor" className="text-accent">
                <animate
                    attributeName="cy"
                    values="20;5;5;20"
                    dur="5s"
                    begin="4s"
                    repeatCount="indefinite"
                />
                <animate
                    attributeName="opacity"
                    values="0.5;0;0;0.5"
                    dur="5s"
                    begin="4s"
                    repeatCount="indefinite"
                />
            </circle>
        </svg>
    );
}

// 2025 - Nowy rozdział - Filiżanki cupping w okręgu + nowy branding
export function CuppingAnimation() {
    return (
        <svg
            className="w-full h-48 opacity-30"
            viewBox="0 0 400 100"
            preserveAspectRatio="xMidYMid meet"
        >
            {/* Filiżanki w okręgu (5 filiżanek - jak na cupping) */}

            {/* Filiżanka 1 - góra */}
            <g>
                <ellipse cx="200" cy="25" rx="12" ry="9" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-accent">
                    <animate attributeName="opacity" values="0;1" dur="5s" repeatCount="indefinite" />
                </ellipse>
                <path d="M188,25 L188,38 Q200,42 212,38 L212,25" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-accent">
                    <animate attributeName="opacity" values="0;1" dur="5s" repeatCount="indefinite" />
                </path>
            </g>

            {/* Filiżanka 2 - prawa góra */}
            <g>
                <ellipse cx="245" cy="40" rx="12" ry="9" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-accent">
                    <animate attributeName="opacity" values="0;0;1" dur="5s" repeatCount="indefinite" />
                </ellipse>
                <path d="M233,40 L233,53 Q245,57 257,53 L257,40" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-accent">
                    <animate attributeName="opacity" values="0;0;1" dur="5s" repeatCount="indefinite" />
                </path>
            </g>

            {/* Filiżanka 3 - prawa dół */}
            <g>
                <ellipse cx="230" cy="72" rx="12" ry="9" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-accent">
                    <animate attributeName="opacity" values="0;0;0;1" dur="5s" repeatCount="indefinite" />
                </ellipse>
                <path d="M218,72 L218,85 Q230,89 242,85 L242,72" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-accent">
                    <animate attributeName="opacity" values="0;0;0;1" dur="5s" repeatCount="indefinite" />
                </path>
            </g>

            {/* Filiżanka 4 - lewa dół */}
            <g>
                <ellipse cx="170" cy="72" rx="12" ry="9" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-accent">
                    <animate attributeName="opacity" values="0;0;0;0;1" dur="5s" repeatCount="indefinite" />
                </ellipse>
                <path d="M158,72 L158,85 Q170,89 182,85 L182,72" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-accent">
                    <animate attributeName="opacity" values="0;0;0;0;1" dur="5s" repeatCount="indefinite" />
                </path>
            </g>

            {/* Filiżanka 5 - lewa góra */}
            <g>
                <ellipse cx="155" cy="40" rx="12" ry="9" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-accent">
                    <animate attributeName="opacity" values="0;0;0;0;0;1" dur="5s" repeatCount="indefinite" />
                </ellipse>
                <path d="M143,40 L143,53 Q155,57 167,53 L167,40" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-accent">
                    <animate attributeName="opacity" values="0;0;0;0;0;1" dur="5s" repeatCount="indefinite" />
                </path>
            </g>

            {/* Okrąg łączący (stół cupping) */}
            <circle cx="200" cy="50" r="50" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent" opacity="0.2">
                <animate
                    attributeName="stroke-dasharray"
                    values="0 314; 314 0"
                    dur="5s"
                    repeatCount="indefinite"
                />
            </circle>

            {/* Para z filiżanek */}
            <path d="M200,20 Q202,15 200,10" stroke="currentColor" strokeWidth="2" fill="none" className="text-accent" opacity="0.3">
                <animate attributeName="opacity" values="0;0.3;0" dur="3s" begin="5s" repeatCount="indefinite" />
            </path>
        </svg>
    );
}

// Mapper dla łatwego użycia
export function TimelineAnimation({ year }) {
    switch (year) {
        case '2020':
            return <WaveAnimation />;
        case '2022':
            return <TablesAnimation />;
        case '2023':
            return <SmallRoasterAnimation />;
        case '2024':
            return <RoasteryAnimation />;
        case '2025':
            return <CuppingAnimation />;
        default:
            return null;
    }
}
