import { Experience } from '@/types/content';

// Source of truth: DESIGN.md §3.5. Newest first.
// Akili Za Kesho starts April 2026. Freelance starts August 2025. GitHub rank is 63rd.
export const experience: Experience[] = [
    {
        title: 'Co-Founder & Chief Technology Officer',
        org: 'RENOA',
        location: 'Kampala, Uganda',
        start: '2026-04',
        tag: 'work',
        bullets: [
            'Lead technical delivery for a six-person founding team building web apps, agentic AI and gamified systems.',
            'Own architecture, code review and deployment for studio and client products.',
        ],
    },
    {
        title: 'Technical Trainer',
        org: 'Akili Za Kesho Ventures',
        location: 'Kampala, Uganda',
        start: '2026-04',
        tag: 'volunteer',
        bullets: [
            'Train interns on practical development skills, GitHub workflows and responsible AI use.',
            'Deliver hands-on capacity-building sessions for local youth.',
        ],
    },
    {
        title: 'AWS Student Builder Group Leader',
        org: 'Cavendish University Uganda',
        start: '2026',
        tag: 'leadership',
        bullets: [
            'Lead the campus AWS student builder community; AWS SBG Leader badge issued October 2026.',
        ],
    },
    {
        title: 'Technical Programs Coordinator, Projects & Innovation',
        org: 'IEEE Student Branch, Cavendish University Uganda',
        start: '2026',
        tag: 'leadership',
        bullets: [
            'Coordinate student projects, hackathons and innovation challenges.',
            'Helped organise IEEE Day Uganda 2026.',
        ],
    },
    {
        title: 'PR & Partnerships Officer',
        org: "CUUCSA (Computer Students' Association)",
        start: '2026',
        tag: 'leadership',
        bullets: [
            'Manage partnerships and public communication for the association.',
        ],
    },
    {
        title: 'Active Open-Source Contributor',
        org: 'GitHub',
        start: '2026-05',
        tag: 'community',
        bullets: [
            "Ranked 63rd among Uganda's open-source contributors on committers.top.",
        ],
    },
    {
        title: 'Freelance Web Developer',
        org: 'Self-employed',
        location: 'Kampala, Uganda',
        start: '2025-08',
        tag: 'freelance',
        bullets: [
            'Build and deliver websites and web apps for clients, with documented design and upgrade plans.',
            'Completed technical assessments for a booking site and an e-commerce site.',
        ],
    },
];

const MONTHS = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/** "2026-04" -> "Apr 2026", "2026" -> "2026" */
export const formatYearMonth = (value: string) => {
    const [year, month] = value.split('-');
    return month ? `${MONTHS[Number(month) - 1]} ${year}` : year;
};

export const formatRange = (start: string, end?: string) =>
    `${formatYearMonth(start)} – ${end ? formatYearMonth(end) : 'Present'}`;
