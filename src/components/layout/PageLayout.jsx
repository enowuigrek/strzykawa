import React from 'react';
import { PageHeader } from './PageHeader';

/**
 * PageLayout - Universal wrapper for all pages
 * Provides consistent layout, spacing, and optional header
 */
export function PageLayout({
                               children,
                               title,
                               subtitle,
                               description,
                               icon,
                               showHeader = true,
                               className = '',
                               contentClassName = '',
                           }) {
    return (
        <div className={`min-h-screen bg-primary pt-36 pb-8 ${className}`}>

            {/* Page Header Section */}
            {showHeader && (title || subtitle || description) && (
                <div className="container mx-auto px-6 py-16">
                    <PageHeader
                        title={title}
                        subtitle={subtitle}
                        description={description}
                        icon={icon}
                    />
                </div>
            )}

            {/* Page Content */}
            <div className={contentClassName}>
                {children}
            </div>

        </div>
    );
}