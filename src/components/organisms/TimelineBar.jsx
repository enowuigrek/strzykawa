import React, { useState, useEffect } from 'react';
/**
 * useTimelineScroll - Custom hook for detecting active timeline section
 * @param {string[]} years - Array of years to track
 * @returns {string} activeYear - Currently visible year
 */
function useTimelineScroll(years) {
    const [activeYear, setActiveYear] = useState(years[0]);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px', // Trigger when section is ~20% from top
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const year = entry.target.id.replace('year-', '');
                    setActiveYear(year);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Observe all year sections
        years.forEach((year) => {
            const element = document.getElementById(`year-${year}`);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [years]);

    return activeYear;
}

/**
 * TimelineBar - Sticky navigation bar for timeline sections
 *
 * @param {Array} years - Array of years/dates to display
 */
export function TimelineBar({ years = [], isSticky = false, hide = false }) {
    const activeYear = useTimelineScroll(years);
    const activeIndex = years.indexOf(activeYear);

    const handleYearClick = (year) => {
        const element = document.getElementById(`year-${year}`);
        if (element) {
            const offset = 200; // Offset for sticky bar (bar height ~120px + extra padding)
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    // Calculate progress percentage
    const progressPercentage = years.length > 1
        ? (activeIndex / (years.length - 1)) * 100
        : 0;

    return (
        <div className={`
            hidden md:block
            sticky
            top-0
            z-50
            ${isSticky ? 'bg-primary-dark backdrop-blur-md shadow-2xl shadow-black/50' : 'bg-primary-light'}
            transition-all
            duration-500
            h-[100px]
            lg:h-[120px]
            ${hide ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}
        `}>
            <div className="max-w-6xl mx-auto px-4 h-full flex items-center">
                {/* Timeline Container */}
                <div className="relative w-full flex justify-start md:justify-center">
                    <div className="w-full max-w-[85%] md:max-w-none overflow-hidden md:overflow-visible">
                        <div className="flex items-center justify-start md:justify-center gap-1 md:gap-2">
                            {years.map((year, index) => (
                                <React.Fragment key={year}>
                                    <button
                                        onClick={() => handleYearClick(year)}
                                        className={`
                                            px-3 md:px-4 py-2 whitespace-nowrap transition-all duration-300
                                            ${activeYear === year
                                                ? 'text-white scale-125 md:scale-150'
                                                : 'text-white/60 hover:text-white/90'}
                                        `}
                                    >
                                        <span className="text-base md:text-lg md:text-xl">{year}</span>
                                    </button>

                                    {index < years.length - 1 && (
                                        <div className="relative h-[2px] w-8 md:w-12 md:w-16 bg-white/20">
                                            <div
                                                className="absolute top-0 left-0 h-full bg-accent transition-all duration-500"
                                                style={{
                                                    width:
                                                        index < activeIndex
                                                            ? '100%'
                                                            : index === activeIndex
                                                                ? `${(
                                                                    progressPercentage -
                                                                    (activeIndex * 100) / (years.length - 1)
                                                                ) * (years.length - 1)}%`
                                                                : '0%',
                                                }}
                                            />
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Demo Component
export function TimelineBarExample() {
const years = ["2020", "2022", "2023", "2024", "2025"];

    return (
        <div className="min-h-screen bg-primary">
            <TimelineBar years={years} />

            {/* Demo sections */}
            <div className="max-w-6xl mx-auto px-4 py-8 space-y-96">
                {years.map((year) => (
                    <section
                        key={year}
                        id={`year-${year}`}
                        className="scroll-mt-32 min-h-[400px] border border-white/20 p-8"
                    >
                        <h2 className="text-4xl text-white mb-4">{year}</h2>
                        <p className="text-white/70 text-lg">
                            Scroll down to see the timeline bar update automatically.
                            Click on years in the bar to jump to sections.
                        </p>
                    </section>
                ))}
            </div>
        </div>
    );
}