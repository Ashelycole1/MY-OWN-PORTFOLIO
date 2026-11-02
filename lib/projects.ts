import { Project } from '@/types/content';

// Source of truth: DESIGN.md §3.8. Keep in sync with the CV.
// AUDITLOGS: never name the client. Use "an internal audit function in Uganda".
const ALL_PROJECTS: Project[] = [
    {
        slug: 'lawbuddy',
        title: 'Law Buddy',
        featured: true,
        order: 1,
        team: false,
        problem:
            'Ugandans struggle to find and understand their constitutional rights.',
        summary:
            "AI legal assistant that answers strictly from Uganda's 1995 Constitution, with a library, chat and article comparison.",
        tags: ['Flutter', 'Dart', 'LLM'],
        live: 'https://uglawbuddy.vercel.app',
        repo: 'https://github.com/Ashelycole1/LAWBUDDY',
        image: '/projects/images/law-buddy/lawbuddy-cover.png',
    },
    {
        slug: 'auditlogs',
        title: 'AUDITLOGS',
        featured: true,
        order: 2,
        team: false,
        problem:
            'Internal audit teams track queries in spreadsheets and email with weak accountability.',
        summary:
            'Role-based audit query follow-up system with assignment, approval workflow and full change logging, built for an internal audit function in Uganda.',
        tags: ['Django', 'React', 'PostgreSQL', 'Docker'],
        live: 'https://auditlog.ashelycole.dev',
        repo: 'https://github.com/Ashelycole1/AUDITLOGS',
        image: '/projects/images/auditlogs/auditlogs-cover.png',
    },
    {
        slug: 'mdaad-now',
        title: 'Mdaad Now',
        featured: true,
        order: 3,
        team: true,
        role: 'Backend Developer',
        problem:
            'Aid workers in conflict zones lose connectivity when coordination matters most.',
        summary:
            'Offline-first PWA for crisis response, aid mapping and emergency coordination.',
        tags: ['React', 'Leaflet', 'PWA', 'Node.js'],
        live: 'https://mdaad-now.vercel.app',
        repo: 'https://github.com/evansrwothomio20-web/Mdaad-Now',
        image: '/projects/images/mdaad-now/mdaad-now-cover.png',
    },
    {
        slug: 'agrimoist-ai',
        title: 'AgriMoist AI',
        featured: true,
        order: 4,
        team: true,
        role: 'Built the core agent',
        problem:
            "Extension officers in Karamoja can't reach every farmer with timely advice.",
        summary:
            'AI advisory agent with an extension-officer approval gate and USSD and web channels.',
        tags: ['Python', 'FastAPI', 'LangGraph', 'MCP'],
        live: 'https://agri-moist-ai.onrender.com',
        repo: 'https://github.com/VictoriaMirembe/Agri-moist-AI',
    },
    {
        slug: 'esms',
        title: 'ESMS',
        featured: true,
        order: 5,
        team: true,
        role: 'Full Stack Developer & Architect',
        problem:
            'Universities run admissions, fees, academics and staff on disconnected tools.',
        summary:
            'Multi-tenant university management system with UGX fees, mobile money, admissions and staff workflows.',
        tags: ['Next.js', 'TypeScript', 'Supabase', 'Clerk'],
        live: 'https://esms-beta.vercel.app',
        repo: 'https://github.com/EGABO-TECH/ESMS',
    },
    {
        slug: 'ecofarm',
        title: 'Eco Farm',
        featured: true,
        order: 6,
        team: false,
        problem:
            'Farmers lack one place for markets, advice and crop tracking in their own language.',
        summary:
            'Marketplace, community, chat, alerts and farm tracking in six Ugandan languages.',
        // Verified against the repo's package.json (Next.js + Supabase).
        tags: ['Next.js', 'Supabase', 'PostgreSQL'],
        live: 'https://ecofarmug.vercel.app',
        repo: 'https://github.com/Ashelycole1/Ecofarm',
        image: '/projects/images/ecofarm/ecofarm-cover.png',
    },
    {
        slug: 'e-vote',
        title: 'e-Vote',
        featured: false,
        order: 7,
        team: true,
        role: 'Lead Developer',
        problem:
            "Elections can't depend on always-online voting where internet is unreliable.",
        summary: 'Offline-first voting with anonymous cryptographic receipts.',
        tags: ['Next.js', 'TypeScript', 'Supabase', 'Clerk', 'PWA'],
        live: 'https://e-vote-self.vercel.app',
        image: '/projects/images/e-vote/e-vote-cover.png',
    },
    {
        slug: 'the-bookworm',
        title: 'The Bookworm',
        featured: false,
        order: 8,
        team: false,
        problem: 'Readers need a simple way to discover, buy and download books.',
        summary:
            'Digital bookstore PWA with search, cart, checkout and secure downloads via signed URLs.',
        tags: ['Next.js', 'TypeScript', 'MongoDB', 'Cloudflare R2'],
        live: 'https://the-book-worm.app',
        repo: 'https://github.com/Ashelycole1/thebookworm',
        image: '/projects/images/the-bookworm/the-bookworm-cover.png',
    },
    {
        slug: 'pottrust',
        title: 'PotTrust',
        featured: false,
        order: 9,
        team: false,
        problem:
            "Savings groups depend on trust, and one person's records are easy to dispute.",
        summary:
            'Role-based SACCO app for pots, contributions, loans and trust scores.',
        tags: ['React', 'Vite', 'Supabase'],
        live: 'https://pottrust.vercel.app',
        repo: 'https://github.com/Ashelycole1/POTTRUST',
    },
    {
        slug: 'driveug',
        title: 'DriveUG',
        featured: false,
        order: 10,
        team: false,
        problem:
            'Renters and car owners lacked a secure, local peer-to-peer rental platform.',
        summary:
            'Peer-to-peer car rental marketplace with a mobile money roadmap.',
        tags: ['Next.js', 'React', 'Tailwind CSS'],
        live: 'https://driveug.vercel.app',
        image: '/projects/images/drive ug/driveug-cover.png',
    },
    {
        slug: 'rafiki',
        title: 'Rafiki',
        featured: false,
        order: 11,
        team: false,
        problem: 'Youth lacked career guidance in their own languages.',
        summary:
            'Bilingual career readiness app, built and deployed live in one afternoon.',
        tags: ['React', 'Next.js', 'Tailwind CSS'],
        live: 'https://rafikiapp.vercel.app',
        image: '/projects/images/Rafiki-app/rafiki-cover.png',
    },
    {
        slug: 'accommodateme',
        title: 'AccommodateMe',
        featured: false,
        order: 12,
        team: false,
        problem:
            'Students found verified accommodation listings tedious and fragmented.',
        summary:
            'Student housing site with verified listings, a filterable gallery and booking.',
        tags: ['HTML', 'CSS', 'JavaScript'],
        live: 'https://accomodateme.vercel.app',
        repo: 'https://github.com/Ashelycole1/ACCOMODATE-ME',
        image: '/projects/images/accomodate-me/accommodateme-cover.png',
    },
    {
        slug: 'palg-drip',
        title: 'Palg Drip',
        featured: false,
        order: 13,
        team: false,
        problem:
            'Local merchants needed simple e-commerce with a cart and local payments.',
        summary: 'E-commerce storefront with shopping cart and localized payments.',
        tags: ['Next.js', 'React', 'Tailwind CSS'],
        live: 'https://palgdrip.vercel.app',
        image: '/projects/images/palgdrip/palgdrip-cover.png',
    },
];

export const projects: Project[] = [...ALL_PROJECTS].sort(
    (a, b) => a.order - b.order,
);

export const featuredProjects = projects.filter((p) => p.featured);
export const moreProjects = projects.filter((p) => !p.featured);

export const getProject = (slug: string) =>
    projects.find((p) => p.slug === slug);
