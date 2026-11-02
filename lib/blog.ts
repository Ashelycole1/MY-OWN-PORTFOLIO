import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import type { BlogPost, BlogPostMeta } from './blog-shared';

export type { BlogPost, BlogPostMeta } from './blog-shared';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

const readPost = (slug: string): BlogPost | null => {
    const fullPath = path.join(BLOG_DIR, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) return null;

    const { data, content } = matter(fs.readFileSync(fullPath, 'utf8'));
    const stats = readingTime(content);

    return {
        slug,
        title: data.title ?? 'Untitled',
        date: data.date ?? '',
        excerpt: data.excerpt ?? '',
        tags: data.tags ?? [],
        category: (
            data.category ||
            (data.tags && data.tags[0]) ||
            'ENGINEERING'
        ).toUpperCase(),
        coverImage: data.coverImage,
        readingTime: stats.text,
        minutes: Math.max(1, Math.ceil(stats.minutes)),
        content,
        featured: Boolean(data.featured),
    };
};

/** All posts, newest first. */
export function getAllPosts(): BlogPost[] {
    if (!fs.existsSync(BLOG_DIR)) return [];

    return fs
        .readdirSync(BLOG_DIR)
        .filter((f) => f.endsWith('.mdx'))
        .map((f) => readPost(f.replace(/\.mdx$/, '')))
        .filter((p): p is BlogPost => p !== null)
        .sort((a, b) => (a.date < b.date ? 1 : -1));
}

const toMeta = (post: BlogPost): BlogPostMeta => {
    const meta: Partial<BlogPost> = { ...post };
    delete meta.content;
    return meta as BlogPostMeta;
};

/** Posts without their body, for the index (keeps the client payload small). */
export function getAllPostMeta(): BlogPostMeta[] {
    return getAllPosts().map(toMeta);
}

export function getPostBySlug(slug: string): BlogPost | null {
    return readPost(slug);
}

/** Previous (older) and next (newer) posts by date. */
export function getAdjacentPosts(slug: string) {
    const posts = getAllPostMeta();
    const i = posts.findIndex((p) => p.slug === slug);
    return {
        newer: i > 0 ? posts[i - 1] : null,
        older: i >= 0 && i < posts.length - 1 ? posts[i + 1] : null,
    };
}

/** Related posts ranked by shared tags, then same category, then recency. */
export function getRelatedPosts(post: BlogPostMeta, limit = 3): BlogPostMeta[] {
    return getAllPostMeta()
        .filter((p) => p.slug !== post.slug)
        .map((p) => ({
            post: p,
            score:
                p.tags.filter((t) => post.tags.includes(t)).length * 2 +
                (p.category === post.category ? 1 : 0),
        }))
        .sort(
            (a, b) => b.score - a.score || (a.post.date < b.post.date ? 1 : -1),
        )
        .slice(0, limit)
        .map((r) => r.post);
}
