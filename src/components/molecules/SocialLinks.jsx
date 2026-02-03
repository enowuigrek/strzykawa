import React from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { useScrollAnimation, scrollAnimations } from '../../hooks/useScrollAnimation';

export function SocialLinks() {
    const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.3 });
    const [iconsRef, iconsVisible] = useScrollAnimation({ threshold: 0.2 });
    const [statsRef, statsVisible] = useScrollAnimation({ threshold: 0.3 });

    const socials = [
        {
            name: 'Facebook',
            icon: FaFacebook,
            url: 'https://www.facebook.com/StrzykawaCoffeeShop',
            color: 'hover:bg-blue-600/20'
        },
        {
            name: 'Instagram',
            icon: FaInstagram,
            url: 'https://www.instagram.com/strzykawa_coffee_shop',
            color: 'hover:bg-pink-600/20'
        }
    ];

    return (
        <div className="pt-16 max-w-4xl mx-auto text-center border-t border-white/10">
            {/* Header */}
            <div
                ref={headerRef}
                className={`mb-10 transition-all duration-700 ease-out ${
                    headerVisible ? scrollAnimations.pourDown.visible : scrollAnimations.pourDown.hidden
                }`}
            >
                <h3 className="text-xl sm:text-2xl text-white mb-2">
                    Śledź nas
                </h3>
                <p className="text-white/60 text-base">
                    Bądź na bieżąco z nowościami i akcjami
                </p>
            </div>

            {/* Social Icons */}
            <div ref={iconsRef} className="flex items-center justify-center gap-4 px-4">
                {socials.map((social, index) => {
                    const Icon = social.icon;
                    const delay = index * 150;
                    return (
                        <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 transition-all duration-500 ease-out hover:scale-105 ${social.color} ${
                                iconsVisible
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-[20px]'
                            }`}
                            style={{ transitionDelay: iconsVisible ? `${delay}ms` : '0ms' }}
                            aria-label={`Odwiedź nasz ${social.name}`}
                        >
                            <Icon className="text-white text-xl" />
                            <span className="text-white font-medium sm:inline">
                                {social.name}
                            </span>
                        </a>
                    );
                })}
            </div>

            {/* Followers Count */}
            <div
                ref={statsRef}
                className={`mt-6 flex items-center justify-center gap-8 text-white/50 text-base transition-all duration-700 ease-out delay-200 ${
                    statsVisible ? scrollAnimations.fade.visible : scrollAnimations.fade.hidden
                }`}
            >
                <div>
                    <span className="font-medium text-white">1,430+</span> na Facebooku
                </div>
                <div>
                    <span className="font-medium text-white">1,559+</span> na Instagramie
                </div>
            </div>
        </div>
    );
}