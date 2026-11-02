'use client';

import { useEffect, useState } from 'react';
import { Check, Link as LinkIcon, Share2 } from 'lucide-react';
import PlatformIcon from '@/components/icons/PlatformIcon';
import { SITE } from '@/lib/profile';
import { BLOG_URL } from '@/lib/blog-shared';

interface ShareRowProps {
    title: string;
    slug: string;
}

const btn =
    'inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';

const WhatsAppIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-3.5 h-3.5"
        aria-hidden
    >
        <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 21.5h-.01a9.45 9.45 0 0 1-4.82-1.32l-.35-.2-3.58.94.96-3.49-.23-.36a9.43 9.43 0 0 1-1.45-5.03c0-5.21 4.25-9.46 9.48-9.46a9.4 9.4 0 0 1 6.7 2.78 9.4 9.4 0 0 1 2.77 6.7c0 5.22-4.25 9.46-9.47 9.46zm8.06-17.52A11.32 11.32 0 0 0 12.04.64C5.76.64.65 5.75.65 12.03c0 2 .52 3.96 1.52 5.69L.55 23.6l6.02-1.58a11.36 11.36 0 0 0 5.46 1.39h.01c6.28 0 11.39-5.11 11.39-11.39 0-3.04-1.18-5.9-3.33-8.05z" />
    </svg>
);

export function ShareRow({ title, slug }: ShareRowProps) {
    const [copied, setCopied] = useState(false);
    const [canShare, setCanShare] = useState(false);
    const shareUrl = `${SITE.url}${BLOG_URL(slug)}`;

    useEffect(() => {
        setCanShare(
            typeof navigator !== 'undefined' &&
                typeof navigator.share === 'function',
        );
    }, []);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard blocked: leave the button as is.
        }
    };

    const nativeShare = async () => {
        try {
            await navigator.share({ title, url: shareUrl });
        } catch {
            // Share sheet dismissed.
        }
    };

    const text = encodeURIComponent(title);
    const url = encodeURIComponent(shareUrl);

    return (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-background-light/40 px-5 py-4">
            <div className="flex items-center gap-2 font-mono text-xs font-medium text-muted-foreground">
                <Share2 className="w-3.5 h-3.5 text-primary" aria-hidden />
                <span>Share this article</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
                {canShare && (
                    <button type="button" onClick={nativeShare} className={btn}>
                        <Share2 className="w-3.5 h-3.5" aria-hidden /> Share
                    </button>
                )}
                <button
                    type="button"
                    onClick={handleCopy}
                    className={btn}
                    aria-label="Copy link to this article"
                >
                    {copied ? (
                        <>
                            <Check
                                className="w-3.5 h-3.5 text-primary"
                                aria-hidden
                            />
                            <span>Copied</span>
                        </>
                    ) : (
                        <>
                            <LinkIcon className="w-3.5 h-3.5" aria-hidden />
                            <span>Copy link</span>
                        </>
                    )}
                </button>
                <span className="sr-only" aria-live="polite">
                    {copied ? 'Link copied' : ''}
                </span>
                <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                        `${title} ${shareUrl}`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={btn}
                    aria-label="Share on WhatsApp (opens in a new tab)"
                >
                    <WhatsAppIcon /> WhatsApp
                </a>
                <a
                    href={`https://twitter.com/intent/tweet?text=${text}&url=${url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={btn}
                    aria-label="Share on X (opens in a new tab)"
                >
                    <PlatformIcon icon="x" className="w-3.5 h-3.5" /> Post
                </a>
                <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={btn}
                    aria-label="Share on LinkedIn (opens in a new tab)"
                >
                    <PlatformIcon icon="linkedin" className="w-3.5 h-3.5" />{' '}
                    Share
                </a>
            </div>
        </div>
    );
}

export default ShareRow;
