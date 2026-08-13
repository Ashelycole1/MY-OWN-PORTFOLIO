import AboutMe from './_components/AboutMe';
import Banner from './_components/Banner';
import Experiences from './_components/Experiences';
import Skills from './_components/Skills';
import ProjectList from './_components/ProjectList';
import Script from 'next/script';

export default function Home() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Niwasiima Ashelycole',
        jobTitle: 'Software Engineer',
        worksFor: {
            '@type': 'Organization',
            name: 'RENOA',
        },
        sameAs: [
            'https://github.com/Ashelycole1',
            'https://www.linkedin.com/in/niwasiima-ashelycole-091698390',
        ],
    };

    return (
        <div className="page-">
            <Script
                id="person-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Banner />
            <AboutMe />
            <Skills />
            <Experiences />
            <ProjectList />
        </div>
    );
}
