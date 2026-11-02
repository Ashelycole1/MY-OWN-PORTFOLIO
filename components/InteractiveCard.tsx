'use client';

import React, { PointerEvent, ReactNode, useRef } from 'react';
import { motion, useReducedMotion, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

/** Dark brand colours (GitHub, X, TikTok) vanish on the dark theme; glow with the foreground instead. */
export const glowFor = (hex: string) => {
    const n = parseInt(hex.slice(1), 16);
    const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    return luminance < 0.15 ? 'hsl(var(--foreground) / 0.14)' : `${hex}40`;
};

/** Card with a cursor-following spotlight and a gentle 3D tilt (mouse only; tilt off for reduced motion). */
const InteractiveCard = ({
    children,
    glow,
    className,
    innerClassName,
    href,
    ariaLabel,
}: {
    children: ReactNode;
    glow: string;
    className?: string;
    /** Classes for the inner content wrapper (defaults to a full-height flex column). */
    innerClassName?: string;
    /** When set, the whole card is a link that opens in a new tab. */
    href?: string;
    ariaLabel?: string;
}) => {
    const reduceMotion = useReducedMotion();
    const rotateX = useSpring(0, { stiffness: 260, damping: 22 });
    const rotateY = useSpring(0, { stiffness: 260, damping: 22 });
    const ref = useRef<HTMLElement | null>(null);

    const onPointerMove = (e: PointerEvent<HTMLElement>) => {
        const el = ref.current;
        if (!el || e.pointerType !== 'mouse') return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        el.style.setProperty('--mx', `${x}px`);
        el.style.setProperty('--my', `${y}px`);
        if (reduceMotion) return;
        rotateY.set((x / rect.width - 0.5) * 8);
        rotateX.set((0.5 - y / rect.height) * 8);
    };

    const onPointerLeave = () => {
        rotateX.set(0);
        rotateY.set(0);
    };

    const shared = {
        onPointerMove,
        onPointerLeave,
        style: { rotateX, rotateY, transformPerspective: 900 },
        className: cn(
            'group relative block h-full overflow-hidden rounded-2xl border border-border bg-background-light/40 transition-colors duration-300 hover:border-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            className,
        ),
    };

    const content = (
        <>
            <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), ${glow}, transparent 70%)`,
                }}
            />
            <div
                className={cn('relative flex h-full flex-col', innerClassName)}
            >
                {children}
            </div>
        </>
    );

    if (href) {
        return (
            <motion.a
                ref={(el: HTMLAnchorElement | null) => {
                    ref.current = el;
                }}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={ariaLabel}
                {...shared}
            >
                {content}
            </motion.a>
        );
    }

    return (
        <motion.div
            ref={(el: HTMLDivElement | null) => {
                ref.current = el;
            }}
            {...shared}
        >
            {content}
        </motion.div>
    );
};

export default InteractiveCard;
