import type { Metadata } from 'next';
import BlogIndex from '@/components/blog/BlogIndex';
import { getAllPostMeta } from '@/lib/blog';
import { SITE } from '@/lib/profile';

const description =
    'Notes on software engineering, offline-first design, building in Africa, and lessons from real projects by Niwasiima Ashelycole.';

export const metadata: Metadata = {
    title: `Tech Nation — Blog by ${SITE.name}`,
    description,
    alternates: {
        canonical: '/blog',
        types: { 'application/rss+xml': '/blog/rss.xml' },
    },
    openGraph: {
        title: `Tech Nation — ${SITE.name}`,
        description,
        url: `${SITE.url}/blog`,
        siteName: SITE.name,
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: `Tech Nation — ${SITE.name}`,
        description,
    },
};

export default function BlogPage() {
    return (
        <main className="container min-h-[80vh] py-24 md:py-32">
            <BlogIndex posts={getAllPostMeta()} />
        </main>
    );
}
