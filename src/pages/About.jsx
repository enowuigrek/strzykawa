import React, { useState, useEffect } from 'react';
import OpenImage from '../assets/history/z_zewnatrz.jpg';
import FirstRoaster from '../assets/history/maly_piec.jpg';
import Roastery from '../assets/history/duzy_piec.jpg';
import Branding from '../assets/history/branding.jpg';
import Branding2 from '../assets/history/branding-2.jpg';
import Branding5 from '../assets/history/branding-5.jpg';
import TeamPhoto from '../assets/history/damian_karolina.jpg';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { FaMapMarkerAlt, FaShoppingBag } from 'react-icons/fa';
import { Button } from '../components/atoms/Button';
import { PageLayout } from "../components/layout/PageLayout.jsx";
import { TimelineSection } from '../components/molecules/TimelineSection';
import { TimelineBar } from '../components/organisms/TimelineBar';
import { SCROLL_THRESHOLDS } from '../constants/timings.js';

export function About() {
    useScrollToTop();
    const [isSticky, setIsSticky] = useState(false);
    const [hideBar, setHideBar] = useState(false);
    const ctaRef = React.useRef(null);

    // Scroll detection dla TimelineBar
    useEffect(() => {
        const handleScroll = () => {
            // TimelineBar jest przypięty gdy scroll > 200px (po PageHeader)
            setIsSticky(window.scrollY > 200);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Observer dla sekcji CTA - chowa TimelineBar gdy dojedziemy do "Zapraszamy"
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setHideBar(entry.isIntersecting);
            },
            {
                threshold: 0.1, // Trigger gdy 10% sekcji widoczne
                rootMargin: '-100px 0px 0px 0px' // Offset od góry
            }
        );

        if (ctaRef.current) {
            observer.observe(ctaRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const timelineData = [
        {
            year: "2020",
            title: "Początek podróży",
            content: "Otwieramy kawiarnię na Dąbrowskiego 4 w Częstochowie. Rozpoczynamy skromnie, do tego w okresie szalejącej pandemii. Zaczynamy serwować Częstochowianom kawę wysokiej jakości z zaprzyjaźnionych Polskich palarni.",
            images: [OpenImage]
        },
        {
            year: "2022",
            title: "Rozbudowa i rozwój",
            content: "Przeprowadzamy remont w lokalu zwiększając ilość miejsc siedzących. Przystosowujemy kuchnię i zaczynamy wypiekać słodkości. To czas gdy Strzykawa staje się nie tylko kawiarnią, ale miejscem spotkań lokalnej społeczności.",
            images: [TeamPhoto]
        },
        {
            year: "2023",
            title: "Pierwszy krok w roasting",
            content: "Kupujemy mały elektryczny piec do wypalania kawy z maksymalnym zasypem 1 kg i jednocześnie wkraczamy w nowy świat. Szkolimy się w zakresie roastingu, następnie zaczynamy paczkować i sprzedawać własną kawę.",
            images: [FirstRoaster]
        },
        {
            year: "2024",
            title: "Palarnia kawy",
            content: "Kupujemy większy piec i wynajmujemy kolejny lokal kilka kilometrów za Częstochową. Przystosowujemy i tworzymy palarnię kawy.",
            images: [Roastery]
        },
        {
            year: "2025",
            title: "Nowy rozdział",
            content: "Zmieniamy branding opakowań i robimy pierwszy otwarty cupping w palarni.",
            images: [Branding, Branding2, Branding5]
        }
    ];

    const years = timelineData.map(item => item.year);

    return (
        <PageLayout
            title="O Strzykawie"
            description="Nasza historia. Poznaj drogę od małej kawiarni do palarni kawy."
        >
            {/* Timeline Bar */}
            <TimelineBar years={years} isSticky={isSticky} hide={hideBar} />

            {/* Timeline Content */}
            <div className="max-w-6xl mx-auto px-4 py-16">
                <div className="space-y-20 md:space-y-24">
                    {timelineData.map((item, index) => (
                        <TimelineSection
                            key={item.year}
                            year={item.year}
                            title={item.title}
                            content={item.content}
                            images={item.images}
                            index={index}
                        />
                    ))}
                </div>

                {/* Call to Action */}
                <div ref={ctaRef} className="mt-32">
                    <div className="bg-gradient-to-r from-primary-light/20 to-primary/30 border border-white/10 p-12 md:p-16 text-center">
                        <h2 className="text-3xl md:text-4xl text-white mb-6">
                            Zapraszamy do Strzykawy!
                        </h2>
                        <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
                            Odwiedź nas w kawiarni na Dąbrowskiego 4 lub zamów naszą kawę online
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                href="/kontakt"
                                icon={FaMapMarkerAlt}
                                variant="primary"
                                size="lg"
                            >
                                Znajdź nas
                            </Button>

                            <Button
                                href="/kawy"
                                icon={FaShoppingBag}
                                variant="secondary"
                                size="lg"
                            >
                                Zamów kawę
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
