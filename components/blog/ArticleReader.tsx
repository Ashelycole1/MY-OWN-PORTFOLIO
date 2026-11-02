'use client';

import React, {
    isValidElement,
    ReactNode,
    useMemo,
    useRef,
    useState,
} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ReactMarkdown, { Components } from 'react-markdown';
import {
    ArrowLeft,
    ArrowRight,
    Calendar,
    Check,
    Clock,
    Link as LinkIcon,
} from 'lucide-react';
import { AdscodUnit, hasAdscod } from '@/components/AdscodUnit';
import { CodeBlock } from '@/components/CodeBlock';
import { ReadingProgressBar } from '@/components/ReadingProgressBar';
import { ShareRow } from '@/components/ShareRow';
import { TableOfContents } from '@/components/TableOfContents';
import TransitionLink from '@/components/TransitionLink';
import { ABOUT, SITE } from '@/lib/profile';
import {
    BLOG_URL,
    BlogPost,
    BlogPostMeta,
    formatPostDate,
    slugify,
    TocItem,
} from '@/lib/blog-shared';
import FollowBox from './FollowBox';
import PostCard from './PostCard';
import ReadingHud from './ReadingHud';

const nodeText = (node: ReactNode): string => {
    if (typeof node === 'string' || typeof node === 'number')
        return String(node);
    if (Array.isArray(node)) return node.map(nodeText).join('');
    if (isValidElement(node))
        return nodeText((node.props as { children?: ReactNode }).children);
    return '';
};

/** Section heading with a hover "copy link" anchor. */
const Heading = ({
    level,
    children,
}: {
    level: 2 | 3;
    children?: ReactNode;
}) => {
    const [copied, setCopied] = useState(false);
    const text = nodeText(children);
    const id = slugify(text);
    const Tag = level === 2 ? 'h2' : 'h3';

    const copy = async (e: React.MouseEvent) => {
        e.preventDefault();
        window.history.replaceState(null, '', `#${id}`);
        document
            .getElementById(id)
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            // Clipboard blocked; the URL hash is still updated.
        }
    };

    return (
        <Tag id={id} className="group/heading scroll-mt-28">
            {children}
            <a
                href={`#${id}`}
                onClick={copy}
                aria-label={`Copy link to section: ${text}`}
                className="ml-2 inline-flex translate-y-[-0.1em] align-middle text-muted-foreground no-underline opacity-0 transition-opacity hover:text-primary focus-visible:opacity-100 group-hover/heading:opacity-100"
            >
                {copied ? (
                    <Check size={18} aria-hidden />
                ) : (
                    <LinkIcon size={18} aria-hidden />
                )}
            </a>
            {copied && (
                <span className="sr-only" aria-live="polite">
                    Link copied
                </span>
            )}
        </Tag>
    );
};

