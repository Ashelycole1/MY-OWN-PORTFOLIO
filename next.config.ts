import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const withMDX = createMDX({
    // MDX options (remark/rehype plugins can go here later)
});

const nextConfig: NextConfig = {
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.jsdelivr.net',
            },
            {
                protocol: 'https',
                hostname: 'img.icons8.com',
            },
            {
                protocol: 'https',
                hostname: 'cdn.simpleicons.org',
            },
            {
                protocol: 'https',
                hostname: 'github.com',
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
            },
        ],
    },
};

export default withMDX(nextConfig);
