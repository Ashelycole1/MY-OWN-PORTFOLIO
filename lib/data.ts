import { IProject } from '@/types';

export const GENERAL_INFO = {
    email: 'coleniwasiima@gmail.com',

    emailSubject: "Let's collaborate on a project",
    emailBody: 'Hi Niwasiima, I am reaching out to you because...',
};

export const SOCIAL_LINKS = [
    { name: 'github', url: 'https://github.com/Ashelycole1' },
    { name: 'linkedin', url: 'https://www.linkedin.com/in/niwasiima-ashelycole' },
];

export const MY_STACK = {
    programming: [
        {
            name: 'Java',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
        },
        {
            name: 'Python',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
        },
        {
            name: 'JavaScript',
            icon: '/logo/js.png',
        },
        {
            name: 'HTML/CSS',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
        },
        {
            name: 'SQL',
            icon: '/logo/mysql.svg',
        },
        {
            name: 'Node.js',
            icon: '/logo/node.png',
        },
        {
            name: 'React.js',
            icon: '/logo/react.png',
        },
        {
            name: 'C',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
        },
    ],
    tools: [
        {
            name: 'Android Studio',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg',
        },
        {
            name: 'AWS',
            icon: '/logo/aws.png',
        },
        {
            name: 'Git',
            icon: '/logo/git.png',
        },
        {
            name: 'Bootstrap',
            icon: '/logo/bootstrap.svg',
        },
        {
            name: 'Agile',
            icon: 'https://cdn.simpleicons.org/scrumalliance',
        },
        {
            name: 'Flask',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',
        },
        {
            name: 'Kubernetes',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
        },
        {
            name: 'Huawei Cloud',
            icon: 'https://cdn.simpleicons.org/huawei',
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
