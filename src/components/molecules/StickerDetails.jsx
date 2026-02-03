import React from "react";

/**
 * StickerDetails — okrągła „naklejka” z tytułem po łuku i lewym wyrównaniem treści
 *
 * Props:
 * - title: np. "KOLUMBIA"
 * - subtitle: np. "Santa Maria"
 * - items: [{ label: "Region", value: "Huila" }, ...]
 * - accent (opc.): kolor naklejki Tailwinda, np. 'amber-400'
 * - rotate (opc.): kąt obrotu (string), np. 'rotate-[45deg]'
 */
export function StickerDetails({
                                   title = "",
                                   subtitle = "",
                                   items = [],
                                   accent = "amber-400",
                                   rotate = "",
                                   className = "",
                               }) {
    // rozmiar i geometria sticker’a
    // viewBox 160x160, promień ~68, łuk tytułu y≈40
    const pathId = "sticker-arc";
    return (
        <div
            className={[
                "relative mx-auto",
                "w-56 h-56 md:w-64 md:h-64",
                "flex items-center justify-center",
                rotate,
                className,
            ].join(" ")}
            aria-label={`${title} ${subtitle}`}
        >
            {/* Koło naklejki */}
            <div className={`absolute inset-0 rounded-full bg-${accent} shadow-[0_12px_24px_rgba(0,0,0,0.35)]`} />

            {/* Połysk */}
            <div className="absolute -top-2 left-2 w-28 h-14 md:w-32 md:h-16 bg-white/25 rounded-full blur-md rotate-[-20deg] pointer-events-none" />

            {/* Obrys (subtelny) */}
            <div className="absolute inset-0 rounded-full ring-1 ring-black/10" />

            {/* SVG tytuł po łuku */}
            <svg
                viewBox="0 0 160 160"
                className="absolute inset-0 w-full h-full pointer-events-none"
                aria-hidden="true"
            >
                <defs>
                    <path id={pathId} d="M 20 80 A 60 60 0 0 1 140 80" />
                </defs>
                <text
                    className="fill-black"
                    style={{ fontWeight: 800, letterSpacing: "0.06em" }}
                >
                    <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle" fontSize="20">
                        {title}
                    </textPath>
                </text>
                {/* Pod-tytuł pod łukiem */}
                {subtitle && (
                    <text x="80" y="70" textAnchor="middle" className="fill-black/80" fontSize="14">
                        {subtitle}
                    </text>
                )}
            </svg>

            {/* Wnętrze z treścią (lewe wyrównanie, ale całość wycentrowana) */}
            <div className="relative z-10 w-[75%] mt-16">
                <dl className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 text-[13px] leading-5">
                    {items.map(({ label, value }, i) => (
                        <React.Fragment key={i}>
                            <dt className="font-medium text-black/80">{label}:</dt>
                            <dd className="text-black">{value}</dd>
                        </React.Fragment>
                    ))}
                </dl>
            </div>
        </div>
    );
}