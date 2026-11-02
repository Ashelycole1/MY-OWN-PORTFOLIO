'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDownUp, Search, SearchX, X } from 'lucide-react';
import { AdscodUnit, hasAdscod } from '@/components/AdscodUnit';
import { BlogPostMeta } from '@/lib/blog-shared';
import { cn } from '@/lib/utils';
import FollowBox from './FollowBox';
import PostCard from './PostCard';

type Sort = 'newest' | 'oldest' | 'quick';
const SORTS: { value: Sort; label: string }[] = [
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'quick', label: 'Quickest read' },
];
const ALL = 'ALL';

const matches = (post: BlogPostMeta, query: string) => {
    const haystack = [post.title, post.excerpt, post.category, ...post.tags]
        .join(' ')
        .toLowerCase();
    return query
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean)
        .every((word) => haystack.includes(word));
};

const countBy = (items: string[]) =>
    items.reduce<Record<string, number>>((acc, k) => {
        acc[k] = (acc[k] ?? 0) + 1;
        return acc;
    }, {});

const BlogIndex = ({ posts }: { posts: BlogPostMeta[] }) => {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState<string>(ALL);
    const [tag, setTag] = useState<string | null>(null);
    const [sort, setSort] = useState<Sort>('newest');
    const [ready, setReady] = useState(false);
    const searchRef = useRef<HTMLInputElement>(null);

    // Read filters from the URL once, so filtered views can be shared and tag links work.
    useEffect(() => {
        const p = new URLSearchParams(window.location.search);
        setQuery(p.get('q') ?? '');
        setCategory(p.get('category')?.toUpperCase() ?? ALL);
        setTag(p.get('tag'));
        const s = p.get('sort') as Sort | null;
        if (s && SORTS.some((o) => o.value === s)) setSort(s);
        setReady(true);
    }, []);

    // Keep the URL in sync without adding history entries.
    useEffect(() => {
        if (!ready) return;
        const p = new URLSearchParams();
        if (query.trim()) p.set('q', query.trim());
        if (category !== ALL) p.set('category', category.toLowerCase());
        if (tag) p.set('tag', tag);
        if (sort !== 'newest') p.set('sort', sort);
        const qs = p.toString();
        window.history.replaceState(null, '', qs ? `/blog?${qs}` : '/blog');
    }, [query, category, tag, sort, ready]);

    // "/" focuses search (unless typing elsewhere).
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            const el = e.target as HTMLElement;
            const typing =
                el.isContentEditable ||
                ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName);
            if (e.key === '/' && !typing) {
                e.preventDefault();
                searchRef.current?.focus();
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    const categoryCounts = useMemo(
        () => countBy(posts.map((p) => p.category)),
        [posts],
    );
    const tagCounts = useMemo(
        () => countBy(posts.flatMap((p) => p.tags)),
        [posts],
    );
    const tags = useMemo(
        () =>
            Object.keys(tagCounts).sort(
                (a, b) => tagCounts[b] - tagCounts[a] || a.localeCompare(b),
            ),
        [tagCounts],
    );
    const totalMinutes = useMemo(
        () => posts.reduce((n, p) => n + p.minutes, 0),
        [posts],
    );

    const filtered = useMemo(() => {
        const list = posts.filter(
            (p) =>
                (category === ALL || p.category === category) &&
                (!tag || p.tags.includes(tag)) &&
                (!query.trim() || matches(p, query)),
        );
        return [...list].sort((a, b) => {
            if (sort === 'quick')
                return a.minutes - b.minutes || (a.date < b.date ? 1 : -1);
            if (sort === 'oldest') return a.date < b.date ? -1 : 1;
            return a.date < b.date ? 1 : -1;
        });
    }, [posts, category, tag, query, sort]);

    const filtersActive =
        Boolean(query.trim()) || category !== ALL || Boolean(tag);
    const showLead = !filtersActive && sort === 'newest' && filtered.length > 1;
    const lead = showLead
        ? filtered.find((p) => p.featured) ?? filtered[0]
        : null;
    const grid = lead ? filtered.filter((p) => p.slug !== lead.slug) : filtered;

    const clearAll = useCallback(() => {
        setQuery('');
        setCategory(ALL);
        setTag(null);
        setSort('newest');
    }, []);

    const toggleTag = (t: string) => setTag((cur) => (cur === t ? null : t));

    const pill = (active: boolean) =>
        cn(
            'inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
            active
                ? 'border-transparent bg-[#E1F036] text-black shadow-md'
                : 'border-border bg-background-light/40 text-muted-foreground hover:text-foreground hover:border-foreground/30',
        );

    return (
        <div className="space-y-10">
            {/* Masthead */}
            <header className="border-b border-border pb-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="font-mono text-xs font-bold uppercase tracking-widest text-highlight">
                            The engineering blog
                        </p>
                        <h1 className="mt-2 font-anton text-6xl uppercase leading-none tracking-tight text-foreground md:text-7xl lg:text-8xl">
                            Tech Nation
                        </h1>
                    </div>
                    <div className="max-w-md space-y-3">
                        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                            Notes on software engineering, offline-first design,
                            building in Africa, and lessons from real projects.
                        </p>
                        <p className="font-mono text-xs text-muted-foreground">
                            {posts.length} articles ·{' '}
                            {Object.keys(categoryCounts).length} topics ·{' '}
                            {totalMinutes} min of reading
                        </p>
                    </div>
                </div>

                {/* Search + sort */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <label className="relative flex-1">
                        <span className="sr-only">Search articles</span>
                        <Search
                            size={18}
                            aria-hidden
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                        />
                        <input
                            ref={searchRef}
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Escape') {
                                    setQuery('');
                                    e.currentTarget.blur();
                                }
                            }}
                            placeholder="Search titles, topics and tags"
                            className="h-12 w-full rounded-full border border-border bg-background-light/40 pl-11 pr-20 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary [&::-webkit-search-cancel-button]:hidden"
                        />
                        {query ? (
                            <button
                                type="button"
                                onClick={() => {
                                    setQuery('');
                                    searchRef.current?.focus();
                                }}
                                aria-label="Clear search"
                                className="absolute right-3 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
                            >
                                <X size={16} aria-hidden />
                            </button>
                        ) : (
                            <kbd className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 rounded border border-border px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground sm:block">
                                /
                            </kbd>
                        )}
                    </label>

                    <label className="relative sm:w-48">
                        <span className="sr-only">Sort articles</span>
                        <ArrowDownUp
                            size={16}
                            aria-hidden
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                        />
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value as Sort)}
                            className="h-12 w-full appearance-none rounded-full border border-border bg-background-light/40 pl-10 pr-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                            {SORTS.map((o) => (
                                <option
                                    key={o.value}
                                    value={o.value}
                                    className="bg-background"
                                >
                                    {o.label}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                {/* Categories */}
                <div
                    role="group"
                    aria-label="Filter by category"
                    className="no-scrollbar -mx-1 mt-5 flex gap-2 overflow-x-auto px-1 pb-1"
                >
                    {[ALL, ...Object.keys(categoryCounts).sort()].map((c) => (
                        <button
                            key={c}
                            type="button"
                            onClick={() => setCategory(c)}
                            aria-pressed={category === c}
                            className={pill(category === c)}
                        >
                            {c === ALL ? 'All' : c}
                            <span
                                className={cn(
                                    'tabular-nums',
                                    category === c
                                        ? 'text-black/60'
                                        : 'text-muted-foreground/60',
                                )}
                            >
                                {c === ALL ? posts.length : categoryCounts[c]}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Tags */}
                <div
                    role="group"
                    aria-label="Filter by tag"
                    className="mt-4 flex flex-wrap gap-1.5"
                >
                    {tags.map((t) => (
                        <button
                            key={t}
                            type="button"
                            onClick={() => toggleTag(t)}
                            aria-pressed={tag === t}
                            className={cn(
                                'rounded-md border px-2.5 py-1 font-mono text-[11px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                                tag === t
                                    ? 'border-highlight bg-highlight/15 text-foreground'
                                    : 'border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground',
                            )}
                        >
                            #{t}{' '}
                            <span className="text-muted-foreground/60">
                                {tagCounts[t]}
                            </span>
                        </button>
                    ))}
                </div>
            </header>

            {/* Result summary */}
            <div className="flex min-h-8 flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground" aria-live="polite">
                    {filtersActive
                        ? `${filtered.length} of ${posts.length} articles`
                        : `${posts.length} articles`}
                    {tag && (
                        <>
                            {' '}
                            tagged{' '}
                            <span className="font-mono text-foreground">
                                #{tag}
                            </span>
                        </>
                    )}
                    {category !== ALL && (
                        <>
                            {' '}
                            in{' '}
                            <span className="font-mono text-foreground">
                                {category}
                            </span>
                        </>
                    )}
                    {query.trim() && (
                        <>
                            {' '}
                            matching{' '}
                            <span className="text-foreground">
                                “{query.trim()}”
                            </span>
                        </>
                    )}
                </p>
                {filtersActive && (
                    <button
                        type="button"
                        onClick={clearAll}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                        <X size={14} aria-hidden /> Clear filters
                    </button>
                )}
            </div>

            {filtered.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border py-20 text-center"
                >
                    <SearchX
                        size={36}
                        aria-hidden
                        className="text-muted-foreground"
                    />
                    <div>
                        <p className="font-anton text-2xl uppercase text-foreground">
                            No articles match
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Try a different word or remove a filter.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={clearAll}
                        className="inline-flex h-10 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                        Show all articles
                    </button>
                </motion.div>
            ) : (
                <>
                    <AnimatePresence mode="popLayout" initial={false}>
                        {lead && (
                            <motion.div
                                key={`lead-${lead.slug}`}
                                layout
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.35 }}
                            >
                                <PostCard
                                    post={lead}
                                    variant="lead"
                                    onTagClick={toggleTag}
                                    activeTag={tag}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {lead && hasAdscod && <AdscodUnit placement="inline" />}

                    <motion.ul
                        layout
                        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                    >
                        <AnimatePresence mode="popLayout" initial={false}>
                            {grid.map((post, i) => (
                                <motion.li
                                    key={post.slug}
                                    layout
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.96 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: Math.min(i, 6) * 0.04,
                                    }}
                                >
                                    <PostCard
                                        post={post}
                                        query={query}
                                        onTagClick={toggleTag}
                                        activeTag={tag}
                                    />
                                </motion.li>
                            ))}
                        </AnimatePresence>
                    </motion.ul>
                </>
            )}

            <FollowBox />
        </div>
    );
};

export default BlogIndex;
