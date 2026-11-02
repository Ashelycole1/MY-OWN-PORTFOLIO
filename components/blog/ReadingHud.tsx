'use client';

import { RefObject, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, ListOrdered, X } from 'lucide-react';
import { TableOfContents } from '@/components/TableOfContents';
import type { TocItem } from '@/lib/blog-shared';

interface Props {
    articleRef: RefObject<HTMLElement | null>;
    minutes: number;
    toc: TocItem[];
}

const RING = 2 * Math.PI * 15;

/**
 * Floating reading bar: progress through the article body, minutes left,
 * a contents sheet (below lg, where the sidebar TOC is hidden) and back-to-top.
 */
const ReadingHud = ({ articleRef, minutes, toc }: Props) => {
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(false);
    const [sheetOpen, setSheetOpen] = useState(false);

    useEffect(() => {
        const update = () => {
            const el = articleRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const vh = window.innerHeight;
            // 0 when the article top reaches 30% of the viewport, 1 when its end does.
            const p =
                (vh * 0.3 - rect.top) / Math.max(1, rect.height - vh * 0.4);
            setProgress(Math.min(1, Math.max(0, p)));
            setVisible(rect.top < vh * 0.25);
        };
        update();
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        return () => {
            window.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, [articleRef]);

    useEffect(() => {
        if (!sheetOpen) return;
        const onKey = (e: KeyboardEvent) =>
            e.key === 'Escape' && setSheetOpen(false);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [sheetOpen]);

    const minutesLeft = Math.ceil(minutes * (1 - progress));
    const pct = Math.round(progress * 100);
    const status =
        progress >= 0.99 ? 'Finished' : `${Math.max(1, minutesLeft)} min left`;

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 24 }}
                    transition={{ type: 'spring', damping: 24, stiffness: 300 }}
                    // Centred by the flex row, not translate-x: framer owns `transform` here.
                    className="pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center px-4"
                >
                    <div className="pointer-events-auto relative">
                        <AnimatePresence>
                            {sheetOpen && toc.length > 0 && (
                                <motion.div
                                    id="reading-contents"
                                    initial={{
                                        opacity: 0,
                                        x: '-50%',
                                        y: 12,
                                        scale: 0.97,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        x: '-50%',
                                        y: 0,
                                        scale: 1,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        x: '-50%',
                                        y: 12,
                                        scale: 0.97,
                                    }}
                                    transition={{ duration: 0.18 }}
                                    className="absolute bottom-full left-1/2 mb-3 max-h-[60vh] w-[min(92vw,380px)] overflow-y-auto rounded-2xl border border-border bg-background/95 p-5 shadow-2xl backdrop-blur-xl"
                                >
                                    <TableOfContents
                                        items={toc}
                                        className=""
                                        onNavigate={() => setSheetOpen(false)}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="flex items-center gap-1 rounded-full border border-border bg-background/90 py-1.5 pl-1.5 pr-1.5 shadow-xl backdrop-blur-xl">
                            <div
                                className="relative flex size-9 items-center justify-center"
                                role="progressbar"
                                aria-label="Reading progress"
                                aria-valuenow={pct}
                                aria-valuemin={0}
                                aria-valuemax={100}
                            >
                                <svg
                                    viewBox="0 0 36 36"
                                    className="absolute inset-0 -rotate-90"
                                    aria-hidden
                                >
                                    <circle
                                        cx="18"
                                        cy="18"
                                        r="15"
                                        fill="none"
                                        stroke="hsl(var(--border))"
                                        strokeWidth="3"
                                    />
                                    <circle
                                        cx="18"
                                        cy="18"
                                        r="15"
                                        fill="none"
                                        stroke="hsl(var(--primary))"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeDasharray={RING}
                                        strokeDashoffset={RING * (1 - progress)}
                                        className="transition-[stroke-dashoffset] duration-150"
                                    />
                                </svg>
                                <span className="relative font-mono text-[10px] tabular-nums text-foreground">
                                    {pct}
                                </span>
                            </div>

                            <span
                                className="px-2 text-xs font-medium text-foreground whitespace-nowrap"
                                aria-live="off"
                            >
                                {status}
                            </span>

                            {toc.length > 0 && (
                                <button
                                    type="button"
                                    onClick={() => setSheetOpen((o) => !o)}
                                    aria-expanded={sheetOpen}
                                    aria-controls="reading-contents"
                                    className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:hidden"
                                >
                                    {sheetOpen ? (
                                        <X size={15} aria-hidden />
                                    ) : (
                                        <ListOrdered size={15} aria-hidden />
                                    )}
                                    Contents
                                </button>
                            )}

                            <button
                                type="button"
                                onClick={() =>
                                    window.scrollTo({
                                        top: 0,
                                        behavior: 'smooth',
                                    })
                                }
                                aria-label="Back to top"
                                className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            >
                                <ArrowUp size={16} aria-hidden />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ReadingHud;
