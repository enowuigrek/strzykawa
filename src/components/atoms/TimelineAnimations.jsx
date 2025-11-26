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

// 2022 - Rozbudowa i rozwój - Młotek budujący
export function HammerAnimation() {
    return (
        <svg
            className="w-full h-32 opacity-25"
            viewBox="0 0 400 100"
            preserveAspectRatio="xMidYMid meet"
        >
            <g transform="translate(200, 50)">
                {/* Młotek */}
                <g>
                    {/* Rączka młotka */}
                    <rect
                        x="-3"
                        y="0"
                        width="6"
                        height="35"
                        fill="currentColor"
                        className="text-accent"
                        opacity="0.7"
                        rx="2"
                    >
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            values="0 0 0; -25 0 0; 0 0 0"
                            dur="1.5s"
                            repeatCount="indefinite"
                        />
                    </rect>

                    {/* Główka młotka */}
                    <rect
                        x="-12"
                        y="-8"
                        width="24"
                        height="10"
                        fill="currentColor"
                        className="text-accent"
                        opacity="0.9"
                        rx="1"
                    >
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            values="0 0 0; -25 0 0; 0 0 0"
                            dur="1.5s"
                            repeatCount="indefinite"
                        />
                    </rect>

                    {/* Iskry przy uderzeniu */}
                    <g opacity="0.8">
                        {/* Iskra 1 */}
                        <circle cx="-8" cy="40" r="1.5" fill="currentColor" className="text-white">
                            <animate
                                attributeName="opacity"
                                values="0;1;0"
                                dur="1.5s"
                                keyTimes="0;0.33;0.5"
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="cx"
                                values="-8;-15;-8"
                                dur="1.5s"
                                keyTimes="0;0.5;1"
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="cy"
                                values="40;38;40"
                                dur="1.5s"
                                keyTimes="0;0.5;1"
                                repeatCount="indefinite"
                            />
                        </circle>

                        {/* Iskra 2 */}
                        <circle cx="8" cy="40" r="1.5" fill="currentColor" className="text-white">
                            <animate
                                attributeName="opacity"
                                values="0;1;0"
                                dur="1.5s"
                                keyTimes="0;0.33;0.5"
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="cx"
                                values="8;15;8"
                                dur="1.5s"
                                keyTimes="0;0.5;1"
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="cy"
                                values="40;37;40"
                                dur="1.5s"
                                keyTimes="0;0.5;1"
                                repeatCount="indefinite"
                            />
                        </circle>

                        {/* Iskra 3 */}
                        <circle cx="0" cy="40" r="1.5" fill="currentColor" className="text-white">
                            <animate
                                attributeName="opacity"
                                values="0;1;0"
                                dur="1.5s"
                                keyTimes="0;0.33;0.5"
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="cy"
                                values="40;35;40"
                                dur="1.5s"
                                keyTimes="0;0.5;1"
                                repeatCount="indefinite"
                            />
                        </circle>
                    </g>
                </g>

                {/* Podłoże/gwóźdź */}
                <rect
                    x="-15"
                    y="38"
                    width="30"
                    height="4"
                    fill="currentColor"
                    className="text-accent"
                    opacity="0.4"
                    rx="1"
                />
            </g>
        </svg>
    );
}

