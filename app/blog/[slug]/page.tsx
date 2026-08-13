import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return {};

    return {
        title: `${post.title} — Niwasiima Ashelycole`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: `https://ashelycole.dev/blog/${slug}`,
            type: 'article',
            publishedTime: post.date,
            tags: post.tags,
            ...(post.coverImage ? { images: [{ url: post.coverImage }] } : {}),
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) notFound();

    return (
        <main className="container py-24 md:py-32">
            <div className="max-w-3xl mx-auto">
                {/* Back link */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12 text-sm"
                >
                    ← Back to Blog
                </Link>

                {/* Header */}
                <header className="mb-12">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                        <time dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </time>
                        <span>·</span>
                        <span>{post.readingTime}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-anton uppercase leading-tight mb-6">
                        {post.title}
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                        {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 bg-muted rounded-full text-xs font-medium text-muted-foreground"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </header>

                {/* Article body */}
                <article className="prose prose-invert prose-lg max-w-none
                    prose-headings:font-anton prose-headings:uppercase
                    prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
                    prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
                    prose-p:leading-relaxed prose-p:text-muted-foreground
                    prose-li:text-muted-foreground
                    prose-strong:text-foreground
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                    prose-hr:border-border
                    prose-code:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                    prose-blockquote:border-primary prose-blockquote:text-muted-foreground
                ">
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </article>

                {/* Footer nav */}
                <div className="mt-20 pt-8 border-t border-border">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                        ← More posts
                    </Link>
                </div>
            </div>
        </main>
    );
}
