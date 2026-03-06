import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaChevronRight } from 'react-icons/fa';

/**
 * ProductBreadcrumb - Breadcrumb navigation dla strony produktu
 *
 * Mobile: "← Nasze kawy" (kompaktowy back link)
 * Desktop: "Start > Nasze kawy > Nazwa kawy"
 */
export function ProductBreadcrumb({ coffeeName }) {
    return (
        <nav className="flex items-center mb-6" aria-label="Breadcrumb">
            {/* Mobile: kompaktowy back link */}
            <Link
                to="/kawy"
                className="flex lg:hidden items-center gap-1.5 text-sm text-muted hover:text-white transition-colors"
            >
                <FaArrowLeft className="w-3 h-3" />
                <span>Nasze kawy</span>
            </Link>

            {/* Desktop: pełny breadcrumb */}
            <div className="hidden lg:flex items-center gap-2 text-sm text-muted">
                <Link
                    to="/"
                    className="hover:text-accent transition-colors"
                >
                    Start
                </Link>

                <FaChevronRight className="w-2.5 h-2.5 flex-shrink-0" />

                <Link
                    to="/kawy"
                    className="hover:text-accent transition-colors"
                >
                    Nasze kawy
                </Link>

                <FaChevronRight className="w-2.5 h-2.5 flex-shrink-0" />

                <span className="text-white truncate max-w-xs">{coffeeName}</span>
            </div>
        </nav>
    );
}
