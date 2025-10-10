// CoffeeOverlay.jsx
import React, { useId } from 'react';

export function CoffeeOverlay({ coffee, isOpen }) {
    // Helpery
    const getRegion = (o) => o?.map(x => x.region).filter(Boolean).join(', ') || '';
    const getFarm   = (o) => o?.map(x => x.farm).filter(Boolean).join(', ') || '';
    const getProc   = (o) => o?.map(x => x.processing).filter(Boolean)[0] || '';
    const getVar    = (o) => (o?.flatMap(x => x.variety || []) || []).filter(Boolean).join(', ');

    // Kolory naklejki wg kraju / themeColor
    const COUNTRY_COLOR = {
        Brazylia: '#1b8851', // świeża zieleń
        Kolumbia: '#F4C64E', // ciepły szafran
        Etiopia:  '#4AA3DF', // średni niebieski
        Kenia:    '#982121', // głęboki czerwony
        Peru:     '#8B6CEB', // fiołek
        Rwanda:   '#F29C52', // bursztynowy pomarańcz
    };
    const country = coffee.origin?.[0]?.country || '';
    const stickerColor = coffee.themeColor || COUNTRY_COLOR[country] || '#F1CE6A';

    const nameUpper    = (coffee.name || '').toUpperCase();
    const countryUpper = (coffee.origin?.[0]?.country || coffee.country || '').toUpperCase();

    // ID do ścieżki łuku
    const uid = useId();
    const nameArcId = `name-arc-${uid}`;

    return (
        <div
            role="dialog"
            aria-hidden={!isOpen}
            className={`
                absolute inset-0 z-10 bg-primary-light
                transition-opacity duration-150 ease-out
                ${isOpen ? 'delay-0' : 'opacity-0 delay-100'}
                pointer-events-none transition-opacity ease-out
            `}
        >
            {/* ZAWARTOŚĆ */}
            <div className="relative h-full w-full flex items-center justify-center p-3">
                {/* Duże koło — szybki zoom z prawej, działa w obie strony */}
                <div
                    className={`
                        relative rounded-full overflow-hidden
                        aspect-square
                        w-[88%] max-w-[240px] md:max-w-[240px]
                        shadow-[0_12px_24px_rgba(0,0,0,0.25)]
                        transition-transform duration-200 ease-out
                        origin-[85%_45%] transform-gpu will-change-transform
                        ${isOpen ? 'scale-100 translate-x-0 translate-y-0' : 'scale-[.22] translate-x-[12%] -translate-y-[4%]'}
                        pointer-events-auto
                    `}
                    style={{ backgroundColor: stickerColor }}
                >
                    {/* delikatny połysk */}
                    <div className="absolute -top-2 right-2 w-24 h-12 md:w-28 md:h-14 bg-white/25 rounded-full blur-md rotate-[-20deg] pointer-events-none" />

                    {/* ŁUK — kraj (jeśli jest) albo nazwa, po półokręgu WEWNĄTRZ koła */}
                    <svg
                        viewBox="0 0 160 160"
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        aria-hidden="true"
                    >
                        <defs>
                            {/* półokrąg tego samego koła, z marginesem do środka */}
                            <path id={nameArcId} d="M 20 80 A 60 60 0 0 1 140 80" />
                        </defs>
                        <text className="fill-black" style={{ fontWeight: 800, letterSpacing: '0.06em' }}>
                            <textPath
                                href={`#${nameArcId}`}
                                startOffset="50%"
                                textAnchor="middle"
                                fontSize="12"
                                lengthAdjust="spacing"
                            >
                                {countryUpper || nameUpper}
                            </textPath>
                        </text>
                    </svg>

                    {/* Treść w środku (left-align, czarny) */}
                    <div className="relative z-10 w-[78%] mx-auto mt-12 md:mt-14">
                        <dl className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 text-[16px] md:text-[16px] leading-5 text-black">
                            {getRegion(coffee.origin) && (
                                <>
                                    <dt className="font-semibold">Region:</dt>
                                    <dd>{getRegion(coffee.origin)}</dd>
                                </>
                            )}
                            {getFarm(coffee.origin) && (
                                <>
                                    <dt className="font-semibold">Farma:</dt>
                                    <dd>{getFarm(coffee.origin)}</dd>
                                </>
                            )}
                            {getProc(coffee.origin) && (
                                <>
                                    <dt className="font-semibold">Obróbka:</dt>
                                    <dd>{getProc(coffee.origin)}</dd>
                                </>
                            )}
                            {getVar(coffee.origin) && (
                                <>
                                    <dt className="font-semibold">Odmiana:</dt>
                                    <dd>{getVar(coffee.origin)}</dd>
                                </>
                            )}
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}