// 2023 - Pierwszy krok w roasting - Mały płomień
export function FlameSmallAnimation() {
    return (
        <svg
            className="w-full h-32 opacity-30"
            viewBox="0 0 400 100"
            preserveAspectRatio="xMidYMid meet"
        >
            {/* Mały płomień - bardziej realistyczny */}
            <g transform="translate(185, 10)">
                {/* Główny płomień - wysoki i spiczasty */}
                <path
                    d="M15,90 Q12,70 8,55 Q5,40 10,25 Q12,15 15,5 Q17,0 15,-5 Q13,0 11,5 Q8,15 6,25 Q2,40 5,55 Q8,70 6,90 Z"
                    fill="currentColor"
                    className="text-accent"
                    opacity="0.9"
                >
                    <animate
                        attributeName="d"
                        values="
                            M15,90 Q12,70 8,55 Q5,40 10,25 Q12,15 15,5 Q17,0 15,-5 Q13,0 11,5 Q8,15 6,25 Q2,40 5,55 Q8,70 6,90 Z;
                            M15,90 Q10,70 12,55 Q8,40 13,25 Q14,15 15,3 Q16,0 15,-8 Q14,0 13,3 Q10,15 8,25 Q6,40 10,55 Q12,70 8,90 Z;
                            M15,90 Q14,70 10,55 Q7,40 11,25 Q13,15 15,4 Q16,0 15,-6 Q14,0 12,4 Q9,15 7,25 Q4,40 8,55 Q11,70 9,90 Z;
                            M15,90 Q12,70 8,55 Q5,40 10,25 Q12,15 15,5 Q17,0 15,-5 Q13,0 11,5 Q8,15 6,25 Q2,40 5,55 Q8,70 6,90 Z
                        "
                        dur="1.5s"
                        repeatCount="indefinite"
                    />
                </path>

                {/* Jasne jądro płomienia */}
                <path
                    d="M15,70 Q13,55 11,45 Q10,35 12,25 Q13,18 15,10 Q16,18 14,25 Q12,35 13,45 Q14,55 12,70 Z"
                    fill="currentColor"
                    className="text-white"
                    opacity="0.5"
                >
                    <animate
                        attributeName="d"
                        values="
                            M15,70 Q13,55 11,45 Q10,35 12,25 Q13,18 15,10 Q16,18 14,25 Q12,35 13,45 Q14,55 12,70 Z;
                            M15,70 Q14,55 12,45 Q11,35 13,25 Q14,18 15,8 Q15,18 13,25 Q11,35 12,45 Q13,55 11,70 Z;
                            M15,70 Q13,55 11,45 Q10,35 12,25 Q13,18 15,10 Q16,18 14,25 Q12,35 13,45 Q14,55 12,70 Z
                        "
                        dur="1.5s"
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
            className="w-full h-32 opacity-30"
            viewBox="0 0 400 100"
            preserveAspectRatio="xMidYMid meet"
        >
            {/* Duży ogień - trzy płomienie */}
            {/* Lewy płomień */}
            <g transform="translate(130, 5)">
                <path
                    d="M20,95 Q17,75 13,60 Q10,45 15,30 Q17,20 20,10 Q22,5 20,0 Q18,5 16,10 Q13,20 11,30 Q6,45 9,60 Q12,75 10,95 Z"
                    fill="currentColor"
                    className="text-accent"
                    opacity="0.85"
                >
                    <animate
                        attributeName="d"
                        values="
                            M20,95 Q17,75 13,60 Q10,45 15,30 Q17,20 20,10 Q22,5 20,0 Q18,5 16,10 Q13,20 11,30 Q6,45 9,60 Q12,75 10,95 Z;
                            M20,95 Q15,75 17,60 Q13,45 18,30 Q19,20 20,8 Q21,5 20,-3 Q19,5 17,8 Q14,20 12,30 Q9,45 13,60 Q16,75 13,95 Z;
                            M20,95 Q18,75 15,60 Q12,45 16,30 Q18,20 20,9 Q21,5 20,-2 Q19,5 17,9 Q14,20 12,30 Q8,45 12,60 Q15,75 12,95 Z;
                            M20,95 Q17,75 13,60 Q10,45 15,30 Q17,20 20,10 Q22,5 20,0 Q18,5 16,10 Q13,20 11,30 Q6,45 9,60 Q12,75 10,95 Z
                        "
                        dur="1.6s"
                        repeatCount="indefinite"
                    />
                </path>
            </g>

            {/* Środkowy płomień (największy) */}
            <g transform="translate(180, 0)">
                <path
                    d="M20,100 Q17,75 12,55 Q8,40 15,25 Q18,12 20,5 Q22,0 20,-10 Q18,0 16,5 Q13,12 10,25 Q5,40 10,55 Q14,75 10,100 Z"
                    fill="currentColor"
                    className="text-accent"
                    opacity="0.95"
                >
                    <animate
                        attributeName="d"
                        values="
                            M20,100 Q17,75 12,55 Q8,40 15,25 Q18,12 20,5 Q22,0 20,-10 Q18,0 16,5 Q13,12 10,25 Q5,40 10,55 Q14,75 10,100 Z;
                            M20,100 Q14,75 16,55 Q11,40 17,25 Q19,12 20,3 Q21,0 20,-12 Q19,0 17,3 Q14,12 11,25 Q7,40 12,55 Q16,75 12,100 Z;
                            M20,100 Q16,75 14,55 Q10,40 16,25 Q18,12 20,4 Q21,0 20,-11 Q19,0 17,4 Q14,12 11,25 Q6,40 11,55 Q15,75 11,100 Z;
                            M20,100 Q17,75 12,55 Q8,40 15,25 Q18,12 20,5 Q22,0 20,-10 Q18,0 16,5 Q13,12 10,25 Q5,40 10,55 Q14,75 10,100 Z
                        "
                        dur="1.7s"
                        repeatCount="indefinite"
                    />
                </path>
                {/* Jasne jądro */}
                <path
                    d="M20,80 Q18,60 15,48 Q13,38 16,28 Q17,20 20,12 Q21,20 18,28 Q16,38 17,48 Q19,60 17,80 Z"
                    fill="currentColor"
                    className="text-white"
                    opacity="0.6"
                >
                    <animate
                        attributeName="d"
                        values="
                            M20,80 Q18,60 15,48 Q13,38 16,28 Q17,20 20,12 Q21,20 18,28 Q16,38 17,48 Q19,60 17,80 Z;
                            M20,80 Q19,60 16,48 Q14,38 17,28 Q18,20 20,10 Q20,20 17,28 Q15,38 16,48 Q18,60 16,80 Z;
                            M20,80 Q18,60 15,48 Q13,38 16,28 Q17,20 20,12 Q21,20 18,28 Q16,38 17,48 Q19,60 17,80 Z
                        "
                        dur="1.7s"
                        repeatCount="indefinite"
                    />
                </path>
            </g>

            {/* Prawy płomień */}
            <g transform="translate(230, 5)">
                <path
                    d="M20,95 Q17,75 13,60 Q10,45 15,30 Q17,20 20,10 Q22,5 20,0 Q18,5 16,10 Q13,20 11,30 Q6,45 9,60 Q12,75 10,95 Z"
                    fill="currentColor"
                    className="text-accent"
                    opacity="0.85"
                >
                    <animate
                        attributeName="d"
                        values="
                            M20,95 Q17,75 13,60 Q10,45 15,30 Q17,20 20,10 Q22,5 20,0 Q18,5 16,10 Q13,20 11,30 Q6,45 9,60 Q12,75 10,95 Z;
                            M20,95 Q18,75 15,60 Q12,45 17,30 Q18,20 20,9 Q21,5 20,-1 Q19,5 17,9 Q15,20 13,30 Q9,45 12,60 Q15,75 12,95 Z;
                            M20,95 Q16,75 14,60 Q11,45 16,30 Q18,20 20,10 Q21,5 20,1 Q19,5 17,10 Q14,20 12,30 Q8,45 11,60 Q14,75 11,95 Z;
                            M20,95 Q17,75 13,60 Q10,45 15,30 Q17,20 20,10 Q22,5 20,0 Q18,5 16,10 Q13,20 11,30 Q6,45 9,60 Q12,75 10,95 Z
                        "
                        dur="1.9s"
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
        <div className="relative w-full h-32 flex items-center justify-center">
            {/* Logo pionowe jako duże tło */}
            <div className="absolute inset-0 flex items-center justify-center opacity-15">
                <img
                    src="/logo/vertical-logo.png"
                    alt="Strzykawa Logo"
                    className="h-full w-auto object-contain"
                />
            </div>

            {/* Kubek cuppingowy z animowaną parą - na pierwszym planie */}
            <svg
                className="relative h-28 w-40 z-10"
                viewBox="0 0 120 80"
                preserveAspectRatio="xMidYMid meet"
            >
                {/* Kubek cuppingowy (szerszy niż wyższy, bez ucha) */}
                <g transform="translate(60, 40)">
                    {/* Korpus kubka - szerszy kształt */}
                    <path
                        d="M-30,15 L-25,-10 L25,-10 L30,15 Q30,20 22,24 Q11,28 0,28 Q-11,28 -22,24 Q-30,20 -30,15 Z"
                        fill="currentColor"
                        className="text-accent"
                        opacity="0.85"
                    />
                    {/* Brzeg kubka (elipsa) */}
                    <ellipse
                        cx="0"
                        cy="-10"
                        rx="25"
                        ry="5"
                        fill="currentColor"
                        className="text-accent"
                        opacity="0.9"
                    />
                    {/* Powierzchnia kawy w środku */}
                    <ellipse
                        cx="0"
                        cy="-8"
                        rx="22"
                        ry="4"
                        fill="currentColor"
                        className="text-primary-dark"
                        opacity="0.7"
                    />

                    {/* Para unosząca się - bardziej realistyczna z zawirowaniami */}
                    {/* Lewy strumień pary */}
                    <g opacity="0.7">
                        <path
                            d="M-12,-10 Q-14,-18 -12,-26 Q-10,-34 -12,-40 Q-14,-46 -11,-52"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            fill="none"
                            className="text-white"
                            strokeLinecap="round"
                        >
                            <animate
                                attributeName="opacity"
                                values="0;0.7;0.3;0"
                                dur="4s"
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="d"
                                values="
                                    M-12,-10 Q-14,-18 -12,-26 Q-10,-34 -12,-40 Q-14,-46 -11,-52;
                                    M-12,-10 Q-10,-18 -12,-26 Q-14,-34 -10,-40 Q-8,-46 -11,-52;
                                    M-12,-10 Q-15,-18 -11,-26 Q-9,-34 -13,-40 Q-15,-46 -12,-52;
                                    M-12,-10 Q-14,-18 -12,-26 Q-10,-34 -12,-40 Q-14,-46 -11,-52
                                "
                                dur="4s"
                                repeatCount="indefinite"
                            />
                        </path>
                    </g>

                    {/* Środkowy strumień pary (prawy) */}
                    <g opacity="0.7">
                        <path
                            d="M0,-10 Q3,-18 0,-26 Q-3,-34 1,-40 Q4,-46 0,-54"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            fill="none"
                            className="text-white"
                            strokeLinecap="round"
                        >
                            <animate
                                attributeName="opacity"
                                values="0;0.7;0.4;0"
                                dur="4.5s"
                                begin="1.2s"
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="d"
                                values="
                                    M0,-10 Q3,-18 0,-26 Q-3,-34 1,-40 Q4,-46 0,-54;
                                    M0,-10 Q-3,-18 1,-26 Q4,-34 0,-40 Q-2,-46 1,-54;
                                    M0,-10 Q2,-18 -1,-26 Q-4,-34 2,-40 Q5,-46 1,-54;
                                    M0,-10 Q3,-18 0,-26 Q-3,-34 1,-40 Q4,-46 0,-54
                                "
                                dur="4.5s"
                                begin="1.2s"
                                repeatCount="indefinite"
                            />
                        </path>
                    </g>

                    {/* Prawy strumień pary */}
                    <g opacity="0.7">
                        <path
                            d="M12,-10 Q15,-18 12,-26 Q9,-34 13,-40 Q16,-46 12,-53"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            fill="none"
                            className="text-white"
                            strokeLinecap="round"
                        >
                            <animate
                                attributeName="opacity"
                                values="0;0.7;0.35;0"
                                dur="4.2s"
                                begin="2.3s"
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="d"
                                values="
                                    M12,-10 Q15,-18 12,-26 Q9,-34 13,-40 Q16,-46 12,-53;
                                    M12,-10 Q9,-18 13,-26 Q16,-34 11,-40 Q8,-46 12,-53;
                                    M12,-10 Q14,-18 11,-26 Q8,-34 14,-40 Q17,-46 13,-53;
                                    M12,-10 Q15,-18 12,-26 Q9,-34 13,-40 Q16,-46 12,-53
                                "
                                dur="4.2s"
                                begin="2.3s"
                                repeatCount="indefinite"
                            />
                        </path>
                    </g>
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
            return <HammerAnimation />;
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
