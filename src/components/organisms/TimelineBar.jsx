import React, { useState, useEffect, useRef } from 'react';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
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
export function TimelineBar({ years = [], isSticky = false }) {
    const activeYear = useTimelineScroll(years);
    const activeIndex = years.indexOf(activeYear);

    const scrollerRef = useRef(null);
    const [canLeft, setCanLeft] = useState(false);
    const [canRight, setCanRight] = useState(false);

    const updateScrollHints = () => {
        const el = scrollerRef.current;
        if (!el) return;
        const { scrollLeft, scrollWidth, clientWidth } = el;
        setCanLeft(scrollLeft > 0);
        setCanRight(scrollLeft + clientWidth < scrollWidth - 1);
    };

    useEffect(() => {
        updateScrollHints();
        const el = scrollerRef.current;
        if (!el) return;

        el.addEventListener('scroll', updateScrollHints);
        window.addEventListener('resize', updateScrollHints);

        return () => {
            el.removeEventListener('scroll', updateScrollHints);
            window.removeEventListener('resize', updateScrollHints);
        };
    }, [years]);

    const handleYearClick = (year) => {
        const element = document.getElementById(`year-${year}`);
        if (element) {
            const offset = 80; // Offset for sticky bar
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
            sticky
            top-0
            z-50
            ${isSticky ? 'bg-primary-dark backdrop-blur-md shadow-2xl shadow-black/50' : 'bg-primary-light'}
            transition-all
            duration-500
            h-[100px]
        `}>
            <div className="max-w-6xl mx-auto px-4 h-full flex items-center">
                {/* Timeline Container - Horizontal scroll on mobile */}
                <div className="relative w-full">
                    {canLeft && (
                        <div className={`absolute left-0 top-0 bottom-0 w-10 ${isSticky ? 'bg-gradient-to-r from-primary-dark to-transparent' : 'bg-gradient-to-r from-primary-light to-transparent'} pointer-events-none md:hidden z-10`} />
                    )}
                    {canRight && (
                        <div className={`absolute right-0 top-0 bottom-0 w-10 ${isSticky ? 'bg-gradient-to-l from-primary-dark to-transparent' : 'bg-gradient-to-l from-primary-light to-transparent'} pointer-events-none md:hidden z-10`} />
                    )}

                    <div
                        ref={scrollerRef}
                        className="overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 select-none"
                    >
                        <div className="flex items-center justify-start md:justify-center gap-2 min-w-max md:min-w-0 cursor-grab active:cursor-grabbing">
                            {years.map((year, index) => (
                                <React.Fragment key={year}>
                                    <button
                                        onClick={() => handleYearClick(year)}
                                        className={`
              relative px-4 py-2 whitespace-nowrap transition-all duration-300
              ${activeYear === year
                                            ? 'text-white scale-150'
                                            : 'text-white/60 hover:text-white/90'}
            `}
                                    >
                                        <span className="text-lg md:text-xl">{year}</span>
                                        {activeYear === year && (
                                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-accent rounded-full" />
                                        )}
                                    </button>

                                    {index < years.length - 1 && (
                                        <div className="relative h-[2px] w-12 md:w-16 bg-white/20">
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

                    {/* Left scroll hint */}
                    {canLeft && (
                        <div className={`absolute left-4 -bottom-2 md:hidden text-white/70 ${isSticky ? 'bg-primary-dark/60' : 'bg-primary-light/60'} rounded-full p-[2px] drop-shadow-[0_0_6px_rgba(0,0,0,0.4)] animate-pulse`}>
                            <FaAngleLeft className="w-4 h-4" />
                        </div>
                    )}

                    {/* Right scroll hint */}
                    {canRight && (
                        <div className={`absolute right-4 -bottom-2 md:hidden text-white/70 ${isSticky ? 'bg-primary-dark/60' : 'bg-primary-light/60'} rounded-full p-[2px] drop-shadow-[0_0_6px_rgba(0,0,0,0.4)] animate-pulse`}>
                            <FaAngleRight className="w-4 h-4" />
                        </div>
                    )}
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