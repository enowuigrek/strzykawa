import React from 'react';

export function Regulamin() {
    return (
        <div className=" flex items-center justify-center min-h-screen bg-primary py-16 px-4">
            <div className="container mx-auto max-w-4xl">
                <div className="bg-primary-light border border-white/10 p-8">
                    <h1 className="text-3xl font-bold text-white mb-8">
                        Regulamin sklepu internetowego
                    </h1>

                    <div className="prose prose-invert max-w-none space-y-6 text-white/70">
                        <p className="text-lg">
                            Regulamin w przygotowaniu...
                        </p>

                        <p>
                            Tutaj znajdziesz szczegółowe informacje o zasadach korzystania ze sklepu internetowego Strzykawa.
                        </p>

                        <section className="mt-8">
                            <h2 className="text-2xl font-semibold text-white mb-4">§1 Postanowienia ogólne</h2>
                            <p>Treść w przygotowaniu...</p>
                        </section>

                        <section className="mt-8">
                            <h2 className="text-2xl font-semibold text-white mb-4">§2 Składanie zamówień</h2>
                            <p>Treść w przygotowaniu...</p>
                        </section>

                        <section className="mt-8">
                            <h2 className="text-2xl font-semibold text-white mb-4">§3 Płatności i dostawa</h2>
                            <p>Treść w przygotowaniu...</p>
                        </section>

                        <section className="mt-8">
                            <h2 className="text-2xl font-semibold text-white mb-4">§4 Prawo odstąpienia od umowy</h2>
                            <p>Treść w przygotowaniu...</p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}