'use client';

import Image from 'next/image';
import { ArrowUpRight, Calendar, Clock } from 'lucide-react';
import InteractiveCard from '@/components/InteractiveCard';
import TransitionLink from '@/components/TransitionLink';
import { BLOG_URL, BlogPostMeta, formatPostDate } from '@/lib/blog-shared';
import { cn } from '@/lib/utils';

/** Wraps every case-insensitive match of the query's words in <mark>. */
export const Highlight = ({
    text,
    query,
}: {
    text: string;
    query?: string;
}) => {
    const words = (query ?? '')
        .trim()
        .split(/\s+/)
        .filter((w) => w.length > 1)
        .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    if (!words.length) return <>{text}</>;

    const parts = text.split(new RegExp(`(${words.join('|')})`, 'gi'));
    return (
        <>
            {parts.map((part, i) =>
                i % 2 === 1 ? (
                    <mark
                        key={i}
                        className="rounded bg-highlight/25 px-0.5 text-foreground"
                    >
                        {part}
                    </mark>
                ) : (
                    part
                ),
            )}
        </>
    );
};

const Cover = ({ post, large }: { post: BlogPostMeta; large?: boolean }) => (
    <div
        className={cn(
            'relative w-full overflow-hidden border-b border-border bg-background-light',
            large
                ? 'aspect-[16/9] lg:aspect-auto lg:h-full lg:border-b-0 lg:border-r'
                : 'aspect-[16/9]',
        )}
    >
        {post.coverImage ? (
            <Image
                src={post.coverImage}
                alt=""
                fill
                sizes={
                    large
                        ? '(max-width: 1024px) 100vw, 60vw'
                        : '(max-width: 768px) 100vw, 33vw'
                }
                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
            />
        ) : (
            // Generated cover: category set in the display face over a faint grid.
            <div
                aria-hidden
                className="absolute inset-0 flex items-center justify-center p-6"
                style={{
                    backgroundImage:
                        'linear-gradient(hsl(var(--border) / 0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border) / 0.5) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                }}
            >
                <span
                    className={cn(
                        'font-anton uppercase text-center leading-none text-muted-foreground/40 transition-colors duration-500 group-hover:text-highlight/70',
                        large ? 'text-6xl' : 'text-4xl',
                    )}
                >
                    {post.category}
                </span>
            </div>
        )}
    </div>
);

interface Props {
    post: BlogPostMeta;
    variant?: 'lead' | 'grid';
    query?: string;
    activeTag?: string | null;
    onTagClick?: (_tag: string) => void;
}

/**
 * Whole card is clickable through a stretched title link; tag chips sit above it (z-10)
 * so they stay independently clickable.
 */
const PostCard = ({
    post,
    variant = 'grid',
    query,
    activeTag,
    onTagClick,
}: Props) => {
    const lead = variant === 'lead';

    return (
        <InteractiveCard
            glow="hsl(var(--highlight) / 0.16)"
            innerClassName={cn(lead && 'lg:grid lg:grid-cols-12')}
        >
            <div
                className={cn(
                    lead && 'lg:col-span-7 lg:min-h-[380px] lg:h-full',
                )}
            >
                <Cover post={post} large={lead} />
            </div>

            <div
                className={cn(
                    'flex flex-1 flex-col',
                    lead ? 'p-6 md:p-8 lg:col-span-5 lg:justify-center' : 'p-5',
                )}
            >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span className="font-mono font-bold uppercase tracking-widest text-highlight">
                        {post.category}
                    </span>
                    {lead && post.featured && (
                        <span className="rounded-full border border-highlight/40 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-highlight">
                            Featured
                        </span>
                    )}
                </div>

                <h3
                    className={cn(
                        'mt-3 font-anton uppercase leading-[1.1] text-foreground transition-colors group-hover:text-primary',
                        lead ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl',
                    )}
                >
                    <TransitionLink
                        href={BLOG_URL(post.slug)}
                        className="rounded-sm after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-primary focus-visible:after:rounded-2xl"
                    >
                        <Highlight text={post.title} query={query} />
                    </TransitionLink>
                </h3>

                <p
                    className={cn(
                        'mt-3 text-muted-foreground leading-relaxed',
                        lead
                            ? 'text-base line-clamp-4'
                            : 'text-sm line-clamp-3',
                    )}
                >
                    <Highlight text={post.excerpt} query={query} />
                </p>

                {post.tags.length > 0 && (
                    <ul
                        className="relative z-10 mt-4 flex flex-wrap gap-1.5"
                        aria-label="Tags"
                    >
                        {post.tags.slice(0, lead ? 6 : 4).map((tag) => (
                            <li key={tag}>
                                <button
                                    type="button"
                                    onClick={() => onTagClick?.(tag)}
                                    aria-pressed={activeTag === tag}
                                    className={cn(
                                        'rounded-md border px-2 py-0.5 font-mono text-[11px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                                        activeTag === tag
                                            ? 'border-highlight bg-highlight/15 text-foreground'
                                            : 'border-border bg-background/40 text-muted-foreground hover:text-foreground hover:border-foreground/30',
                                    )}
                                >
                                    #<Highlight text={tag} query={query} />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="mt-auto flex items-center justify-between gap-3 pt-5 text-xs text-muted-foreground">
                    <span className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1.5">
                            <Calendar size={13} aria-hidden />
                            <time dateTime={post.date}>
                                {formatPostDate(post.date, 'short')}
                            </time>
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <Clock size={13} aria-hidden />
                            {post.minutes} min
                        </span>
                    </span>
                    <ArrowUpRight
                        size={18}
                        aria-hidden
                        className="transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                    />
                </div>
            </div>
        </InteractiveCard>
    );
};

export default PostCard;
