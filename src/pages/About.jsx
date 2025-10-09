import React, { useState, useEffect } from 'react';
import { PageHeader } from '../components/PageHeader';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { FaMapMarkerAlt, FaShoppingBag } from 'react-icons/fa';
import { UniversalButton } from '../components/UniversalButton';
import {PageLayout} from "../components/PageLayout.jsx";

function About() {
    useScrollToTop();

    const [activeYear, setActiveYear] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    const timelineData = [
        {
            year: "2020",
            title: "Początek podróży",
            content: "Otwieramy kawiarnię na Dąbrowskiego 4 w Częstochowie. Rozpoczynamy skromnie, do tego w okresie szalejącej pandemii. Zaczynamy serwować Częstochowianom kawę wysokiej jakości z zaprzyjaźnionych Polskich palarni.",
            image: "https://via.placeholder.com/600x400/2d1b2e/ffffff?text=2020+-+Otwarcie"
        },
        {
            year: "2022",
            title: "Rozbudowa i rozwój",
            content: "Przeprowadzamy remont w lokalu zwiększając ilość miejsc siedzących. Przystosowujemy kuchnię i zaczynamy wypiekać słodkości.",
            image: "https://via.placeholder.com/600x400/2d1b2e/ffffff?text=2022+-+Remont"
        },
        {
            year: "2023",
            title: "Pierwszy krok w roasting",
            content: "Kupujemy mały elektryczny piec do wypalania kawy z maksymalnym zasypem 1 kg i jednocześnie wkraczamy w nowy świat. Szkolimy się w zakresie roastingu, następnie zaczynamy paczkować i sprzedawać własną kawę.",
            image: "https://via.placeholder.com/600x400/2d1b2e/ffffff?text=2023+-+Pierwszy+piec"
        },
        {
            year: "2024",
            title: "Palarnia kawy",
            content: "Kupujemy większy piec i wynajmujemy kolejny lokal kilka kilometrów za Częstochową. Przystosowujemy i tworzymy palarnię kawy.",
            image: "https://via.placeholder.com/600x400/2d1b2e/ffffff?text=2024+-+Palarnia"
        },
        {
            year: "2025",
            title: "Nowy rozdział",
            content: "Zmieniamy branding opakowań i robimy pierwszy otwarty cupping w palarni.",
            image: "https://via.placeholder.com/600x400/2d1b2e/ffffff?text=2025+-+Branding"
        }
    ];

    useEffect(() => {
        setIsVisible(true);
        const interval = setInterval(() => {
            setActiveYear((prev) => (prev + 1) % timelineData.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
    <PageLayout
        title="O Strzykawie"
        description="Nasza historia, pasja i filozofia. Poznaj ludzi i wartości, które stoją za każdą filiżanką kawy w Strzykawie."
    >

        <div className="max-w-6xl mx-auto">
            {/* Timeline Section */}
            <div className="mb-20">
                <h2 className="text-3xl md:text-4xl text-white text-center mb-16">
                    Nasza historia
                </h2>

                {/* Timeline Navigation */}
                <div className="flex flex-col md:flex-row justify-center items-center mb-12 space-y-4 md:space-y-0 md:space-x-8">
                    {timelineData.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveYear(index)}
                            className={`relative px-6 py-3 border transition-all duration-300 ${
                                activeYear === index
                                    ? 'border-accent text-accent bg-accent/10'
                                    : 'border-white/20 text-white/70 hover:border-white/40 hover:text-white'
                            }`}
                        >
                            <span className="text-xl font-bold">{item.year}</span>
                            {activeYear === index && (
                                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-accent"></div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Timeline Content */}
                <div className="relative min-h-[400px]">
                    {timelineData.map((item, index) => (
                        <div
                            key={index}
                            className={`transition-all duration-500 ${
                                activeYear === index
                                    ? 'opacity-100 transform translate-y-0'
                                    : 'opacity-0 transform translate-y-8 absolute inset-0 pointer-events-none'
                            }`}
                        >
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                {/* Image */}
                                <div className="order-2 md:order-1">
                                    <div className="aspect-[4/3] bg-gradient-to-br from-primary-light/30 to-primary/50 border border-white/10 overflow-hidden shadow-lg">
                                        <img
                                            src={item.image}
                                            alt={`Strzykawa ${item.year}`}
                                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                        />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="order-1 md:order-2 space-y-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="text-4xl md:text-5xl font-bold text-accent/30">
                                            {item.year}
                                        </div>
                                        <div>
                                            <h3 className="text-xl md:text-2xl font-bold text-white">
                                                {item.title}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-primary-light/20 to-primary/30 border border-white/10 p-8">
                                        <p className="text-lg text-white/90 leading-relaxed">
                                            {item.content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Progress Bar */}
                <div className="mt-12 flex justify-center">
                    <div className="w-full max-w-md bg-white/10 h-1">
                        <div
                            className="bg-accent h-full transition-all duration-300"
                            style={{ width: `${((activeYear + 1) / timelineData.length) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* Navigation Dots */}
                <div className="flex justify-center space-x-2 mt-6">
                    {timelineData.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveYear(index)}
                            className={`w-3 h-3 border transition-all duration-300 ${
                                activeYear === index
                                    ? 'bg-accent border-accent'
                                    : 'border-white/40 hover:border-white/70'
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* Current State Section */}
            {/*<div className="mb-20">*/}
            {/*    <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">*/}
            {/*        Strzykawa dziś*/}
            {/*    </h2>*/}

            {/*    <div className="grid md:grid-cols-2 gap-12 items-center">*/}
            {/*        <div className="aspect-[16/9] bg-gradient-to-br from-primary-light/30 to-primary/50 border border-white/10 overflow-hidden shadow-lg">*/}
            {/*            <img*/}
            {/*                src="https://via.placeholder.com/800x450/2d1b2e/ffffff?text=Strzykawa+Dzis"*/}
            {/*                alt="Strzykawa dziś"*/}
            {/*                className="w-full h-full object-cover"*/}
            {/*            />*/}
            {/*        </div>*/}

            {/*        <div className="space-y-6">*/}
            {/*            <div className="bg-gradient-to-r from-muted/10 to-accent/10 border border-white/10 p-8">*/}
            {/*                <h3 className="text-xl font-bold text-white mb-4">Nasza filozofia</h3>*/}
            {/*                <p className="text-white/90 leading-relaxed mb-4">*/}
            {/*                    Każde ziarno ma swoją historię. Od farmy przez palarnię aż do Twojej filiżanki.*/}
            {/*                    Dbamy o każdy etap tej podróży, żeby kawa nie była tylko napojem, ale doświadczeniem.*/}
            {/*                </p>*/}
            {/*                <p className="text-lg text-white font-medium leading-relaxed">*/}
            {/*                    Tu nie chodziło tylko o kawę – <span className="text-accent font-bold">to miejsce, w którym ludzie się poznawali,*/}
            {/*                    rodziły się znajomości i powstawała społeczność</span>. Strzykawa stała się czymś więcej niż kawiarnią –*/}
            {/*                    miejscem spotkań i wymiany myśli.*/}
            {/*                </p>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/* </div>

            {/* Call to Action */}
            <div className="text-center">
                <div className="bg-gradient-to-r from-primary-light/20 to-primary/30 border border-white/10 p-8 md:p-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                        Zapraszamy do Strzykawy!
                    </h2>
                    {/*<p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">*/}
                    {/*    Przyjdź na kawę, zostań na rozmowę. Odkryj, dlaczego nasza społeczność*/}
                    {/*    rośnie każdego dnia i dlaczego Strzykawa to więcej niż kawiarnia.*/}
                    {/*</p>*/}
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

export default About;