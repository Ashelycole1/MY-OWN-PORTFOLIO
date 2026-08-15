'use client';

import { useEffect, useRef } from 'react';

interface AdscodUnitProps {
    placement: 'inline' | 'native';
    theme?: 'light' | 'dark';
    className?: string;
}

export function AdscodUnit({ placement, theme = 'dark', className = '' }: AdscodUnitProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const publisherKey = process.env.NEXT_PUBLIC_ADSCOD_PUBLISHER_KEY;

    useEffect(() => {
        if (!containerRef.current || !publisherKey) return;

        // Clean previous children if any
        containerRef.current.innerHTML = '';

        const script = document.createElement('script');
        script.src = 'https://api.adscod.com/sdk/v1/publisher.js';
        script.async = true;
        script.dataset.key = publisherKey;
        script.dataset.placement = placement;
        script.dataset.theme = theme;
        script.dataset.limit = '1';

        containerRef.current.appendChild(script);

        const currentRef = containerRef.current;
        return () => {
            if (currentRef) {
                currentRef.innerHTML = '';
            }
        };
    }, [placement, theme, publisherKey]);

    return (
        <aside
            aria-label="Advertisement"
            className={`my-8 overflow-hidden rounded-xl border border-border/40 bg-card/40 p-4 transition-all duration-300 ${className}`}
        >
            <div className="flex items-center justify-between border-b border-border/30 pb-2 mb-3">
                <span className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground/70">
                    Advertisement
                </span>
                <span className="text-[10px] font-mono text-muted-foreground/50">
                    Adscod · {placement}
                </span>
            </div>

            <div
                ref={containerRef}
                className="w-full min-h-[100px] flex items-center justify-center text-xs text-muted-foreground/60 text-center"
            >
                {!publisherKey && (
                    <div className="py-4 px-3 flex flex-col items-center gap-1.5 w-full bg-background/50 rounded-lg border border-dashed border-border/50">
                        <div className="size-2 rounded-full bg-primary/60 animate-pulse" />
                        <span className="font-mono text-[11px] text-muted-foreground">
                            Adscod Partner Spotlight
                        </span>
                        <span className="text-[10px] text-muted-foreground/60 max-w-xs">
                            Curated developer tools, cloud infrastructure & tech services.
                        </span>
                    </div>
                )}
            </div>
        </aside>
    );
}

export default AdscodUnit;
