// Client-safe blog types and helpers (no fs). lib/blog.ts does the file reading.

export interface BlogPostMeta {
    slug: string;
    title: string;
    date: string; // "YYYY-MM-DD"
    excerpt: string;
    tags: string[];
    category: string;
    coverImage?: string;
    readingTime: string; // e.g. "4 min read"
    minutes: number;
    featured?: boolean;
}

export interface BlogPost extends BlogPostMeta {
    content: string;
}

export interface TocItem {
    id: string;
    text: string;
    level: 2 | 3;
}

/** Heading text -> anchor id. Used by both the TOC and the rendered headings, so they always match. */
export const slugify = (text: string) =>
    text
        .toLowerCase()
        .replace(/[*_`]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

/** Dates are stored as "YYYY-MM-DD"; format in UTC so the day never shifts with the viewer's timezone. */
export const formatPostDate = (
    date: string,
    style: 'long' | 'short' = 'long',
) => {
    const d = new Date(`${date}T00:00:00Z`);
    if (Number.isNaN(d.getTime())) return date;
    return d.toLocaleDateString('en-GB', {
        timeZone: 'UTC',
        day: 'numeric',
        month: style === 'long' ? 'long' : 'short',
        year: 'numeric',
    });
};

export const extractToc = (markdown: string): TocItem[] => {
    const items: TocItem[] = [];
    let inFence = false;
    for (const line of markdown.split('\n')) {
        if (line.trim().startsWith('```')) inFence = !inFence;
        if (inFence) continue;
        const m = line.match(/^(##|###)\s+(.+?)\s*$/);
        if (!m) continue;
        const text = m[2].replace(/[*_`]/g, '').trim();
        items.push({ id: slugify(text), text, level: m[1] === '##' ? 2 : 3 });
    }
    return items;
};

export const BLOG_URL = (slug: string) => `/blog/${slug}`;
