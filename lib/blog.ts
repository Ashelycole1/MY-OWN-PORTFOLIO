import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
    category: string;
    coverImage?: string;
    readingTime: string;
    content: string;
    featured?: boolean;
}

export function getAllPosts(): BlogPost[] {
    if (!fs.existsSync(BLOG_DIR)) return [];

    const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));

    return files
        .map((filename) => {
            const slug = filename.replace(/\.mdx$/, '');
            const fullPath = path.join(BLOG_DIR, filename);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data, content } = matter(fileContents);
            const stats = readingTime(content);

            return {
                slug,
                title: data.title ?? 'Untitled',
                date: data.date ?? '',
                excerpt: data.excerpt ?? '',
                tags: data.tags ?? [],
                category: (data.category || (data.tags && data.tags[0]) || 'ENGINEERING').toUpperCase(),
                coverImage: data.coverImage,
                readingTime: stats.text,
                content,
                featured: Boolean(data.featured),
            };
        })
        .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | null {
    const fullPath = path.join(BLOG_DIR, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const stats = readingTime(content);

    return {
        slug,
        title: data.title ?? 'Untitled',
        date: data.date ?? '',
        excerpt: data.excerpt ?? '',
        tags: data.tags ?? [],
        category: (data.category || (data.tags && data.tags[0]) || 'ENGINEERING').toUpperCase(),
        coverImage: data.coverImage,
        readingTime: stats.text,
        content,
        featured: Boolean(data.featured),
    };
}
