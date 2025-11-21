import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

export function Section({ id, title, children }) {
    return (
        <section id={id} className="scroll-mt-8">
            <h2 className="text-3xl font-bold border-b border-accent/30 pb-4 mb-6">{title}</h2>
            {children}
        </section>
    );
}

export function ColorCard({ name, hex, usage, highlight }) {
    return (
        <div className="space-y-2">
            <div
                className={`w-full h-20 border-2 ${highlight ? 'border-success' : 'border-white/10'}`}
                style={{ backgroundColor: hex }}
            ></div>
            <p className="font-mono text-sm text-accent">{name}</p>
            <p className="font-mono text-xs text-muted">{hex}</p>
            <p className="text-xs text-white/70">{usage}</p>
        </div>
    );
}

export function SpacingRow({ size, px, usage, highlight }) {
    return (
        <div className={`flex items-center gap-4 p-3 ${highlight ? 'bg-accent/10 border border-accent/30' : 'bg-primary-light'}`}>
            <div className="w-12 font-mono text-accent">p-{size}</div>
            <div className="w-16 text-muted">{px}</div>
            <div className="flex-1 text-white/70 text-sm">{usage}</div>
            <div className="h-6 bg-accent" style={{ width: `${parseInt(px)}px` }}></div>
        </div>
    );
}

export function IconCard({ icon: Icon, name }) {
    return (
        <div className="flex flex-col items-center gap-2 p-3 bg-primary-light border border-accent/30 hover:border-accent transition-colors">
            <Icon className="w-6 h-6 text-accent" />
            <p className="text-xs text-muted text-center truncate w-full">{name}</p>
        </div>
    );
}

export function ZIndexCard({ level, usage, highlight }) {
    return (
        <div className={`flex items-center justify-between p-4 border ${highlight ? 'border-success/50 bg-success/10' : 'border-accent/30 bg-primary-light'}`}>
            <span className="font-mono text-accent">{level}</span>
            <span className="text-sm text-white/70">{usage}</span>
        </div>
    );
}

export function TimingRow({ name, value, usage, unit = 'ms', highlight }) {
    return (
        <div className={`flex items-center justify-between p-3 ${highlight ? 'bg-success/10 border border-success/30' : 'bg-primary-light border border-accent/30'}`}>
            <span className="font-mono text-accent">{name}</span>
            <span className="font-mono text-white">{value}{unit}</span>
            <span className="text-sm text-muted">{usage}</span>
        </div>
    );
}

export function Rule({ title, good, children }) {
    return (
        <div className={`p-6 border-2 ${good ? 'border-success/30' : 'border-danger/30'}`}>
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                {good ? <FaCheck className="text-success" /> : <FaTimes className="text-danger" />}
                {title}
            </h4>
            {children}
        </div>
    );
}
