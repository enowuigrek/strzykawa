import React from 'react';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { FaMapMarkerAlt, FaShoppingBag } from 'react-icons/fa';
import { UniversalButton } from '../components/UniversalButton';
import { PageLayout } from '../components/PageLayout.jsx';
import { TimelineSection } from '../components/molecules/TimelineSection';

export function About() {
    useScrollToTop();

    const timelineData = [
        {
            year: "2020",
            title: "Początek podróży",
            content: "Otwieramy kawiarnię na Dąbrowskiego 4 w Częstochowie. Rozpoczynamy skromnie, do tego w okresie szalejącej pandemii. Zaczynamy serwować Częstochowianom kawę wysokiej jakości z zaprzyjaźnionych Polskich palarni.",
            images: [
                "https://placehold.co/600x400/232323/ffffff?text=2020+-+Otwarcie"
            ]
        },
        {
            year: "2022",
            title: "Rozbudowa i rozwój",
            content: "Przeprowadzamy remont w lokalu zwiększając ilość miejsc siedzących. Przystosowujemy kuchnię i zaczynamy wypiekać słodkości.",
            images: [
                "https://placehold.co/600x400/232323/ffffff?text=2022+-+Remont"
            ]
        },
        {
            year: "2023",
            title: "Pierwszy krok w roasting",
            content: "Kupujemy mały elektryczny piec do wypalania kawy z maksymalnym zasypem 1 kg i jednocześnie wkraczamy w nowy świat. Szkolimy się w zakresie roastingu, następnie zaczynamy paczkować i sprzedawać własną kawę.",
            images: [
                "https://placehold.co/600x400/232323/ffffff?text=2023+-+Pierwszy+piec"
            ]
        },
        {
            year: "2024",
            title: "Palarnia kawy",
            content: "Kupujemy większy piec i wynajmujemy kolejny lokal kilka kilometrów za Częstochową. Przystosowujemy i tworzymy palarnię kawy.",
            images: [
                "https://placehold.co/600x400/232323/ffffff?text=2024+-+Palarnia"
            ]
        },
        {
            year: "2025",
            title: "Nowy rozdział",
            content: "Zmieniamy branding opakowań i robimy pierwszy otwarty cupping w palarni.",
            images: [
                "https://placehold.co/600x400/232323/ffffff?text=2025+-+Branding"
            ]
        }
    ];

    return (
        <PageLayout
            title="O Strzykawie"
            description="Nasza historia, pasja i filozofia. Poznaj ludzi i wartości, które stoją za każdą filiżanką kawy w Strzykawie."
        >
            <div className="max-w-6xl mx-auto">
                {/* Page Title */}
                <div className="mb-16 text-center">
                    <h2 className="text-3xl md:text-4xl text-white">
                        Nasza historia
                    </h2>
                </div>

                {/* Timeline Sections */}
                <div className="container mx-auto max-w-7xl px-4 mt-8">
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
                <div className="text-center mt-16">
                    <div className="bg-gradient-to-r from-primary-light/20 to-primary/30 border border-white/10 p-8 md:p-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                            Zapraszamy do Strzykawy!
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <UniversalButton
                                href="/kontakt"
                                icon={FaMapMarkerAlt}
                                variant="primary"
                                size="lg"
                            >
                                Znajdź nas
                            </UniversalButton>

                            <UniversalButton
                                href="/kawy"
                                icon={FaShoppingBag}
                                variant="secondary"
                                size="lg"
                            >
                                Zamów kawę
                            </UniversalButton>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}