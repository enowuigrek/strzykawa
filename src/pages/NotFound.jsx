import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { Link } from 'react-router-dom';

export function NotFound() {
    return (
        <PageLayout
            title="404 — Strona nie istnieje"
            subtitle="Wygląda na to, że trafiłeś w miejsce, którego tu nie ma."
            description="Sprawdź, czy adres jest poprawny, lub wróć na stronę główną."
            showHeader={true}
            className="text-center"
        >
            <div className="container mx-auto px-6 py-12 text-center">
                <Link
                    to="/"
                    className="inline-block mt-6 px-6 py-3 bg-secondary text-accent rounded-lg font-medium hover:bg-secondary-light transition-colors"
                >
                    Wróć na stronę główną
                </Link>
            </div>
        </PageLayout>
    );
}