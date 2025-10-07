import React from 'react';

export function PageHeader({
                               icon: Icon,
                               title,
                               subtitle,
                               description,
                               children,
                               className = ""
                           }) {
    return (
        <div className={`relative mb-12 ${className}`}>
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-accent to-muted blur-3xl animate-pulse"></div>
                <div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-to-br from-muted to-accent blur-2xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative text-center max-w-3xl mx-auto">
                {/* Header with Icon */}
                <div className="mb-6">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        {Icon && (
                            <div className="p-3 bg-accent/20 border border-accent/30 backdrop-blur-sm">
                                <Icon className="w-8 h-8 text-accent" />
                            </div>
                        )}
                        <h1 className="text-4xl md:text-5xl font-bold text-white text-shadow-lg">
                            {title}
                        </h1>
                    </div>
                    {subtitle && (
                        <p className="text-xl md:text-2xl text-accent font-medium">{subtitle}</p>
                    )}
                </div>

                {description && (
                    <p className="text-lg text-muted leading-relaxed max-w-2xl mx-auto">
                        {description}
                    </p>
                )}

                {/* Custom content */}
                {children}
            </div>
        </div>
    );
}