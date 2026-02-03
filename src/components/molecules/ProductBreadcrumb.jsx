import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaChevronRight } from 'react-icons/fa';

/**
 * ProductBreadcrumb - Breadcrumb navigation dla strony produktu
 */
export function ProductBreadcrumb({ coffeeName }) {
    return (
        <nav className="flex items-center gap-2 mb-6 text-base" aria-label="Breadcrumb">
            {/* Back button - UKRYTY (niepotrzebny na mobile) */}
            <Link
                to="/kawy"
                className="hidden inline-flex items-center gap-2 px-5 py-2.5 bg-primary-light border border-accent/30 text-muted hover:bg-accent/20 hover:text-white rounded-full transition-all"
            >
                <FaArrowLeft className="w-4 h-4" />
                <span>Powrót</span>
            </Link>

            {/* Full breadcrumb - desktop */}
            <div className="hidden lg:flex items-center gap-2 text-muted">
                <Link
                    to="/"
                    className="hover:text-accent transition-colors"
                >
                    Start
                </Link>

                <FaChevronRight className="w-3 h-3" />

                <Link
                    to="/kawy"
                    className="hover:text-accent transition-colors"
                >
                    Nasze kawy
                </Link>

                <FaChevronRight className="w-3 h-3" />

                <span className="text-white font-medium">{coffeeName}</span>
            </div>
        </nav>
    );
}