import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from 'lucide-react';

interface CalloutProps {
    type?: 'note' | 'warning' | 'tip' | 'info';
    title?: string;
    children: React.ReactNode;
}

export function Callout({ type = 'note', title, children }: CalloutProps) {
    const config = {
        note: {
            icon: Info,
            border: 'border-primary/40',
            bg: 'bg-primary/5',
            text: 'text-primary',
            defaultTitle: 'Note',
        },
        warning: {
            icon: AlertTriangle,
            border: 'border-amber-500/40',
            bg: 'bg-amber-500/5',
            text: 'text-amber-400',
            defaultTitle: 'Warning',
        },
        tip: {
            icon: CheckCircle2,
            border: 'border-emerald-500/40',
            bg: 'bg-emerald-500/5',
            text: 'text-emerald-400',
            defaultTitle: 'Tip',
        },
        info: {
            icon: AlertCircle,
            border: 'border-sky-500/40',
            bg: 'bg-sky-500/5',
            text: 'text-sky-400',
            defaultTitle: 'Info',
        },
    }[type];

    const Icon = config.icon;

    return (
        <aside
            className={`my-6 p-4 rounded-xl border ${config.border} ${config.bg} relative overflow-hidden`}
        >
            <div className="flex items-center gap-2.5 mb-2 font-mono text-xs font-semibold uppercase tracking-wider">
                <Icon className={`w-4 h-4 ${config.text}`} />
                <span className={config.text}>{title || config.defaultTitle}</span>
            </div>
            <div className="text-sm leading-relaxed text-foreground/90 pl-6 space-y-2">
                {children}
            </div>
        </aside>
    );
}

export function Note({ children, title }: { children: React.ReactNode; title?: string }) {
    return <Callout type="note" title={title}>{children}</Callout>;
}

export function Warning({ children, title }: { children: React.ReactNode; title?: string }) {
    return <Callout type="warning" title={title}>{children}</Callout>;
}

export function Tip({ children, title }: { children: React.ReactNode; title?: string }) {
    return <Callout type="tip" title={title}>{children}</Callout>;
}

export default Callout;
