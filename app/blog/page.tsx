import { getAllPosts } from '@/lib/blog';
import { TechNationApp } from '@/components/TechNationApp';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Tech Nation — Engineering & Architecture Publication',
    description: 'Thoughts on software engineering, offline-first design, building in Africa, and lessons from real projects by Niwasiima Ashelycole.',
    openGraph: {
        title: 'Tech Nation — Niwasiima Ashelycole',
        description: 'Thoughts on software engineering, offline-first design, building in Africa, and lessons from real projects.',
        url: 'https://ashelycole.dev/blog',
        siteName: 'Tech Nation',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Tech Nation — Niwasiima Ashelycole',
        description: 'Thoughts on software engineering, offline-first design, and building in Africa.',
    },
};

export default function BlogPage() {
    const posts = getAllPosts();

    return <TechNationApp initialPosts={posts} />;
}
