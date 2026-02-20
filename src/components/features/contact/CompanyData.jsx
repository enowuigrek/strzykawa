import React from 'react';
import { useScrollAnimation, scrollAnimations } from '../../../hooks/useScrollAnimation';

export function CompanyData() {
    const [ref, visible] = useScrollAnimation({ threshold: 0.2 });

    return (
        <div
            ref={ref}
            className={`space-y-7 transition-all duration-700 ease-out ${
                visible ? scrollAnimations.pourDown.visible : scrollAnimations.pourDown.hidden
            }`}
        >
            <h3 className="text-2xl text-white">Dane firmy</h3>

            <div className="flex flex-col gap-4">
                <span className="font-medium text-white">Strzykawa Damian Dzik</span>
                <span className="font-medium text-white">ul. Warszawska 241</span>
                <span className="font-medium text-white">42-209 Częstochowa</span>
                <span className="font-medium text-white">NIP: 7441726899</span>
            </div>
        </div>
    );
}
