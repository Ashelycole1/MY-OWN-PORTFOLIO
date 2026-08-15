'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { BlogPost } from '@/lib/blog';
import { TechNationFeed } from './TechNationFeed';
import { TechNationArticleReader } from './TechNationArticleReader';

interface TechNationAppProps {
    initialPosts: BlogPost[];
}

function TechNationContent({ initialPosts }: TechNationAppProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const postSlugParam = searchParams.get('post');

    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(() => {
        if (postSlugParam) {
            return initialPosts.find((p) => p.slug === postSlugParam) || null;
        }
        return null;
    });

    // Synchronize if URL search param changes
    useEffect(() => {
        if (postSlugParam) {
            const found = initialPosts.find((p) => p.slug === postSlugParam);
            if (found) {
                setSelectedPost(found);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } else {
            setSelectedPost(null);
        }
    }, [postSlugParam, initialPosts]);

    const handleSelectPost = (post: BlogPost) => {
        setSelectedPost(post);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        router.push(`/blog?post=${post.slug}`, { scroll: false });
    };

    const handleBackToFeed = () => {
        setSelectedPost(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        router.push('/blog', { scroll: false });
    };

    if (selectedPost) {
        return (
            <TechNationArticleReader
                post={selectedPost}
                allPosts={initialPosts}
                onBack={handleBackToFeed}
                onSelectPost={handleSelectPost}
            />
        );
    }

    return (
        <main className="container py-24 md:py-32 min-h-[80vh]">
            <TechNationFeed posts={initialPosts} onSelectPost={handleSelectPost} />
        </main>
    );
}

export function TechNationApp({ initialPosts }: TechNationAppProps) {
    return (
        <Suspense fallback={<div className="container py-32 text-center text-muted-foreground">Loading Tech Nation...</div>}>
            <TechNationContent initialPosts={initialPosts} />
        </Suspense>
    );
}

export default TechNationApp;
