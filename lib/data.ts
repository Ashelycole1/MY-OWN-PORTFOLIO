import { IProject } from '@/types';

export const GENERAL_INFO = {
    email: 'coleniwasiima@gmail.com',

    emailSubject: "Let's collaborate on a project",
    emailBody: 'Hi Niwasiima, I am reaching out to you because...',
};

export const SOCIAL_LINKS = [
    { name: 'github', url: 'https://github.com/Ashelycole1' },
    { name: 'linkedin', url: 'https://www.linkedin.com/in/niwasiima-ashelycole-091698390' },
];

export const MY_STACK = {
    programming: [
        {
            name: 'Python',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
        },
        {
            name: 'JS',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
        },
        {
            name: 'TS',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
        },
        {
            name: 'C',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg',
        },
        {
            name: 'HTML',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
        },
        {
            name: 'CSS',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
        },
        {
            name: 'Bash',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg',
        },
        {
            name: 'React',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
        },
        {
            name: 'Next.js',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
        },
        {
            name: 'Node',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
        },
        {
            name: 'MySQL',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
        },
        {
            name: 'PostgreSQL',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
        },
    ],
    tools: [
        {
            name: 'Clerk',
            icon: 'https://cdn.simpleicons.org/clerk/6C47FF',
        },
        {
            name: 'Firebase',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg',
        },
        {
            name: 'Supabase',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg',
        },
        {
            name: 'Git',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
        },
        {
            name: 'Github',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
        },
        {
            name: 'VS Code',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg',
        },
        {
            name: 'Cursor',
            icon: 'https://cdn.simpleicons.org/cursor',
        },
        {
            name: 'Claude Code',
            icon: 'https://cdn.simpleicons.org/anthropic',
        },
        {
            name: 'Antigravity',
            icon: 'https://cdn.simpleicons.org/google',
        },
        {
            name: 'Z.AI',
            icon: 'https://cdn.simpleicons.org/openai',
        },
        {
            name: 'Vercel',
            icon: 'https://cdn.simpleicons.org/vercel',
        },
        {
            name: 'Netlify',
            icon: 'https://cdn.simpleicons.org/netlify/00C7B7',
        },
        {
            name: 'Figma',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg',
        },
        {
            name: 'CMD',
            icon: 'https://cdn.simpleicons.org/windowsterminal',
        },
        {
            name: 'MS Office',
            icon: 'https://cdn.simpleicons.org/microsoftoffice/D83B01',
        },
        {
            name: 'MS Access',
            icon: 'https://cdn.simpleicons.org/microsoftaccess/A4373A',
        },
        {
            name: 'Powerpoint',
            icon: 'https://cdn.simpleicons.org/microsoftpowerpoint/B7472A',
        },
    ],
};

