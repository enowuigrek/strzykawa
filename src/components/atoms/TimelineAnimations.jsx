import React from 'react';

/**
 * TimelineAnimations - Delikatne SVG animacje dla timeline sections
 * Każdy rok ma swoją unikalną animację nawiązującą do treści
 */

// 2020 - Początek podróży - Fale kawy (ZACHOWANE - user lubi!)
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

// 2022 - Rozbudowa i rozwój - Stoliki/miejsca siedzące pojawiające się
export function TablesAnimation() {
    return (
        <svg
            className="w-full h-32 opacity-15"
            viewBox="0 0 400 100"
            preserveAspectRatio="xMidYMid meet"
        >
            {/* Stolik 1 - lewa strona */}
            <g>
                <rect x="60" y="60" width="40" height="4" fill="currentColor" className="text-accent">
                    <animate
                        attributeName="opacity"
                        values="0;1;1"
                        dur="6s"
                        begin="0s"
                        repeatCount="indefinite"
                    />
                </rect>
                <rect x="64" y="64" width="4" height="20" fill="currentColor" className="text-accent">
                    <animate
                        attributeName="opacity"
                        values="0;1;1"
                        dur="6s"
                        begin="0s"
                        repeatCount="indefinite"
                    />
                </rect>
                <rect x="92" y="64" width="4" height="20" fill="currentColor" className="text-accent">
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
                <rect x="180" y="50" width="40" height="4" fill="currentColor" className="text-accent">
                    <animate
                        attributeName="opacity"
                        values="0;0;1;1"
                        dur="6s"
                        begin="0s"
                        repeatCount="indefinite"
                    />
                </rect>
                <rect x="184" y="54" width="4" height="30" fill="currentColor" className="text-accent">
                    <animate
                        attributeName="opacity"
                        values="0;0;1;1"
                        dur="6s"
                        begin="0s"
                        repeatCount="indefinite"
                    />
                </rect>
                <rect x="212" y="54" width="4" height="30" fill="currentColor" className="text-accent">
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
                <rect x="300" y="55" width="40" height="4" fill="currentColor" className="text-accent">
                    <animate
                        attributeName="opacity"
                        values="0;0;0;1"
                        dur="6s"
                        begin="0s"
                        repeatCount="indefinite"
                    />
                </rect>
                <rect x="304" y="59" width="4" height="25" fill="currentColor" className="text-accent">
                    <animate
                        attributeName="opacity"
                        values="0;0;0;1"
                        dur="6s"
                        begin="0s"
                        repeatCount="indefinite"
                    />
                </rect>
                <rect x="332" y="59" width="4" height="25" fill="currentColor" className="text-accent">
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
            <circle cx="70" cy="50" r="3" fill="currentColor" className="text-accent">
                <animate attributeName="opacity" values="0;0;1" dur="6s" repeatCount="indefinite" />
            </circle>
            <circle cx="90" cy="50" r="3" fill="currentColor" className="text-accent">
                <animate attributeName="opacity" values="0;0;1" dur="6s" repeatCount="indefinite" />
            </circle>
            <circle cx="190" cy="40" r="3" fill="currentColor" className="text-accent">
                <animate attributeName="opacity" values="0;0;0;1" dur="6s" repeatCount="indefinite" />
            </circle>
            <circle cx="210" cy="40" r="3" fill="currentColor" className="text-accent">
                <animate attributeName="opacity" values="0;0;0;1" dur="6s" repeatCount="indefinite" />
            </circle>
            <circle cx="310" cy="45" r="3" fill="currentColor" className="text-accent">
                <animate attributeName="opacity" values="0;0;0;0;1" dur="6s" repeatCount="indefinite" />
            </circle>
            <circle cx="330" cy="45" r="3" fill="currentColor" className="text-accent">
                <animate attributeName="opacity" values="0;0;0;0;1" dur="6s" repeatCount="indefinite" />
            </circle>
        </svg>
    );
}

