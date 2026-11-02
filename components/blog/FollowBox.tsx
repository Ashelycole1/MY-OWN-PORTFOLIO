'use client';

import { useState } from 'react';
import { Check, Mail, Rss } from 'lucide-react';
import PlatformIcon from '@/components/icons/PlatformIcon';
import { CONTACT, SITE } from '@/lib/profile';
import { socialLinks } from '@/lib/socials';
import { cn } from '@/lib/utils';

const RSS_PATH = '/blog/rss.xml';
const FOLLOW = socialLinks.filter((s) =>
    ['github', 'linkedin', 'x'].includes(s.icon),
);

/**
 * Honest "follow" box: a real RSS feed plus direct links. There is no mailing-list
 * backend, so this never pretends to subscribe anyone.
 */
const FollowBox = ({ compact = false }: { compact?: boolean }) => {
    const [copied, setCopied] = useState(false);

    const copyFeed = async () => {
        try {
            await navigator.clipboard.writeText(`${SITE.url}${RSS_PATH}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            window.open(RSS_PATH, '_blank', 'noopener');
        }
    };

    return (
        <section
            aria-label="Follow new posts"
            className={cn(
                'rounded-2xl border border-border bg-background-light/40',
                compact
                    ? 'p-5'
                    : 'p-6 md:p-8 md:flex md:items-center md:justify-between md:gap-8',
            )}
        >
            <div>
                <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-primary">
                    <Rss size={14} aria-hidden /> Never miss a post
                </p>
                <h2
                    className={cn(
                        'mt-2 font-anton uppercase text-foreground',
                        compact ? 'text-xl' : 'text-2xl md:text-3xl',
                    )}
                >
                    Follow Tech Nation
                </h2>
                <p className="mt-1 max-w-md text-sm text-muted-foreground">
                    Add the RSS feed to your reader, or follow along where I
                    post updates.
                </p>
            </div>

            <div
                className={cn(
                    'flex flex-wrap items-center gap-2',
                    compact ? 'mt-4' : 'mt-5 md:mt-0 md:justify-end',
                )}
            >
                <button
                    type="button"
                    onClick={copyFeed}
                    className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                    {copied ? (
                        <Check size={16} aria-hidden />
                    ) : (
                        <Rss size={16} aria-hidden />
                    )}
                    {copied ? 'Feed URL copied' : 'Copy RSS feed'}
                </button>
                <span className="sr-only" aria-live="polite">
                    {copied ? 'RSS feed URL copied' : ''}
                </span>
                <a
                    href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(
                        'About your Tech Nation post',
                    )}`}
                    className="inline-flex h-10 items-center gap-2 rounded-full border border-border px-4 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                    <Mail size={16} aria-hidden /> Email me
                </a>
                {FOLLOW.map((s) => (
                    <a
                        key={s.platform}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${s.platform} (opens in a new tab)`}
                        className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                        <PlatformIcon icon={s.icon} className="w-4 h-4" />
                    </a>
                ))}
            </div>
        </section>
    );
};

export default FollowBox;
