import { getAllPosts } from '@/lib/blog';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog — Niwasiima Ashelycole',
    description: 'Thoughts on software engineering, offline-first design, building in Africa, and lessons from real projects.',
    openGraph: {
        title: 'Blog — Niwasiima Ashelycole',
        description: 'Thoughts on software engineering, offline-first design, building in Africa, and lessons from real projects.',
        url: 'https://ashelycole.dev/blog',
    },
};

export default function BlogPage() {
    const posts = getAllPosts();

    return (
        <main className="container py-24 md:py-32 min-h-[70vh]">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-anton uppercase mb-4">
                    Blog
                </h1>
                <p className="text-muted-foreground text-lg mb-16">
                    Thoughts on engineering, building in Africa, and lessons from real projects.
                </p>

                {posts.length === 0 ? (
                    <p className="text-muted-foreground">No posts yet. Check back soon.</p>
                ) : (
                    <ul className="space-y-16">
                        {posts.map((post) => (
                            <li key={post.slug} className="group">
                                <Link href={`/blog/${post.slug}`} className="block">
                                    {post.coverImage && (
                                        <div className="relative w-full aspect-[16/7] mb-6 overflow-hidden rounded-xl border border-border">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={post.coverImage}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                    )}
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
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
                                    <h2 className="text-2xl md:text-3xl font-anton uppercase mb-3 transition-colors group-hover:text-primary">
                                        {post.title}
                                    </h2>
                                    <p className="text-muted-foreground leading-relaxed mb-4">
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
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </main>
    );
}
