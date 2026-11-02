import AboutMe from './_components/AboutMe';
import Banner from './_components/Banner';
import Education from './_components/Education';
import Experiences from './_components/Experiences';
import ProjectList from './_components/ProjectList';
import Recognition from './_components/Recognition';
import Skills from './_components/Skills';
import CertificationsGallery from '@/components/CertificationsGallery';
import SocialCardStack from '@/components/SocialCardStack';
import { CONTACT, SITE } from '@/lib/profile';

export default function Home() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: SITE.name,
        jobTitle: SITE.jobTitle,
        url: SITE.url,
        email: `mailto:${CONTACT.email}`,
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Kampala',
            addressCountry: 'UG',
        },
        worksFor: {
            '@type': 'Organization',
            name: 'RENOA',
        },
        alumniOf: {
            '@type': 'CollegeOrUniversity',
            name: 'Cavendish University Uganda',
        },
        sameAs: [CONTACT.github, CONTACT.linkedin],
    };

    // Page order: DESIGN.md §4
    return (
        <div className="page-">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Banner />
            <ProjectList />
            <Experiences />
            <Recognition />
            <Skills />
            <CertificationsGallery />
            <Education />
            <AboutMe />
            <SocialCardStack />
        </div>
    );
}
