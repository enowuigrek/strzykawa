import React from 'react';
import { FaStar, FaTripadvisor, FaGoogle, FaFacebookF, FaTrophy } from 'react-icons/fa';
import { useScrollAnimation, scrollAnimations } from '../../../hooks/useScrollAnimation';

export function HeroReviews() {
    const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.2 });
    const [cardsRef, cardsVisible] = useScrollAnimation({ threshold: 0.1 });
    const [quoteRef, quoteVisible] = useScrollAnimation({ threshold: 0.3 });

    const reviews = [
        {
            platform: 'TripAdvisor',
            icon: FaTripadvisor,
            iconColor: 'text-green-500',
            rating: '5.0',
            stars: 5,
            count: 7,
            url: 'https://www.tripadvisor.com/Restaurant_Review-g274761-d21349569-Reviews-Strzykawa_Coffee_Shop-Czestochowa_Silesia_Province_Southern_Poland.html'
        },
        {
            platform: 'Google',
            icon: FaGoogle,
            iconColor: 'text-blue-400',
            rating: '4.8',
            stars: 5,
            count: '100+',
            url: 'https://www.google.com/maps/place/Strzykawa+-+coffee+shop/@50.8107678,19.1189851,17z/data=!4m8!3m7!1s0x4710b53c8e8c8c8f:0x8c8c8c8c8c8c8c8c!8m2!3d50.8107678!4d19.1211738!9m1!1b1!16s%2Fg%2F11g9v7v7v7'
        },
        {
            platform: 'Facebook',
            icon: FaFacebookF,
            iconColor: 'text-blue-500',
            rating: '94%',
            count: 14,
            label: 'poleca',
            url: 'https://www.facebook.com/StrzykawaCoffeeShop/reviews'
        },
        {
            platform: 'Ranking 2025',
            icon: FaTrophy,
            iconColor: 'text-yellow-400',
            badge: '#1',
            subtitle: 'Palarnia w Częstochowie',
            url: 'https://panoramaczestochowy.pl/firmy/palarnia-kawy-czestochowa'
        }
    ];

    return (
        <div className="py-16 max-w-6xl mx-auto">
            {/* Divider - pelna szerokosc */}
            <div className="border-t border-white/10 mb-16"></div>

            {/* Section Header */}
            <div
                ref={headerRef}
                className={`text-center mb-16 transition-all duration-700 ease-out ${
                    headerVisible ? scrollAnimations.pourDown.visible : scrollAnimations.pourDown.hidden
                }`}
            >
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    Co mówią o nas
                </h3>
                <p className="text-white/60 text-sm sm:text-base">
                    Opinie naszych gości
                </p>
            </div>

            {/* Reviews Grid - 4 cards */}
            <div
                ref={cardsRef}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4"
            >
                {reviews.map((review, index) => {
                    const Icon = review.icon;
                    const delay = index * 100;

                    return (
                        <a
                            key={review.platform}
                            href={review.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group bg-white/10 backdrop-blur-sm p-5 hover:bg-white/15 hover:scale-105 transition-all duration-500 ease-out ${
                                cardsVisible
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-[30px]'
                            }`}
                            style={{ transitionDelay: cardsVisible ? `${delay}ms` : '0ms' }}
                        >
                            {/* Rating or Badge */}
                            {review.stars ? (
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="flex text-yellow-400 text-lg">
                                        {[...Array(review.stars)].map((_, i) => (
                                            <FaStar key={i} />
                                        ))}
                                    </div>
                                    <span className="text-white font-bold text-xl">{review.rating}</span>
                                </div>
                            ) : review.badge ? (
                                <div className="mb-2">
                                    <span className="text-yellow-400 font-bold text-3xl">{review.badge}</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-white font-bold text-2xl">{review.rating}</span>
                                </div>
                            )}

                            {/* Count / Subtitle */}
                            <p className="text-white/70 text-sm mb-3">
                                {review.count ? `${review.count} ${review.label || 'opinii'}` : review.subtitle}
                            </p>

                            {/* Platform with icon */}
                            <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                                <Icon className={`${review.iconColor} text-lg`} />
                                <p className="text-white/50 text-xs font-medium">
                                    {review.platform}
                                </p>
                            </div>
                        </a>
                    );
                })}
            </div>

            {/* Review Quote */}
            <div
                ref={quoteRef}
                className={`mt-10 max-w-3xl mx-auto px-4 transition-all duration-700 ease-out delay-300 ${
                    quoteVisible ? scrollAnimations.fade.visible : scrollAnimations.fade.hidden
                }`}
            >
                <blockquote className="text-white/70 text-base sm:text-lg italic text-center leading-relaxed">
                    &quot;The best coffee in Czestochowa. Great quality coffee.
                    The flat white was amazing.&quot;
                </blockquote>
                <p className="text-white/50 text-sm text-center mt-3">
                    — TripAdvisor Review
                </p>
            </div>
        </div>
    );
}
