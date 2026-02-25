import React from 'react';

export function HeroDescription() {
    return (
        <div className="mt-8 max-w-4xl mx-auto space-y-4">
            <p className="text-white/70 text-lg sm:text-xl leading-relaxed text-center font-light">
                Pozyskujemy najwyższej jakości ziarna, często z małych rodzinnych farm, gdzie kawa
                uprawiana jest z najwyższą starannością. Współpracujemy z renomowanymi importerami
                z Polski i zagranicy, co pozwala nam oferować surowiec o potwierdzonym pochodzeniu
                i doskonałych parametrach jakościowych.
            </p>
            <p className="text-white/70 text-lg sm:text-xl leading-relaxed text-center font-light">
                W naszej ofercie znajdują się starannie wyselekcjonowane kawy o niebanalnych profilach
                smakowych, w tym ziarna poddawane interesującym metodom obróbki, które nadają im
                unikalny charakter.
            </p>
            <p className="text-white/70 text-lg sm:text-xl leading-relaxed text-center font-light">
                Nie sprzedajemy masowego produktu. Tworzymy kawę, którą sami chcemy pić. Częstuj się!
            </p>
        </div>
    );
}