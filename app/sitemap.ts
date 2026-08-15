import { MetadataRoute } from 'next';
import { PROJECTS } from '@/lib/data';
import { getAllPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://ashelycole.dev';
    const now = new Date();

    // 1. Core Section Pages
    const mainSections: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: now,
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: now,
            changeFrequency: 'daily',
            priority: 0.95,
        },
        {
            url: `${baseUrl}/#about-me`,
            lastModified: now,
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/#selected-projects`,
            lastModified: now,
            changeFrequency: 'daily',
            priority: 0.85,
        },
        {
            url: `${baseUrl}/#skills`,
            lastModified: now,
            changeFrequency: 'daily',
            priority: 0.75,
        },
        {
            url: `${baseUrl}/#experience`,
            lastModified: now,
            changeFrequency: 'daily',
            priority: 0.75,
        },
        {
            url: `${baseUrl}/#contact`,
            lastModified: now,
            changeFrequency: 'daily',
            priority: 0.8,
        },
    ];

    // 2. All Project Case Studies
    const projectUrls: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
        url: `${baseUrl}/projects/${project.slug}`,
        lastModified: now,
        changeFrequency: 'daily',
        priority: 0.85,
    }));

    // 3. All Tech Nation Articles / Dispatches
    const blogPosts = getAllPosts();
    const blogUrls: MetadataRoute.Sitemap = blogPosts.map((post) => ({
        url: `${baseUrl}/blog?post=${post.slug}`,
        lastModified: new Date(post.date || now),
        changeFrequency: 'daily',
        priority: 0.9,
    }));

    return [
        ...mainSections,
        ...projectUrls,
        ...blogUrls,
    ];
}
