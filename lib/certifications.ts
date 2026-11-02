import { Certification } from '@/types/content';

// Source of truth: DESIGN.md §3.9. Spell it "Kuelimika Kwa Afrika".
// verifyUrl points to the certificate PDF in /public where one exists.
export const certifications: Certification[] = [
    {
        issuer: 'AWS Community',
        name: 'AWS Student Builder Group Leader Badge',
        date: 'October 2026',
    },
    {
        issuer: 'Huawei',
        name: 'HCIA-AI V4.0 (incl. Colombia Training Program)',
        date: 'October 2025',
        badgeImage: '/certifications/hcia-ai-v4.jpeg',
        verifyUrl: '/certifications/hcia-ai-v4.pdf',
    },
    {
        issuer: 'Huawei',
        name: 'HCIA-Cloud Computing V5.5',
        date: 'October 2025',
        badgeImage: '/certifications/hcia-cloud-computing-v5.jpeg',
        verifyUrl: '/certifications/hcia-cloud-computing-v5.pdf',
    },
    {
        issuer: 'Huawei',
        name: 'HCIA-Cloud Service V3.5',
        date: 'October 2025',
        badgeImage: '/certifications/hcia-cloud-service-v3.jpeg',
        verifyUrl: '/certifications/hcia-cloud-service-v3.pdf',
    },
    {
        issuer: 'IBM',
        name: 'Systems Analysis Essentials',
        date: 'March 2026',
        badgeImage: '/certifications/systems-analysis-badge.png',
        verifyUrl: '/certifications/systems-analysis.pdf',
    },
    {
        issuer: 'The Linux Foundation',
        name: 'Introduction to Kubernetes (LFS158)',
        badgeImage: '/certifications/kubernetes-lfs158-badge.png',
        verifyUrl: '/certifications/linux-foundation-lfs158.pdf',
    },
    {
        issuer: 'Cyfrin Updraft',
        name: 'Blockchain Basics',
        date: 'July 2026',
        badgeImage: '/certifications/blockchain-basics-badge.webp',
    },
    {
        issuer: 'AfriLabs',
        name: 'Digital Entrepreneurship Skills',
        date: 'March 2025',
        badgeImage: '/certifications/digital-entrepreneurship.jpeg',
        verifyUrl: '/certifications/digital-entrepreneurship.pdf',
    },
    {
        issuer: 'Coursera',
        name: 'Everyday Excel',
        date: 'September 2025',
        badgeImage: '/certifications/excel-badge.jpeg',
    },
    {
        issuer: 'Kuelimika Kwa Afrika',
        // TODO(owner): certificate name (DESIGN.md §9)
        name: 'Certificate',
        badgeImage: '/certifications/kuelimika.jpeg',
        verifyUrl: '/certifications/kuelimika.pdf',
    },
];