export const PROJECTS: IProject[] = [
    {
        title: 'Law Buddy',
        slug: 'law-buddy',
        year: 2025,
        problem: 'Citizens and law students in Uganda struggled to access and understand their legal rights due to complex, inaccessible formats.',
        constraint: 'Required high availability even in rural, low-connectivity areas across Uganda without sacrificing performance.',
        build: [
            'Architected a fully mobile-responsive offline-first application.',
            'Integrated the complete 1995 Ugandan Constitution into searchable, readable digital elements.',
            'Engineered local caching to ensure availability without internet access.'
        ],
        result: 'Empowered thousands of citizens with on-demand legal knowledge, increasing rights awareness and accessibility.',
        techStack: [
            'React',
            'Tailwind CSS',
            'Offline Storage',
            'Mobile-Responsive',
        ],
        thumbnail: '/projects/images/law-buddy/lawbuddy-cover.png',
        longThumbnail: '/projects/images/law-buddy/lawbuddy-cover.png',
        images: [
            '/projects/images/law-buddy/law-buddy-0.jpeg',
            '/projects/images/law-buddy/law-buddy-0.1.jpeg',
            '/projects/images/law-buddy/law-buddy-1.jpeg',
            '/projects/images/law-buddy/law-buddy-2.jpeg',
            '/projects/images/law-buddy/law-buddy-3.jpeg',
            '/projects/images/law-buddy/law-buddy-4.jpeg',
        ],
        liveUrl: 'https://uglawbuddy.vercel.app',
    },
    {
        title: 'Rafiki',
        slug: 'rafiki',
        year: 2026,
        problem: 'Many youth lacked access to personalized career guidance and competency evaluations in their native languages.',
        constraint: 'Needed to seamlessly support bilingual users (English and Swahili) while dynamically generating accurate AI counseling.',
        build: [
            'Developed an interactive bilingual career readiness assessment mini-app.',
            'Constructed an optimized master prompt orchestration layer to guide AI output.',
            'Collaborated with Kuelimika Kwa Africa to digitize their assessment rubric.'
        ],
        result: 'Delivered personalized, diagnostic feedback to users, expanding the organization\'s reach across East Africa.',
        techStack: [
            'React',
            'Next.js',
            'Tailwind CSS',
            'Prompt Engineering',
            'AI Orchestration',
        ],
        thumbnail: '/projects/images/Rafiki-app/rafiki-cover.png',
        longThumbnail: '/projects/images/Rafiki-app/rafiki-cover.png',
        images: [
            '/projects/images/devLinks-1.png',
            '/projects/images/devLinks-2.png',
        ],
    },
    {
        title: 'Eco Farm',
        slug: 'eco-farm',
        year: 2026,
        problem: 'Local farmers needed sustainable, data-driven agricultural technology to optimize yields but lacked accessible tools.',
        constraint: 'The platform had to be highly reliable and visually impactful for live demonstrations at the 4th National Appropriate Technologies Expo.',
        build: [
            'Designed core architecture and optimized database structures for agricultural data.',
            'Crafted interactive, responsive dashboards for complex data patterns.',
            'Integrated MiniPay and LangChain to support smart agricultural insights.'
        ],
        result: 'Successfully showcased at UMA Showgrounds, capturing the attention of industry experts and local stakeholders.',
        techStack: [
            'Next.js',
            'LangChain',
            'MiniPay',
            'Node.js',
            'React',
        ],
        thumbnail: '/projects/images/ecofarm/ecofarm-cover.png',
        longThumbnail: '/projects/images/ecofarm/ecofarm-cover.png',
        images: [
            '/projects/images/mti-electronics-1.webp',
            '/projects/images/mti-electronics-2.webp',
        ],
        liveUrl: 'https://ecofarmug.vercel.app',
    },
    {
        title: 'DriveUG',
        slug: 'driveug',
        year: 2026,
        problem: 'Renters and car owners lacked a secure, localized peer-to-peer car rental platform.',
        constraint: 'Building trust required seamless user verification and a highly secure payment gateway.',
        build: [
            'Engineered a robust peer-to-peer rental marketplace connecting owners directly with renters.',
            'Integrated secure, encrypted payment systems for local transactions.',
            'Designed an intuitive mobile-first UI for rapid booking.'
        ],
        techStack: [
            'Next.js',
            'React',
            'Tailwind CSS',
        ],
        thumbnail: '/projects/images/drive ug/driveug-cover.png',
        longThumbnail: '/projects/images/drive ug/driveug-cover.png',
        images: [],
        liveUrl: 'https://driveug.vercel.app',
    },
    {
        title: 'Palg Drip',
        slug: 'palg-drip',
        year: 2026,
        problem: 'Local merchants needed a streamlined e-commerce solution with integrated shopping cart and localized payments.',
        constraint: 'Required high performance and seamless cart state management across sessions.',
        build: [
            'Built a full-featured e-commerce platform with smooth product browsing.',
            'Integrated secure payment gateways tailored for local transactions.',
            'Optimized the checkout flow to reduce cart abandonment.'
        ],
        techStack: [
            'Next.js',
            'React',
            'Tailwind CSS',
        ],
        thumbnail: '/projects/images/palgdrip/palgdrip-cover.png',
        longThumbnail: '/projects/images/palgdrip/palgdrip-cover.png',
        images: [],
        liveUrl: 'https://palgdrip.vercel.app',
    },
    {
        title: 'AccommodateMe',
        slug: 'accommodate-me',
        year: 2026,
        problem: 'Finding verified accommodation listings was tedious and fragmented for users.',
        constraint: 'Handling complex availability calendars and real-time booking synchronization.',
        build: [
            'Developed a centralized accommodation listing platform.',
            'Implemented an integrated availability calendar and booking system.',
            'Designed a clean, map-integrated UI for property browsing.'
        ],
        techStack: [
            'Next.js',
            'React',
            'Tailwind CSS',
        ],
        thumbnail: '/projects/images/accomodate-me/accommodateme-cover.png',
        longThumbnail: '/projects/images/accomodate-me/accommodateme-cover.png',
        images: [],
        liveUrl: 'https://accomodateme.vercel.app',
    },
];

export const MY_EXPERIENCE = [
    {
        title: 'Co-Founder & Chief Technology Officer',
        company: 'RENOA',
        duration: 'Apr 2026 - Present',
    },
    {
        title: 'GitHub Developer Community Active Contributor',
        company: 'GitHub (Ranked 112nd nationally in Uganda)',
        duration: 'May 2026 - Present',
    },
    {
        title: 'Technical Trainer & Volunteer',
        company: 'Akili Za Kesho Ventures',
        duration: 'May 2026 - Present',
    },
    {
        title: 'Regional Finalist & 3rd Prize Winner',
        company: 'Huawei ICT Competition (Cloud Track)',
        duration: 'Sep 2025 - Mar 2026',
    },
    {
        title: 'Regional Stage Lab Competitor',
        company: 'Huawei ICT Competition (Cloud Track)',
        duration: 'Feb 2026 - Mar 2026',
    },
];
