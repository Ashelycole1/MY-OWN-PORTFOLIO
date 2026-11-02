import {
    Education,
    Recognition,
    StackGroup,
    Stat,
} from '@/types/content';

// Source of truth: DESIGN.md §3.1–3.4, §3.6, §3.7, §3.10, §3.11

export const SITE = {
    url: 'https://ashelycole.dev',
    name: 'Niwasiima Ashelycole',
    jobTitle: 'Full Stack Developer',
    title: 'Niwasiima Ashelycole — Full Stack Developer',
    description:
        'Niwasiima Ashelycole, full stack web developer in Kampala building offline-first, AI and mobile money products for East Africa.',
};

export const CONTACT = {
    email: 'coleniwasiima@gmail.com',
    emailSubject: "Let's collaborate on a project",
    emailBody: 'Hi Niwasiima, I am reaching out to you because...',
    phone: '+256 767 024 153',
    phoneHref: 'tel:+256767024153',
    // Replace the file at this path with the November 2026 CV (DESIGN.md §3.10).
    resume: '/Niwasiima_Ashelycole_CV_2026.pdf',
    github: 'https://github.com/Ashelycole1',
    linkedin: 'https://www.linkedin.com/in/niwasiima-ashelycole-091698390',
};

export const HERO = {
    titleTop: 'FULL STACK',
    titleBottom: 'DEVELOPER',
    name: 'Niwasiima Ashelycole',
    intro: 'I build and ship web apps for East Africa, from offline-first systems and mobile money flows to AI agents. Co-Founder and CTO at RENOA.',
    status: 'Open to developer roles and contracts',
};

export const STATS: Stat[] = [
    { value: '2+', label: 'Years building' },
    { value: '13+', label: 'Projects shipped' },
    { value: '63rd', label: 'GitHub contributor in Uganda' },
];

export const ABOUT = {
    paragraphs: [
        "I'm a full-stack web developer in Kampala. I design databases and APIs and build responsive interfaces, with a growing focus on AI features.",
        'I build for East African realities: unreliable internet, local languages, mobile money and community trust.',
        'I lead technical delivery at RENOA and train young developers at Akili Za Kesho Ventures.',
    ],
    closing: "I don't always have a solution, but I know how to find one.",
};

const devicon = (path: string) =>
    `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${path}`;
const simpleicon = (slug: string, color?: string) =>
    `https://cdn.simpleicons.org/${slug}${color ? `/${color}` : ''}`;

export const STACK: StackGroup[] = [
    {
        group: 'Frontend',
        items: [
            { name: 'React', icon: devicon('react/react-original.svg') },
            { name: 'Next.js', icon: devicon('nextjs/nextjs-original.svg') },
            { name: 'TypeScript', icon: devicon('typescript/typescript-original.svg') },
            { name: 'Tailwind CSS', icon: devicon('tailwindcss/tailwindcss-original.svg') },
            { name: 'Flutter', icon: devicon('flutter/flutter-original.svg') },
        ],
    },
    {
        group: 'Backend',
        items: [
            { name: 'Node.js', icon: devicon('nodejs/nodejs-original.svg') },
            { name: 'Django', icon: simpleicon('django', '44B78B') },
            { name: 'FastAPI', icon: devicon('fastapi/fastapi-original.svg') },
            { name: 'REST APIs' },
        ],
    },
    {
        group: 'Data',
        items: [
            { name: 'PostgreSQL', icon: devicon('postgresql/postgresql-original.svg') },
            { name: 'MySQL', icon: devicon('mysql/mysql-original.svg') },
            { name: 'Supabase', icon: devicon('supabase/supabase-original.svg') },
            { name: 'Firebase', icon: devicon('firebase/firebase-original.svg') },
            { name: 'MongoDB', icon: devicon('mongodb/mongodb-original.svg') },
        ],
    },
    {
        group: 'AI',
        items: [
            { name: 'LangChain', icon: simpleicon('langchain', 'white') },
            { name: 'LangGraph', icon: simpleicon('langgraph', 'white') },
            { name: 'MCP', icon: simpleicon('modelcontextprotocol', 'white') },
            { name: 'LLM APIs' },
        ],
    },
    {
        group: 'Cloud & DevOps',
        items: [
            { name: 'Git', icon: devicon('git/git-original.svg') },
            { name: 'GitHub', icon: devicon('github/github-original.svg') },
            { name: 'Docker', icon: devicon('docker/docker-original.svg') },
            { name: 'Vercel', icon: simpleicon('vercel', 'white') },
            { name: 'Netlify', icon: simpleicon('netlify', '00C7B7') },
            { name: 'AWS', icon: '/logo/aws.png' },
            { name: 'Kubernetes', icon: devicon('kubernetes/kubernetes-original.svg') },
        ],
    },
    {
        group: 'Tools',
        items: [
            { name: 'Clerk', icon: simpleicon('clerk', '6C47FF') },
            { name: 'Figma', icon: devicon('figma/figma-original.svg') },
            { name: 'VS Code', icon: devicon('vscode/vscode-original.svg') },
            { name: 'Cursor', icon: simpleicon('cursor', 'white') },
            { name: 'Claude Code', icon: simpleicon('anthropic', 'white') },
        ],
    },
];

export const EDUCATION: Education[] = [
    {
        degree: 'Bachelor of Software Engineering',
        institution: 'Cavendish University Uganda',
        expected: 'Expected January 2029',
    },
];

export const RECOGNITION: Recognition[] = [
    {
        title: '3rd Prize, Southern Africa Regional Huawei ICT Competition, Cloud Track',
        year: '2026',
    },
    { title: 'Selected for UCC Testbed Hackathon 2026 (1 of 40)', year: '2026' },
    {
        title: 'GopherCon Africa 2026 delegate, Nairobi (1 of 15 from Uganda)',
        year: '2026',
    },
    {
        title: 'Eco Farm showcased at the 4th National Appropriate Technologies Expo',
    },
    {
        title: 'Organised a Chainlink Web3 meetup at Cavendish University Uganda',
    },
];

export const SECTION_IDS = {
    projects: 'projects',
    experience: 'experience',
    recognition: 'recognition',
    stack: 'skills',
    certifications: 'certifications',
    education: 'education',
    about: 'about-me',
    contact: 'contact',
} as const;
