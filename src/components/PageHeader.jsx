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
        <div className={`mb-10 overflow-hidden p-6 ${className}`}>

            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-accent to-muted blur-3xl animate-pulse"></div>
                <div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-to-br from-muted to-accent blur-2xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10">
                {/* Header with Icon */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-3 mb-6">
                        {Icon && (
                            <div className="p-3 bg-accent/20 border border-accent/30">
                                <Icon className="w-8 h-8 text-accent" />
                            </div>
                        )}
                        <h1 className="text-4xl md:text-5xl text-white bg-clip-text text-transparent">
                            {title}
                        </h1>
                    </div>

                    {subtitle && (
                        <div className="w-24 h-1 bg-gradient-to-r from-accent to-muted mx-auto rounded-full mb-6"></div>
                    )}
                </div>

                {description && (
                    <p className="text-xl text-muted/90 leading-relaxed max-w-3xl mx-auto text-center">
                        {description}
                    </p>
                )}

                {/* Custom content */}
                {children}
            </div>
        </div>
    );
}