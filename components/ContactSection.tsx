'use client';

import React, {
    PointerEvent,
    ReactNode,
    useEffect,
    useRef,
    useState,
} from 'react';
import {
    AnimatePresence,
    motion,
    useReducedMotion,
    useSpring,
} from 'framer-motion';
import { ArrowUpRight, Check, Clock, Copy, Mail, Phone } from 'lucide-react';
import PlatformIcon from '@/components/icons/PlatformIcon';
import { socialLinks } from '@/lib/socials';
import { CONTACT, HERO, SECTION_IDS } from '@/lib/profile';
import { cn } from '@/lib/utils';

/** Dark brand colours (GitHub, X, TikTok) vanish on the dark theme; glow with the foreground instead. */
const glowFor = (hex: string) => {
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
    href,
    ariaLabel,
}: {
    children: ReactNode;
    glow: string;
    className?: string;
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
            <span className="relative flex h-full flex-col">{children}</span>
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

/** Copies text and confirms inline; the result is announced to screen readers. */
const CopyButton = ({ value, label }: { value: string; label: string }) => {
    const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');

    useEffect(() => {
        if (state === 'idle') return;
        const t = setTimeout(() => setState('idle'), 2000);
        return () => clearTimeout(t);
    }, [state]);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setState('copied');
        } catch {
            setState('failed');
        }
    };

    return (
        <button
            type="button"
            onClick={copy}
            aria-label={`Copy ${label}`}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-border px-4 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={state}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="inline-flex items-center gap-2"
                >
                    {state === 'copied' ? (
                        <Check size={16} aria-hidden />
                    ) : (
                        <Copy size={16} aria-hidden />
                    )}
                    {state === 'copied'
                        ? 'Copied'
                        : state === 'failed'
                          ? 'Copy failed'
                          : 'Copy'}
                </motion.span>
            </AnimatePresence>
            <span className="sr-only" aria-live="polite">
                {state === 'copied'
                    ? `${label} copied`
                    : state === 'failed'
                      ? 'Copy failed'
                      : ''}
            </span>
        </button>
    );
};

/** Live local time in Kampala; rendered after mount to avoid a hydration mismatch. */
const KampalaClock = () => {
    const [time, setTime] = useState<string | null>(null);

    useEffect(() => {
        const fmt = new Intl.DateTimeFormat('en-GB', {
            timeZone: 'Africa/Kampala',
            hour: '2-digit',
            minute: '2-digit',
        });
        const tick = () => setTime(fmt.format(new Date()));
        tick();
        const id = setInterval(tick, 30_000);
        return () => clearInterval(id);
    }, []);

    return (
        <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Clock size={14} aria-hidden />
            {time ? (
                <span>
                    <span className="tabular-nums text-foreground">{time}</span>{' '}
                    in Kampala (EAT)
                </span>
            ) : (
                <span>Kampala, Uganda (EAT)</span>
            )}
        </span>
    );
};

const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.5, delay },
});

const DIRECT = [
    {
        key: 'email',
        label: 'Email',
        value: CONTACT.email,
        href: `mailto:${CONTACT.email}?subject=${encodeURIComponent(CONTACT.emailSubject)}`,
        action: 'Send email',
        icon: Mail,
        hint: 'Best for roles, contracts and project briefs',
    },
    {
        key: 'phone',
        label: 'Phone',
        value: CONTACT.phone,
        href: CONTACT.phoneHref,
        action: 'Call',
        icon: Phone,
        hint: 'Kampala, Uganda · EAT (UTC+3)',
    },
];

const ContactSection = () => {
    return (
        <section
            id={SECTION_IDS.contact}
            className="py-20 md:py-32 w-full max-w-[1200px] mx-auto px-5 lg:px-10"
        >
            <motion.div {...fadeUp(0)} className="mb-12 md:mb-14">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-anton uppercase text-foreground">
                    Find Me Online
                </h2>
                <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
                    <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="relative flex size-2.5" aria-hidden>
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60 motion-reduce:animate-none" />
                            <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
                        </span>
                        {HERO.status}
                    </span>
                    <KampalaClock />
                </div>
            </motion.div>

            {/* Direct contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {DIRECT.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                        <motion.div key={item.key} {...fadeUp(0.08 * idx)}>
                            <InteractiveCard
                                glow="hsl(var(--primary) / 0.18)"
                                className="p-6 md:p-8"
                            >
                                <span className="flex items-center gap-3 text-muted-foreground">
                                    <span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                        <Icon size={18} aria-hidden />
                                    </span>
                                    <span className="text-sm uppercase tracking-widest">
                                        {item.label}
                                    </span>
                                </span>
                                <a
                                    href={item.href}
                                    className="mt-5 block w-fit break-all rounded-sm font-anton text-2xl leading-tight text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:text-3xl md:text-4xl"
                                >
                                    {item.value}
                                </a>
                                <span className="mt-2 block text-sm text-muted-foreground">
                                    {item.hint}
                                </span>
                                <span className="mt-auto flex flex-wrap gap-3 pt-6">
                                    <a
                                        href={item.href}
                                        className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                    >
                                        {item.action}
                                        <ArrowUpRight size={16} aria-hidden />
                                    </a>
                                    <CopyButton
                                        value={item.value}
                                        label={item.label.toLowerCase()}
                                    />
                                </span>
                            </InteractiveCard>
                        </motion.div>
                    );
                })}
            </div>

            {/* Socials */}
            <motion.p
                {...fadeUp(0)}
                className="mt-14 mb-6 text-sm uppercase tracking-widest text-muted-foreground"
            >
                Follow along
            </motion.p>
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                {socialLinks.map((social, idx) => (
                    <motion.li key={social.platform} {...fadeUp(0.06 * idx)}>
                        <InteractiveCard
                            href={social.url}
                            ariaLabel={`${social.platform}: ${social.handle} (opens in a new tab)`}
                            glow={glowFor(social.brandColor)}
                            className="p-4 sm:p-5"
                        >
                            <span className="flex items-start justify-between">
                                <span
                                    className="flex size-11 items-center justify-center rounded-xl border border-white/10 text-white shadow-md transition-transform duration-300 group-hover:scale-110"
                                    style={{ backgroundColor: social.brandColor }}
                                >
                                    <PlatformIcon
                                        icon={social.icon}
                                        className="w-5 h-5"
                                    />
                                </span>
                                <ArrowUpRight
                                    size={20}
                                    aria-hidden
                                    className="text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                                />
                            </span>
                            <span className="mt-6 block font-anton text-2xl leading-none text-foreground">
                                {social.platform}
                            </span>
                            <span className="mt-2 block truncate text-sm text-foreground/80">
                                {social.handle}
                            </span>
                            <span className="mt-1 block text-xs text-muted-foreground">
                                {social.blurb}
                            </span>
                        </InteractiveCard>
                    </motion.li>
                ))}
            </ul>
        </section>
    );
};

export default ContactSection;
