import React, { useState, useEffect } from 'react';
// 2020
import OpenImage from '../assets/history/z_zewnatrz.jpg';
// 2022
import Cafe2022Latte    from '../assets/history/2022-barrista-latte-art.jpg';
import Cafe2022Espresso from '../assets/history/2022-ekspres-espresso.jpg';
import Cafe2022Wypieki  from '../assets/history/2022-wypieki.jpg';
import Cafe2022Zespol   from '../assets/history/2022-zespol.jpg';
import Cafe2022Piec     from '../assets/history/2022-piec-kawowy.jpg';
// 2023
import Roast2023Panel   from '../assets/history/2023-panel-pieca.jpg';
// 2024
import Roast2024Ziarna  from '../assets/history/2024-wypalanie-ziaren.jpg';
import Roast2024Profil  from '../assets/history/2024-piec-profil-wypalania.jpg';
import Roast2024Bebno   from '../assets/history/2024-ziarna-z-bebna.jpg';
import Roast2024Palacz  from '../assets/history/2024-palacz-przy-piecu.jpg';
// 2025
import Brand2025Kolumbia from '../assets/history/2025-opakowanie-kolumbia.jpg';
import Brand2025Kawa     from '../assets/history/2025-opakowanie-z-kawa.jpg';
import Brand2025Cupping  from '../assets/history/2025-cupping.jpg';
import Brand2025Zespol   from '../assets/history/2025-zespol-palarnia.jpg';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { FaMapMarkerAlt, FaShoppingBag } from 'react-icons/fa';
import { Button } from '../components/atoms/Button';
import { PageLayout } from "../components/layout/PageLayout.jsx";
import { TimelineSection } from '../components/molecules/TimelineSection';
import { TimelineBar } from '../components/organisms/TimelineBar';

export function About() {
    useScrollToTop();
    const [hideBar, setHideBar] = useState(false);
    const ctaRef = React.useRef(null);

    // Ukrywanie paska gdy dojedziemy do sekcji CTA
    useEffect(() => {
        const handleScroll = () => {
            if (ctaRef.current) {
                const ctaTop = ctaRef.current.offsetTop;
                const scrollPosition = window.scrollY + window.innerHeight / 2;

                // Chowaj gdy jesteśmy w okolicy CTA (300px przed)
                setHideBar(scrollPosition >= ctaTop - 300);
            }
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
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
            images: [Cafe2022Latte, Cafe2022Espresso, Cafe2022Wypieki, Cafe2022Zespol, Cafe2022Piec]
        },
        {
            year: "2023",
            title: "Zaczynamy wypalać",
            content: "Kupujemy mały elektryczny piec do wypalania kawy z maksymalnym zasypem 1 kg i jednocześnie wkraczamy w nowy świat. Szkolimy się w zakresie roastingu, następnie zaczynamy paczkować i sprzedawać własną kawę.",
            images: [Roast2023Panel]
        },
        {
            year: "2024",
            title: "Palarnia kawy",
            content: "Kupujemy większy piec i wynajmujemy kolejny lokal kilka kilometrów za Częstochową. Przystosowujemy i tworzymy palarnię kawy.",
            images: [Roast2024Ziarna, Roast2024Profil, Roast2024Bebno, Roast2024Palacz]
        },
        {
            year: "2025",
            title: "Nowy rozdział",
            content: "Zmieniamy branding opakowań i robimy pierwszy otwarty cupping w palarni.",
            images: [Brand2025Kolumbia, Brand2025Kawa, Brand2025Cupping, Brand2025Zespol]
        }
    ];

    const years = timelineData.map(item => item.year);

    return (
        <PageLayout
            title="O Strzykawie"
            description="Nasza historia. Poznaj drogę od małej kawiarni do palarni kawy."
        >
            {/* Timeline Bar */}
            <TimelineBar years={years} hide={hideBar} />

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
                <div ref={ctaRef} className="mt-16">
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
