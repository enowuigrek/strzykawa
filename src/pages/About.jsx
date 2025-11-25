import React from 'react';
import OpenImage from '../assets/history/z_zewnatrz.jpg';
import FirstRoaster from '../assets/history/maly_piec.jpg';
import Roastery from '../assets/history/duzy_piec.jpg';
import Branding from '../assets/history/branding.jpg';
import Branding2 from '../assets/history/branding-2.jpg';
import Branding5 from '../assets/history/branding-5.jpg';
import TeamPhoto from '../assets/history/damian_karolina.jpg';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { FaMapMarkerAlt, FaShoppingBag, FaCoffee, FaHeart, FaLeaf } from 'react-icons/fa';
import { Button } from '../components/atoms/Button';
import { PageLayout } from "../components/layout/PageLayout.jsx";
import { TimelineSection } from '../components/molecules/TimelineSection';
import { TimelineBar } from '../components/organisms/TimelineBar';


export function About() {
    useScrollToTop();

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

    // Extract years for TimelineBar
    const years = timelineData.map(item => item.year);

    return (
        <PageLayout
            title="O Strzykawie"
            description="Nasza historia, pasja i filozofia. Poznaj ludzi i wartości, które stoją za każdą filiżanką kawy w Strzykawie."
        >
            {/* Hero Section */}
            <div className="bg-gradient-to-b from-primary-light/40 to-primary border-b border-white/10">
                <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
                    <div className="text-center max-w-3xl mx-auto space-y-8">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                            Pasja do kawy specialty
                        </h1>
                        <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                            Od małej kawiarni w centrum Częstochowy do własnej palarni kawy.
                            Poznaj historię Strzykawy - miejsca, gdzie kawa to coś więcej niż napój.
                        </p>

                        {/* Values Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                            <div className="bg-primary/60 border border-white/10 p-6 backdrop-blur-sm">
                                <FaCoffee className="w-8 h-8 text-accent mx-auto mb-3" />
                                <h3 className="text-white font-semibold mb-2">Jakość</h3>
                                <p className="text-white/70 text-sm">
                                    Starannie wyselekcjonowane ziarna z najlepszych plantacji świata
                                </p>
                            </div>
                            <div className="bg-primary/60 border border-white/10 p-6 backdrop-blur-sm">
                                <FaHeart className="w-8 h-8 text-accent mx-auto mb-3" />
                                <h3 className="text-white font-semibold mb-2">Pasja</h3>
                                <p className="text-white/70 text-sm">
                                    Każdy etap - od wypalania po serwowanie - traktujemy z najwyższą starannością
                                </p>
                            </div>
                            <div className="bg-primary/60 border border-white/10 p-6 backdrop-blur-sm">
                                <FaLeaf className="w-8 h-8 text-accent mx-auto mb-3" />
                                <h3 className="text-white font-semibold mb-2">Zrównoważony rozwój</h3>
                                <p className="text-white/70 text-sm">
                                    Dbamy o środowisko i fair trade - kawa z szacunkiem dla ludzi i planety
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Timeline Bar */}
            <TimelineBar years={years} />

            <div className="max-w-6xl mx-auto px-4 py-16">
                {/* Section Title */}
                <div className="mb-20 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Nasza historia
                    </h2>
                    <p className="text-white/70 text-lg max-w-2xl mx-auto">
                        Pięć lat rozwoju, setki godzin szkoleń i niezliczone filiżanki kawy
                    </p>
                </div>

                {/* Timeline Sections */}
                <div className="space-y-32 md:space-y-40">
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

                {/* Team Section */}
                <div className="mt-40 mb-32">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Zespół Strzykawy
                        </h2>
                        <p className="text-white/70 text-lg max-w-2xl mx-auto">
                            Za każdą filiżanką kawy stoją ludzie z pasją
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
                        <div className="order-2 md:order-1">
                            <div className="bg-gradient-to-r from-primary-light/20 to-primary/30 border border-white/10 p-8 md:p-10 space-y-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Damian & Karolina</h3>
                                    <p className="text-accent font-medium">Założyciele Strzykawy</p>
                                </div>
                                <p className="text-white/80 leading-relaxed">
                                    Nasza przygoda z kawą zaczęła się od fascynacji specialty coffee
                                    i chęci dzielenia się tą pasją z innymi. Dziś prowadzimy nie tylko
                                    kawiarnię, ale także własną palarnię, gdzie każdego dnia tworzymy
                                    coś wyjątkowego.
                                </p>
                                <p className="text-white/80 leading-relaxed">
                                    Wierzymy, że dobra kawa to efekt pracy wielu ludzi - od farmerów,
                                    przez roasterów, aż po baristów. Nasza rola to połączenie tych
                                    wszystkich ogniw z szacunkiem i pasją.
                                </p>
                            </div>
                        </div>
                        <div className="order-1 md:order-2">
                            <div className="aspect-[4/3] bg-gradient-to-br from-primary-light/30 to-primary/50 border border-white/10 overflow-hidden shadow-lg">
                                <img
                                    src={TeamPhoto}
                                    alt="Damian i Karolina - Założyciele Strzykawy"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="mt-32">
                    <div className="bg-gradient-to-r from-primary-light/20 to-primary/30 border border-white/10 p-12 md:p-16 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
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
