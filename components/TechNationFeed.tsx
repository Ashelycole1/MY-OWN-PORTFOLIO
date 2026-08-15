'use client';

import React, { useState, useMemo } from 'react';
import { BlogPost } from '@/lib/blog';
import { AdscodUnit } from './AdscodUnit';
import { NewsletterBox } from './NewsletterBox';
import { TrendingUp, Tag, ArrowRight, Flame } from 'lucide-react';

interface TechNationFeedProps {
    posts: BlogPost[];
    onSelectPost: (_post: BlogPost) => void;
}

export function TechNationFeed({ posts, onSelectPost }: TechNationFeedProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

    // Extract unique categories
    const categories = useMemo(() => {
        const set = new Set<string>();
        posts.forEach((p) => {
            if (p.category) set.add(p.category.toUpperCase());
        });
        return ['ALL', ...Array.from(set)];
    }, [posts]);

    // Filter posts
    const filteredPosts = useMemo(() => {
        if (selectedCategory === 'ALL') return posts;
        return posts.filter((p) => p.category.toUpperCase() === selectedCategory);
    }, [posts, selectedCategory]);

    // Editorial Hierarchy
    // Lead story: first featured post or 1st post
    const leadStory = useMemo(() => {
        return filteredPosts.find((p) => p.featured) || filteredPosts[0];
    }, [filteredPosts]);

    // Secondary row: next 2 posts
    const secondaryPosts = useMemo(() => {
        return filteredPosts
            .filter((p) => p.slug !== leadStory?.slug)
            .slice(0, 2);
    }, [filteredPosts, leadStory]);

    // River list: all remaining posts (dense stream)
    const riverPosts = useMemo(() => {
        const leadAndSecondarySlugs = new Set([
            leadStory?.slug,
            ...secondaryPosts.map((p) => p.slug),
        ]);
        const remaining = filteredPosts.filter((p) => !leadAndSecondarySlugs.has(p.slug));
        // If there are few filtered posts, show what's available
        return remaining.length > 0 ? remaining : filteredPosts;
    }, [filteredPosts, leadStory, secondaryPosts]);

    // Trending stories: Top posts for the sidebar numbered rail
    const trendingPosts = useMemo(() => {
        return [...posts].slice(0, 5);
    }, [posts]);

    // Extract unique tags for tag cloud
    const allTags = useMemo(() => {
        const tagSet = new Set<string>();
        posts.forEach((p) => {
            p.tags?.forEach((t) => tagSet.add(t));
        });
        return Array.from(tagSet);
    }, [posts]);

    return (
        <div className="space-y-12">
            {/* HERO SECTION */}
            <header className="border-b border-border/40 pb-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold tracking-widest uppercase text-[#E1F036] bg-[#E1F036]/10 px-2.5 py-0.5 rounded-full border border-[#E1F036]/20">
                                <Flame className="w-3 h-3 text-[#E1F036]" />
                                The Engineering Publication
                            </span>
                            <span className="text-xs font-mono text-muted-foreground/60">
                                Volume 2026
                            </span>
                        </div>
                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-anton uppercase tracking-tight text-foreground leading-none">
                            Tech Nation
                        </h1>
                    </div>

                    <p className="text-sm sm:text-base text-muted-foreground max-w-md leading-relaxed font-sans">
                        Thoughts on software engineering, offline-first design, building in Africa, and lessons from real projects.
                    </p>
                </div>

                {/* Category Navigation Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pt-8 pb-2 no-scrollbar">
                    {categories.map((cat) => {
                        const isSelected = selectedCategory === cat;
                        return (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-1.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
                                    isSelected
                                        ? 'bg-[#E1F036] text-black shadow-md'
                                        : 'bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted border border-border/40'
                                }`}
                            >
                                {cat}
                            </button>
                        );
                    })}
                </div>
            </header>

            {/* If no posts match filter */}
            {filteredPosts.length === 0 ? (
                <div className="py-20 text-center text-muted-foreground">
                    No articles found in this category.
                </div>
            ) : (
                <>
                    {/* LEAD STORY — Full-Width Editorial Hero */}
                    {leadStory && (
                        <section aria-label="Lead Story" className="group">
                            <div
                                onClick={() => onSelectPost(leadStory)}
                                className="cursor-pointer block rounded-3xl border border-border/50 bg-gradient-to-b from-card/70 to-card/30 p-6 md:p-8 hover:border-[#E1F036]/40 transition-all duration-300 shadow-xl"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                                    {/* Lead Image (16:9 / aspect) */}
                                    <div className="lg:col-span-7 overflow-hidden rounded-2xl border border-border/40 bg-background/50 relative aspect-[16/9] sm:aspect-[16/8] lg:aspect-[16/9]">
                                        {leadStory.coverImage ? (
                                            /* eslint-disable-next-line @next/next/no-img-element */
                                            <img
                                                src={leadStory.coverImage}
                                                alt={leadStory.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-card to-background p-6 text-center">
                                                <span className="text-4xl font-anton text-muted-foreground/30 uppercase tracking-widest">
                                                    TECH NATION
                                                </span>
                                                <span className="text-xs font-mono text-primary mt-2">
                                                    LEAD DISPATCH
                                                </span>
                                            </div>
                                        )}
                                        <div className="absolute top-3 left-3">
                                            <span className="px-3 py-1 bg-black/80 backdrop-blur-md border border-[#E1F036]/40 text-[#E1F036] font-mono text-[10px] font-bold tracking-widest uppercase rounded-full">
                                                ★ LEAD STORY
                                            </span>
                                        </div>
                                    </div>

                                    {/* Lead Info */}
                                    <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E1F036]">
                                                    {'//'} {leadStory.category}
                                                </span>
                                                <span className="text-muted-foreground/40">·</span>
                                                <span className="text-xs font-mono text-muted-foreground">
                                                    {leadStory.readingTime}
                                                </span>
                                            </div>

                                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-anton uppercase text-foreground group-hover:text-primary transition-colors leading-[1.12]">
                                                {leadStory.title}
                                            </h2>

                                            <p className="text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-3">
                                                {leadStory.excerpt}
                                            </p>
                                        </div>

                                        <div className="pt-4 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
                                            <div className="flex items-center gap-2.5">
                                                <div className="size-6 rounded-full bg-foreground text-background font-anton text-[10px] flex items-center justify-center font-bold">
                                                    AC
                                                </div>
                                                <span className="font-medium text-foreground">Ashelycole</span>
                                                <span>·</span>
                                                <time dateTime={leadStory.date}>
                                                    {new Date(leadStory.date).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                    })}
                                                </time>
                                            </div>

                                            <span className="inline-flex items-center gap-1 text-[#E1F036] font-mono font-semibold group-hover:translate-x-1 transition-transform">
                                                Read Dispatch <ArrowRight className="w-3.5 h-3.5" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* SECONDARY ROW — 2 Medium Cards */}
                    {secondaryPosts.length > 0 && (
                        <section aria-label="Secondary Featured" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {secondaryPosts.map((post) => (
                                <article
                                    key={post.slug}
                                    onClick={() => onSelectPost(post)}
                                    className="group cursor-pointer rounded-2xl border border-border/50 bg-card/40 p-5 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
                                >
                                    <div className="space-y-3">
                                        {post.coverImage && (
                                            <div className="overflow-hidden rounded-xl border border-border/40 aspect-[16/8] relative">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={post.coverImage}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </div>
                                        )}

                                        <div className="flex items-center gap-2">
                                            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#E1F036]">
                                                {post.category}
                                            </span>
                                            <span className="text-muted-foreground/40">·</span>
                                            <span className="text-[11px] font-mono text-muted-foreground">
                                                {post.readingTime}
                                            </span>
                                        </div>

                                        <h3 className="text-xl sm:text-2xl font-anton uppercase text-foreground group-hover:text-primary transition-colors leading-snug">
                                            {post.title}
                                        </h3>

                                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                    </div>

                                    <div className="pt-4 mt-4 border-t border-border/30 flex items-center justify-between text-xs text-muted-foreground font-mono">
                                        <time dateTime={post.date}>{post.date}</time>
                                        <span className="text-primary font-medium group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                                            Read <ArrowRight className="w-3 h-3" />
                                        </span>
                                    </div>
                                </article>
                            ))}
                        </section>
                    )}

                    {/* TWO-COLUMN BODY BELOW THE FOLD */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-4">
                        {/* MAIN COLUMN (LEFT, ~70%): LATEST RIVER STREAM */}
                        <main className="lg:col-span-8 space-y-6">
                            <div className="flex items-center justify-between pb-3 border-b border-border/40">
                                <h2 className="text-lg font-anton uppercase tracking-wide flex items-center gap-2">
                                    <span className="size-2 rounded-full bg-primary" />
                                    The Latest River
                                </h2>
                                <span className="text-xs font-mono text-muted-foreground">
                                    {riverPosts.length} {riverPosts.length === 1 ? 'Dispatch' : 'Dispatches'}
                                </span>
                            </div>

                            {/* Dense List Items */}
                            <div className="divide-y divide-border/40">
                                {riverPosts.map((post) => (
                                    <article
                                        key={post.slug}
                                        onClick={() => onSelectPost(post)}
                                        className="py-5 first:pt-2 group cursor-pointer flex flex-col sm:flex-row items-start gap-4 sm:gap-6 hover:bg-card/20 px-2 rounded-xl transition-colors"
                                    >
                                        {/* Thumbnail (16:9, ~90-100px) */}
                                        <div className="w-full sm:w-28 shrink-0 aspect-[16/9] sm:h-20 rounded-lg overflow-hidden border border-border/40 bg-muted/40 relative">
                                            {post.coverImage ? (
                                                /* eslint-disable-next-line @next/next/no-img-element */
                                                <img
                                                    src={post.coverImage}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center font-anton text-xs text-muted-foreground/40 bg-card">
                                                    TN
                                                </div>
                                            )}
                                        </div>

                                        {/* Content info */}
                                        <div className="flex-1 space-y-1.5 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E1F036]">
                                                    {post.category}
                                                </span>
                                                <span className="text-muted-foreground/40">·</span>
                                                <span className="text-[11px] font-mono text-muted-foreground">
                                                    {post.readingTime}
                                                </span>
                                            </div>

                                            <h3 className="text-lg sm:text-xl font-anton uppercase text-foreground group-hover:text-primary transition-colors leading-snug">
                                                {post.title}
                                            </h3>

                                            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                                                {post.excerpt}
                                            </p>

                                            <div className="flex items-center gap-3 text-[11px] font-mono text-muted-foreground/70 pt-1">
                                                <span>By Ashelycole</span>
                                                <span>·</span>
                                                <time dateTime={post.date}>{post.date}</time>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </main>

                        {/* SIDEBAR (RIGHT, ~30%, STICKY ON SCROLL) */}
                        <aside className="lg:col-span-4 space-y-8">
                            {/* TRENDING / MOST READ NUMBERED RAIL */}
                            <div className="p-5 rounded-2xl border border-border/50 bg-card/30">
                                <div className="flex items-center gap-2 pb-3 mb-4 border-b border-border/40">
                                    <TrendingUp className="w-4 h-4 text-primary" />
                                    <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-foreground">
                                        Trending Dispatches
                                    </h3>
                                </div>

                                <ol className="space-y-4">
                                    {trendingPosts.map((post, index) => (
                                        <li
                                            key={post.slug}
                                            onClick={() => onSelectPost(post)}
                                            className="group cursor-pointer flex items-start gap-3"
                                        >
                                            <span className="font-anton text-2xl text-muted-foreground/40 group-hover:text-primary transition-colors leading-none w-5 text-right shrink-0">
                                                {index + 1}
                                            </span>
                                            <div className="space-y-1">
                                                <span className="text-[9px] font-mono font-bold uppercase text-[#E1F036]">
                                                    {post.category}
                                                </span>
                                                <h4 className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                                                    {post.title}
                                                </h4>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            </div>

                            {/* ADSCOD INLINE UNIT (STICKY RAIL SLOT) */}
                            <AdscodUnit placement="inline" theme="dark" />

                            {/* CATEGORY & TAG CLOUD */}
                            <div className="p-5 rounded-2xl border border-border/50 bg-card/30">
                                <div className="flex items-center gap-2 pb-3 mb-3 border-b border-border/40">
                                    <Tag className="w-4 h-4 text-primary" />
                                    <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-foreground">
                                        Explore Topics
                                    </h3>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {allTags.map((tag) => (
                                        <button
                                            key={tag}
                                            onClick={() => {
                                                // Find if a post has this tag
                                                const match = posts.find((p) => p.tags.includes(tag));
                                                if (match) setSelectedCategory(match.category);
                                            }}
                                            className="px-2.5 py-1 rounded-lg bg-muted/60 hover:bg-muted text-[11px] font-mono text-muted-foreground hover:text-foreground border border-border/40 transition-colors"
                                        >
                                            #{tag}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* NEWSLETTER SIGNUP BLOCK */}
                            <NewsletterBox />
                        </aside>
                    </div>
                </>
            )}
        </div>
    );
}

export default TechNationFeed;