const markdownComponents: Components = {
    h2: ({ children }) => <Heading level={2}>{children}</Heading>,
    h3: ({ children }) => <Heading level={3}>{children}</Heading>,
    code: ({ className, children, ...props }) => {
        const match = /language-(\w+)/.exec(className || '');
        const isInline = !match && !String(children).includes('\n');
        if (isInline) {
            return (
                <code
                    className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] font-medium text-highlight before:content-none after:content-none"
                    {...props}
                >
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
    a: ({ href, children }) => {
        const external = href?.startsWith('http');
        return (
            <a
                href={href}
                {...(external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
            >
                {children}
            </a>
        );
    },
};

interface Props {
    post: BlogPost;
    toc: TocItem[];
    newer: BlogPostMeta | null;
    older: BlogPostMeta | null;
    related: BlogPostMeta[];
}

const ArticleReader = ({ post, toc, newer, older, related }: Props) => {
    const router = useRouter();
    const articleRef = useRef<HTMLElement>(null);

    // Split at H2s only when an in-content ad will be inserted after the first section.
    const sections = useMemo(
        () => (hasAdscod ? post.content.split(/\n(?=## )/) : [post.content]),
        [post.content],
    );

    const goToTag = (tag: string) =>
        router.push(`/blog?tag=${encodeURIComponent(tag)}`);

    return (
        <div className="min-h-screen">
            <ReadingProgressBar />
            <ReadingHud
                articleRef={articleRef}
                minutes={post.minutes}
                toc={toc}
            />

            <div className="mx-auto max-w-6xl px-4 pb-24 pt-28 md:pt-32">
                <TransitionLink
                    href="/blog"
                    back
                    className="group mb-10 inline-flex items-center gap-2 rounded-full font-mono text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                    <ArrowLeft
                        size={14}
                        aria-hidden
                        className="transition-transform group-hover:-translate-x-1"
                    />
                    All articles
                </TransitionLink>

                {/* Header */}
                <header className="mx-auto mb-12 max-w-4xl">
                    <Link
                        href={`/blog?category=${encodeURIComponent(
                            post.category.toLowerCase(),
                        )}`}
                        className="inline-block rounded-full border border-highlight/30 bg-highlight/10 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-highlight transition-colors hover:bg-highlight/20"
                    >
                        {post.category}
                    </Link>

                    <h1 className="mt-5 font-anton text-4xl uppercase leading-[1.06] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                        {post.title}
                    </h1>
                    <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
                        {post.excerpt}
                    </p>

                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-3">
                            <Image
                                src="https://github.com/Ashelycole1.png"
                                alt=""
                                width={40}
                                height={40}
                                className="size-10 rounded-full object-cover"
                            />
                            <div>
                                <div className="text-sm font-semibold text-foreground">
                                    {SITE.name}
                                </div>
                                <div>
                                    {SITE.jobTitle} · Co-Founder & CTO at RENOA
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 font-mono">
                            <span className="inline-flex items-center gap-1.5">
                                <Calendar
                                    size={14}
                                    aria-hidden
                                    className="text-primary"
                                />
                                <time dateTime={post.date}>
                                    {formatPostDate(post.date)}
                                </time>
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <Clock
                                    size={14}
                                    aria-hidden
                                    className="text-primary"
                                />
                                {post.readingTime}
                            </span>
                        </div>
                    </div>

                    {post.coverImage && (
                        <div className="relative mt-8 aspect-[16/8] w-full overflow-hidden rounded-2xl border border-border bg-background-light">
                            <Image
                                src={post.coverImage}
                                alt=""
                                fill
                                priority
                                sizes="(max-width: 1024px) 100vw, 900px"
                                className="object-cover object-top"
                            />
                        </div>
                    )}
                </header>

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                    <div className="space-y-10 lg:col-span-8">
                        <article
                            ref={articleRef}
                            className="prose prose-lg prose-theme max-w-none
                                prose-headings:font-anton prose-headings:uppercase prose-headings:tracking-wide
                                prose-h2:mb-4 prose-h2:mt-12 prose-h2:text-2xl sm:prose-h2:text-3xl
                                prose-h3:mb-3 prose-h3:mt-8 prose-h3:text-xl sm:prose-h3:text-2xl
                                prose-p:leading-relaxed
                                prose-a:font-medium prose-a:text-primary prose-a:underline-offset-4 hover:prose-a:underline
                                prose-blockquote:rounded-r-lg prose-blockquote:border-l-4 prose-blockquote:border-highlight prose-blockquote:bg-muted/40 prose-blockquote:px-4 prose-blockquote:py-2 prose-blockquote:not-italic
                                prose-img:rounded-xl prose-hr:border-border"
                        >
                            {sections.map((section, idx) => (
                                <React.Fragment key={idx}>
                                    <ReactMarkdown
                                        components={markdownComponents}
                                    >
                                        {section}
                                    </ReactMarkdown>
                                    {idx === 0 && sections.length > 1 && (
                                        <div className="not-prose my-10">
                                            <AdscodUnit placement="native" />
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </article>

                        {post.tags.length > 0 && (
                            <ul
                                className="flex flex-wrap gap-2 border-t border-border pt-6"
                                aria-label="Tags"
                            >
                                {post.tags.map((tag) => (
                                    <li key={tag}>
                                        <Link
                                            href={`/blog?tag=${encodeURIComponent(
                                                tag,
                                            )}`}
                                            className="inline-block rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
                                        >
                                            #{tag}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}

                        <ShareRow title={post.title} slug={post.slug} />

                        {/* Author */}
                        <div className="flex flex-col items-start gap-5 rounded-2xl border border-border bg-background-light/40 p-6 sm:flex-row sm:items-center">
                            <Image
                                src="https://github.com/Ashelycole1.png"
                                alt=""
                                width={56}
                                height={56}
                                className="size-14 shrink-0 rounded-2xl object-cover"
                            />
                            <div className="space-y-1">
                                <div className="text-base font-bold text-foreground">
                                    Written by {SITE.name}
                                </div>
                                <p className="text-sm leading-relaxed text-muted-foreground">
                                    {ABOUT.paragraphs[0]}
                                </p>
                                <Link
                                    href="/#about-me"
                                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                                >
                                    More about me{' '}
                                    <ArrowRight size={14} aria-hidden />
                                </Link>
                            </div>
                        </div>

                        {/* Previous / next */}
                        {(older || newer) && (
                            <nav
                                aria-label="More articles"
                                className="grid gap-4 sm:grid-cols-2"
                            >
                                {older ? (
                                    <TransitionLink
                                        href={BLOG_URL(older.slug)}
                                        className="group rounded-2xl border border-border p-5 transition-colors hover:border-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                    >
                                        <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                                            <ArrowLeft
                                                size={14}
                                                aria-hidden
                                                className="transition-transform group-hover:-translate-x-1"
                                            />
                                            Older
                                        </span>
                                        <span className="mt-2 block font-anton text-lg uppercase leading-snug text-foreground transition-colors group-hover:text-primary">
                                            {older.title}
                                        </span>
                                    </TransitionLink>
                                ) : (
                                    <span className="hidden sm:block" />
                                )}
                                {newer && (
                                    <TransitionLink
                                        href={BLOG_URL(newer.slug)}
                                        className="group rounded-2xl border border-border p-5 text-right transition-colors hover:border-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                    >
                                        <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                                            Newer
                                            <ArrowRight
                                                size={14}
                                                aria-hidden
                                                className="transition-transform group-hover:translate-x-1"
                                            />
                                        </span>
                                        <span className="mt-2 block font-anton text-lg uppercase leading-snug text-foreground transition-colors group-hover:text-primary">
                                            {newer.title}
                                        </span>
                                    </TransitionLink>
                                )}
                            </nav>
                        )}
                    </div>

                    <aside className="hidden lg:col-span-4 lg:block">
                        <div className="sticky top-28 space-y-8">
                            <TableOfContents items={toc} className="" />
                            <FollowBox compact />
                        </div>
                    </aside>
                </div>

                {related.length > 0 && (
                    <section
                        aria-labelledby="related-heading"
                        className="mt-20"
                    >
                        <h2
                            id="related-heading"
                            className="mb-6 font-anton text-3xl uppercase text-foreground"
                        >
                            Keep reading
                        </h2>
                        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {related.map((p) => (
                                <li key={p.slug}>
                                    <PostCard post={p} onTagClick={goToTag} />
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                <div className="mt-12 lg:hidden">
                    <FollowBox compact />
                </div>
            </div>
        </div>
    );
};

export default ArticleReader;
