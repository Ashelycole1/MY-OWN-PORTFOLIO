'use client';
import SectionTitle from '@/components/SectionTitle';
import { featuredProjects, moreProjects } from '@/lib/projects';
import { SECTION_IDS } from '@/lib/profile';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useRef } from 'react';
import ProjectCard from './Project';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Grid: 1 col < 768px, 2 cols ≥ 768px, 3 cols ≥ 1024px (DESIGN.md §5)
const GRID = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';

const ProjectList = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'top 80%',
                    toggleActions: 'restart none none reverse',
                    scrub: 1,
                },
            });

            tl.from(containerRef.current, {
                y: 150,
                opacity: 0,
            });
        },
        { scope: containerRef },
    );

    return (
        <section className="pb-section" id={SECTION_IDS.projects}>
            <div className="container" ref={containerRef}>
                <SectionTitle title="Selected Projects" />

                <div className={GRID}>
                    {featuredProjects.map((project) => (
                        <ProjectCard
                            key={project.slug}
                            project={project}
                            variant="featured"
                        />
                    ))}
                </div>

                <h3 className="mt-20 mb-8 text-3xl md:text-4xl font-anton uppercase text-muted-foreground">
                    More Projects
                </h3>

                <div className={GRID}>
                    {moreProjects.map((project) => (
                        <ProjectCard
                            key={project.slug}
                            project={project}
                            variant="compact"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectList;
