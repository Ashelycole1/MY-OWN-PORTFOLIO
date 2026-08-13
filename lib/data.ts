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
        description: `
      Architected a mobile-responsive application based on the 1995 Ugandan Constitution to help local citizens and law students seamlessly access and understand their legal rights. <br/> <br/>
      
      Key Features:<br/>
      <ul>
        <li>📜 Constitutional Access: Complete 1995 Ugandan Constitution integration for easy reading and reference.</li>
        <li>📱 Mobile-Responsive: Fully optimized layout for seamless user experience on all device sizes.</li>
        <li>🔌 Reliable Infrastructure: Designed to operate efficiently in both offline and online local settings.</li>
        <li>⚖️ Legal Empowerment: Promotes awareness and accessibility of legal rights to ordinary citizens.</li>
      </ul>
      `,
        role: `
      Lead Software Engineer <br/>
      Designed and developed the platform:
      <ul>
        <li>✅ UI/UX Design: Tailored the user interface for high accessibility and ease of navigation.</li>
        <li>✅ Offline Infrastructure: Engineered offline capabilities to ensure availability in low-connectivity areas.</li>
        <li>✅ Legal Structure Compliance: Formatted complex constitutional articles into readable digital elements.</li>
      </ul>
      `,
        techStack: [
            'React',
            'Tailwind CSS',
            'Offline Storage',
            'Mobile-Responsive',
        ],
        thumbnail: '/projects/thumbnail/law-buddy/law-buddy.jpeg',
        longThumbnail: '/projects/long/law-buddy/law-buddy.jpeg',
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
        description: `
      Built an interactive, bilingual career readiness assessment mini-app for the organization <i>Kuelimika Kwa Africa</i> to evaluate user core competencies. <br/> <br/>
      
      Key Features:<br/>
      <ul>
        <li>🗣️ Bilingual Assessment: Seamless language selection between English and Swahili to expand reach.</li>
        <li>🧠 AI Guidance: Dynamically delivers personalized career counseling based on response analysis.</li>
        <li>📊 Competency Evaluation: Evaluates core competencies with clear, understandable diagnostic feedback.</li>
      </ul>
      `,
        role: `
      Frontend & Prompt Engineer <br/>
      Owned frontend implementation and AI logic:
      <ul>
        <li>✅ UI Development: Built a clean, mobile-first interface optimized for usability.</li>
        <li>✅ Prompt Orchestration: Constructed a highly optimized master prompt orchestration layer for AI output.</li>
        <li>✅ Organization Integration: Collaborated with Kuelimika Kwa Africa to refine the assessment rubric.</li>
      </ul>
      `,
        techStack: [
            'React',
            'Next.js',
            'Tailwind CSS',
            'Prompt Engineering',
            'AI Orchestration',
        ],
        thumbnail: '/projects/thumbnail/devLinks.jpg',
        longThumbnail: '/projects/long/devLinks.jpg',
        images: [
            '/projects/images/devLinks-1.png',
            '/projects/images/devLinks-2.png',
        ],
    },
    {
        title: 'Eco Farm',
        slug: 'eco-farm',
        year: 2026,
        description: `
      Developed a sustainable agricultural technology solution and successfully showcased the platform at the 4th National Appropriate Technologies Expo at the UMA Showgrounds. <br/> <br/>
      
      Key Features:<br/>
      <ul>
        <li>🌱 Sustainable Tech: Designed to help farmers optimize agricultural yields and manage resources.</li>
        <li>📊 Data Visualizations: Presents complex data patterns to expo attendees and local stakeholders.</li>
        <li>🚀 Expo Ready: Designed for high reliability during live demonstrations and presentations.</li>
      </ul>
      `,
        role: `
      Full-Stack Developer <br/>
      Led application architectural design and deployment:
      <ul>
        <li>✅ Core Architecture: Designed and optimized database structures and system services.</li>
        <li>✅ Frontend Design: Crafted interactive, responsive user interfaces.</li>
        <li>✅ Public Showcase: Presented the system live to industry experts at UMA Showgrounds.</li>
      </ul>
      `,
        techStack: [
            'Next.js',
            'LangChain',
            'MiniPay',
            'Node.js',
            'React',
        ],
        thumbnail: '/projects/thumbnail/mti-electronics.webp',
        longThumbnail: '/projects/long/mti-electronics.webp',
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
        description: `
      Peer-to-peer car rental platform. <br/> <br/>
      
      Key Features:<br/>
      <ul>
        <li>🚗 P2P Rental: Connects car owners directly with renters.</li>
        <li>🔐 Secure Platform: Verified users and secure payments.</li>
      </ul>
      `,
        role: `
      Full-Stack Developer <br/>
      Led application development and UI design.
      `,
        techStack: [
            'Next.js',
            'React',
            'Tailwind CSS',
        ],
        thumbnail: '/projects/thumbnail/TODO-replace-with-real-screenshot.jpg',
        longThumbnail: '/projects/long/TODO-replace-with-real-screenshot.jpg',
        images: [],
        liveUrl: 'https://driveug.vercel.app',
    },
    {
        title: 'Palg Drip',
        slug: 'palg-drip',
        year: 2026,
        description: `
      E-commerce platform. <br/> <br/>
      
      Key Features:<br/>
      <ul>
        <li>🛒 Shopping Cart: Seamless product browsing and checkout.</li>
        <li>💳 Online Payments: Secure integrated payment gateways.</li>
      </ul>
      `,
        role: `
      Full-Stack Developer <br/>
      Led application development and UI design.
      `,
        techStack: [
            'Next.js',
            'React',
            'Tailwind CSS',
        ],
        thumbnail: '/projects/thumbnail/TODO-replace-with-real-screenshot.jpg',
        longThumbnail: '/projects/long/TODO-replace-with-real-screenshot.jpg',
        images: [],
        liveUrl: 'https://palgdrip.vercel.app',
    },
    {
        title: 'AccommodateMe',
        slug: 'accommodate-me',
        year: 2026,
        description: `
      Accommodation listing platform. <br/> <br/>
      
      Key Features:<br/>
      <ul>
        <li>🏠 Property Listings: Browse and list accommodations easily.</li>
        <li>📅 Booking System: Integrated availability and booking.</li>
      </ul>
      `,
        role: `
      Full-Stack Developer <br/>
      Led application development and UI design.
      `,
        techStack: [
            'Next.js',
            'React',
            'Tailwind CSS',
        ],
        thumbnail: '/projects/thumbnail/TODO-replace-with-real-screenshot.jpg',
        longThumbnail: '/projects/long/TODO-replace-with-real-screenshot.jpg',
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