// 2023 - Pierwszy krok w roasting - Ziarna wpadające do małego pieca
export function SmallRoasterAnimation() {
    return (
        <svg
            className="w-full h-32 opacity-20"
            viewBox="0 0 400 100"
            preserveAspectRatio="xMidYMid meet"
        >
            {/* Mały piec - prostokąt z otworem na górze */}
            <rect x="170" y="50" width="60" height="40" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent" />
            <rect x="175" y="45" width="50" height="5" fill="currentColor" className="text-accent" opacity="0.3" />

            {/* Ziarna wpadające (kropki spadające w loop) */}
            <circle cx="200" cy="10" r="3" fill="currentColor" className="text-accent">
                <animate
                    attributeName="cy"
                    values="10;45;45;10"
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
            <circle cx="195" cy="10" r="3" fill="currentColor" className="text-accent">
                <animate
                    attributeName="cy"
                    values="10;45;45;10"
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
            <circle cx="205" cy="10" r="3" fill="currentColor" className="text-accent">
                <animate
                    attributeName="cy"
                    values="10;45;45;10"
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
                d="M180,50 Q185,45 190,50"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                className="text-accent"
                opacity="0.4"
            >
                <animate
                    attributeName="d"
                    values="
                        M180,50 Q185,45 190,50;
                        M180,50 Q185,48 190,50;
                        M180,50 Q185,45 190,50
                    "
                    dur="2s"
                    repeatCount="indefinite"
                />
            </path>
            <path
                d="M210,50 Q215,45 220,50"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                className="text-accent"
                opacity="0.4"
            >
                <animate
                    attributeName="d"
                    values="
                        M210,50 Q215,45 220,50;
                        M210,50 Q215,48 220,50;
                        M210,50 Q215,45 220,50
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
            className="w-full h-32 opacity-15"
            viewBox="0 0 400 100"
            preserveAspectRatio="xMidYMid meet"
        >
            {/* Budynek palarni - buduje się od dołu */}
            <rect x="140" y="40" width="120" height="50" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                <animate
                    attributeName="height"
                    values="0;50"
                    dur="4s"
                    repeatCount="indefinite"
                />
                <animate
                    attributeName="y"
                    values="90;40"
                    dur="4s"
                    repeatCount="indefinite"
                />
            </rect>

            {/* Dach */}
            <polygon points="135,40 200,20 265,40" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                <animate
                    attributeName="opacity"
                    values="0;0;0;1"
                    dur="4s"
                    repeatCount="indefinite"
                />
            </polygon>

            {/* Okna pojawiające się */}
            <rect x="160" y="55" width="20" height="15" fill="currentColor" className="text-accent" opacity="0.3">
                <animate
                    attributeName="opacity"
                    values="0;0;0.3"
                    dur="4s"
                    repeatCount="indefinite"
                />
            </rect>
            <rect x="190" y="55" width="20" height="15" fill="currentColor" className="text-accent" opacity="0.3">
                <animate
                    attributeName="opacity"
                    values="0;0;0;0.3"
                    dur="4s"
                    repeatCount="indefinite"
                />
            </rect>
            <rect x="220" y="55" width="20" height="15" fill="currentColor" className="text-accent" opacity="0.3">
                <animate
                    attributeName="opacity"
                    values="0;0;0;0;0.3"
                    dur="4s"
                    repeatCount="indefinite"
                />
            </rect>

            {/* Dym z komina */}
            <circle cx="200" cy="15" r="4" fill="currentColor" className="text-accent">
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
            className="w-full h-32 opacity-15"
            viewBox="0 0 400 100"
            preserveAspectRatio="xMidYMid meet"
        >
            {/* Filiżanki w okręgu (5 filiżanek - jak na cupping) */}

            {/* Filiżanka 1 - góra */}
            <g>
                <ellipse cx="200" cy="25" rx="8" ry="6" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
                    <animate attributeName="opacity" values="0;1" dur="5s" repeatCount="indefinite" />
                </ellipse>
                <path d="M192,25 L192,35 Q200,38 208,35 L208,25" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
                    <animate attributeName="opacity" values="0;1" dur="5s" repeatCount="indefinite" />
                </path>
            </g>

            {/* Filiżanka 2 - prawa góra */}
            <g>
                <ellipse cx="240" cy="40" rx="8" ry="6" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
                    <animate attributeName="opacity" values="0;0;1" dur="5s" repeatCount="indefinite" />
                </ellipse>
                <path d="M232,40 L232,50 Q240,53 248,50 L248,40" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
                    <animate attributeName="opacity" values="0;0;1" dur="5s" repeatCount="indefinite" />
                </path>
            </g>

            {/* Filiżanka 3 - prawa dół */}
            <g>
                <ellipse cx="230" cy="70" rx="8" ry="6" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
                    <animate attributeName="opacity" values="0;0;0;1" dur="5s" repeatCount="indefinite" />
                </ellipse>
                <path d="M222,70 L222,80 Q230,83 238,80 L238,70" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
                    <animate attributeName="opacity" values="0;0;0;1" dur="5s" repeatCount="indefinite" />
                </path>
            </g>

            {/* Filiżanka 4 - lewa dół */}
            <g>
                <ellipse cx="170" cy="70" rx="8" ry="6" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
                    <animate attributeName="opacity" values="0;0;0;0;1" dur="5s" repeatCount="indefinite" />
                </ellipse>
                <path d="M162,70 L162,80 Q170,83 178,80 L178,70" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
                    <animate attributeName="opacity" values="0;0;0;0;1" dur="5s" repeatCount="indefinite" />
                </path>
            </g>

            {/* Filiżanka 5 - lewa góra */}
            <g>
                <ellipse cx="160" cy="40" rx="8" ry="6" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
                    <animate attributeName="opacity" values="0;0;0;0;0;1" dur="5s" repeatCount="indefinite" />
                </ellipse>
                <path d="M152,40 L152,50 Q160,53 168,50 L168,40" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
                    <animate attributeName="opacity" values="0;0;0;0;0;1" dur="5s" repeatCount="indefinite" />
                </path>
            </g>

            {/* Okrąg łączący (stół cupping) */}
            <circle cx="200" cy="50" r="50" fill="none" stroke="currentColor" strokeWidth="1" className="text-accent" opacity="0.2">
                <animate
                    attributeName="stroke-dasharray"
                    values="0 314; 314 0"
                    dur="5s"
                    repeatCount="indefinite"
                />
            </circle>

            {/* Para z filiżanek */}
            <path d="M200,20 Q202,15 200,10" stroke="currentColor" strokeWidth="1" fill="none" className="text-accent" opacity="0.3">
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
