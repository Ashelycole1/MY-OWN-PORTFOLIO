import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArticleReader from '@/components/blog/ArticleReader';
import {
    getAdjacentPosts,
    getAllPosts,
    getPostBySlug,
    getRelatedPosts,
} from '@/lib/blog';
import { BLOG_URL, extractToc } from '@/lib/blog-shared';
import { CONTACT, SITE } from '@/lib/profile';

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export const generateStaticParams = async () =>
    getAllPosts().map((post) => ({ slug: post.slug }));

export const generateMetadata = async ({
    params,
}: Params): Promise<Metadata> => {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return {};

    const url = `${SITE.url}${BLOG_URL(post.slug)}`;
    return {
        title: `${post.title} — Tech Nation`,
        description: post.excerpt,
        keywords: post.tags,
        alternates: { canonical: BLOG_URL(post.slug) },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url,
            type: 'article',
            publishedTime: post.date,
            authors: [SITE.name],
            tags: post.tags,
            ...(post.coverImage ? { images: [{ url: post.coverImage }] } : {}),
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            ...(post.coverImage ? { images: [post.coverImage] } : {}),
        },
    };
};

export default async function BlogPostPage({ params }: Params) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) notFound();

    const { newer, older } = getAdjacentPosts(slug);
    const related = getRelatedPosts(post);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        keywords: post.tags.join(', '),
        url: `${SITE.url}${BLOG_URL(post.slug)}`,
        ...(post.coverImage ? { image: `${SITE.url}${post.coverImage}` } : {}),
        author: {
            '@type': 'Person',
            name: SITE.name,
            url: SITE.url,
            sameAs: [CONTACT.github, CONTACT.linkedin],
        },
        publisher: { '@type': 'Person', name: SITE.name, url: SITE.url },
        mainEntityOfPage: `${SITE.url}${BLOG_URL(post.slug)}`,
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ArticleReader
                post={post}
                toc={extractToc(post.content)}
                newer={newer}
                older={older}
                related={related}
            />
        </>
    );
}
