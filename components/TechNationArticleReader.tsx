'use client';

import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { BlogPost } from '@/lib/blog';
import { ReadingProgressBar } from './ReadingProgressBar';
import { TableOfContents, TocItem } from './TableOfContents';
import { CodeBlock } from './CodeBlock';
import { AdscodUnit } from './AdscodUnit';
import { ShareRow } from './ShareRow';
import { NewsletterBox } from './NewsletterBox';
import { ArrowLeft, Clock, Calendar, Sparkles } from 'lucide-react';

interface TechNationArticleReaderProps {
    post: BlogPost;
    allPosts: BlogPost[];
    onBack: () => void;
    onSelectPost: (_post: BlogPost) => void;
}

export function TechNationArticleReader({
    post,
    allPosts,
    onBack,
    onSelectPost,
}: TechNationArticleReaderProps) {
    // Extract table of contents from markdown content
    const tocItems = useMemo<TocItem[]>(() => {
        const items: TocItem[] = [];
        const lines = post.content.split('\n');
        lines.forEach((line) => {
            const h2Match = line.match(/^##\s+(.+)$/);
            const h3Match = line.match(/^###\s+(.+)$/);
            if (h2Match) {
                const text = h2Match[1].replace(/\*\*/g, '').replace(/_/g, '').trim();
                const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                items.push({ id, text, level: 2 });
            } else if (h3Match) {
                const text = h3Match[1].replace(/\*\*/g, '').replace(/_/g, '').trim();
                const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                items.push({ id, text, level: 3 });
            }
        });
        return items;
    }, [post.content]);

    // Related posts in same category or latest
    const relatedPosts = useMemo(() => {
        return allPosts
            .filter((p) => p.slug !== post.slug)
            .slice(0, 3);
    }, [allPosts, post.slug]);

    // Split markdown content into paragraphs to inject native ad unit after 2nd/3rd section
    const contentSections = useMemo(() => {
        // Split by main headers or double newlines
        const parts = post.content.split(/\n(?=## )/);
        return parts;
    }, [post.content]);

    return (
        <div className="min-h-screen">
            <ReadingProgressBar />

            {/* Top Navigation Bar */}
            <div className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-40">
                <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                    <button
                        onClick={onBack}
                        className="inline-flex items-center gap-2 text-xs font-mono font-medium text-muted-foreground hover:text-foreground transition-colors group"
                    >
                        <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                        <span>Back to Tech Nation Stream</span>
                    </button>

                    <div className="flex items-center gap-3">
                        <span className="text-[11px] font-mono uppercase tracking-widest text-[#E1F036] font-bold bg-[#E1F036]/10 px-2.5 py-0.5 rounded-full border border-[#E1F036]/20">
                            {post.category}
                        </span>
                    </div>
                </div>
            </div>

            <main className="max-w-6xl mx-auto px-4 py-10 md:py-16">
                {/* Article Header */}
                <header className="max-w-4xl mx-auto mb-12">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#E1F036]">
                            {'//'} {post.category}
                        </span>
                        <span className="text-muted-foreground/40">·</span>
                        <span className="text-xs font-mono text-muted-foreground">DISPATCH #{post.slug.slice(0, 6)}</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-anton uppercase tracking-tight text-foreground leading-[1.08] mb-6">
                        {post.title}
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                        {post.excerpt}
                    </p>

                    {/* Byline row */}
                    <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-border/40 text-xs text-muted-foreground">
                        <div className="flex items-center gap-3">
                            <div className="size-9 rounded-full bg-foreground text-background font-anton text-xs flex items-center justify-center font-bold">
                                AC
                            </div>
                            <div>
                                <div className="font-semibold text-foreground">Niwasiima Ashelycole</div>
                                <div className="text-[11px] text-muted-foreground">Full-Stack Engineer & Systems Builder</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-xs font-mono">
                            <div className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-primary" />
                                <time dateTime={post.date}>
                                    {new Date(post.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                    })}
                                </time>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-primary" />
                                <span>{post.readingTime}</span>
                            </div>
                        </div>
                    </div>

                    {/* Cover image if available */}
                    {post.coverImage && (
                        <div className="relative w-full aspect-[16/8] mt-8 overflow-hidden rounded-2xl border border-border/50 bg-card shadow-2xl">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={post.coverImage}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                </header>

                {/* Article Grid: Content (Left) + Table of Contents / Sticky Sidebar (Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Column: Markdown Body + In-content Ads */}
                    <div className="lg:col-span-8 space-y-8">
                        <article className="prose prose-invert prose-lg max-w-none
                            prose-headings:font-anton prose-headings:uppercase prose-headings:tracking-wide
                            prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-foreground
                            prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-foreground/90
                            prose-p:leading-relaxed prose-p:text-muted-foreground prose-p:text-base sm:prose-p:text-lg
                            prose-li:text-muted-foreground prose-li:text-base sm:prose-li:text-lg
                            prose-strong:text-foreground prose-strong:font-semibold
                            prose-a:text-[#E1F036] prose-a:no-underline hover:prose-a:underline
                            prose-hr:border-border/40
                            prose-blockquote:border-l-4 prose-blockquote:border-[#E1F036] prose-blockquote:bg-muted/20 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:text-foreground/90
                        ">
                            {contentSections.map((section, idx) => (
                                <React.Fragment key={idx}>
                                    <ReactMarkdown
                                        components={{
                                            h2: ({ children }) => {
                                                const text = String(children).replace(/\*\*/g, '').trim();
                                                const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                                                return <h2 id={id}>{children}</h2>;
                                            },
                                            h3: ({ children }) => {
                                                const text = String(children).replace(/\*\*/g, '').trim();
                                                const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                                                return <h3 id={id}>{children}</h3>;
                                            },
                                            code: ({ className, children, ...props }) => {
                                                const match = /language-(\w+)/.exec(className || '');
                                                const isInline = !match && !String(children).includes('\n');
                                                if (isInline) {
                                                    return (
                                                        <code className="text-[#E1F036] bg-muted/60 px-1.5 py-0.5 rounded text-xs font-mono font-medium before:content-none after:content-none" {...props}>
                                                            {children}
                                                        </code>
                                                    );
                                                }
                                                return (
                                                    <CodeBlock
                                                        code={String(children).replace(/\n$/, '')}
                                                        language={match ? match[1] : 'typescript'}
                                                    />
                                                );
                                            },
                                        }}
                                    >
                                        {section}
                                    </ReactMarkdown>

                                    {/* In-content Native Ad after 1st section (approx after paragraph 2-3) */}
                                    {idx === 0 && contentSections.length > 1 && (
                                        <div className="not-prose my-10">
                                            <AdscodUnit placement="native" theme="dark" />
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </article>

                        {/* Tags Pill Row */}
                        <div className="pt-6 border-t border-border/40">
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 bg-muted/60 border border-border/40 rounded-full text-xs font-mono text-muted-foreground"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Share Row */}
                        <ShareRow title={post.title} slug={post.slug} />

                        {/* End-of-article Inline Ad Unit */}
                        <div className="pt-4">
                            <AdscodUnit placement="inline" theme="dark" />
                        </div>

                        {/* Author Bio Box */}
                        <div className="p-6 rounded-2xl border border-border/50 bg-card/40 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                            <div className="size-14 rounded-2xl bg-[#E1F036] text-black font-anton text-xl flex items-center justify-center shrink-0 font-bold shadow-lg">
                                AC
                            </div>
                            <div className="space-y-1">
                                <div className="text-base font-bold text-foreground">Niwasiima Ashelycole</div>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Software engineer specializing in offline-first web architecture, distributed systems, and building high-performance digital tools across Africa.
                                </p>
                            </div>
                        </div>

                        {/* Related Stories River */}
                        {relatedPosts.length > 0 && (
                            <div className="pt-10 space-y-6">
                                <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground pb-2 border-b border-border/40">
                                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                                    <span>More Dispatches in Tech Nation</span>
                                </div>

                                <div className="divide-y divide-border/40">
                                    {relatedPosts.map((related) => (
                                        <div
                                            key={related.slug}
                                            onClick={() => onSelectPost(related)}
                                            className="py-4 group cursor-pointer flex items-start justify-between gap-4 transition-colors"
                                        >
                                            <div className="space-y-1.5 flex-1">
                                                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E1F036]">
                                                    {related.category}
                                                </span>
                                                <h4 className="text-base font-anton uppercase text-foreground group-hover:text-primary transition-colors leading-snug">
                                                    {related.title}
                                                </h4>
                                                <p className="text-xs text-muted-foreground line-clamp-1">
                                                    {related.excerpt}
                                                </p>
                                                <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground/70">
                                                    <span>{related.readingTime}</span>
                                                    <span>·</span>
                                                    <span>{related.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Bottom Navigation */}
                        <div className="pt-6">
                            <button
                                onClick={onBack}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-muted hover:bg-muted/80 text-foreground font-mono text-xs transition-colors border border-border/40"
                            >
                                <ArrowLeft className="w-3.5 h-3.5" />
                                <span>Return to Tech Nation Feed</span>
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Sticky Sidebar on Desktop */}
                    <aside className="hidden lg:block lg:col-span-4 space-y-8">
                        {/* Table of Contents */}
                        <TableOfContents items={tocItems} />

                        {/* Newsletter Block */}
                        <NewsletterBox />
                    </aside>
                </div>
            </main>
        </div>
    );
}

export default TechNationArticleReader;
