'use client';
import ArrowAnimation from '@/components/ArrowAnimation';
import TransitionLink from '@/components/TransitionLink';
import { Project } from '@/types/content';
import TagPill from '@/components/TagPill';
import { ProjectLinks, TeamBadge } from '@/app/_components/Project';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { ArrowLeft } from 'lucide-react';
import { useRef } from 'react';

interface Props {
    project: Project;
}

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ProjectDetails = ({ project }: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!containerRef.current) return;

            gsap.set('.fade-in-later', {
                autoAlpha: 0,
                y: 30,
            });
            const tl = gsap.timeline({
                delay: 0.5,
            });

            tl.to('.fade-in-later', {
                autoAlpha: 1,
                y: 0,
                stagger: 0.1,
            });
        },
        { scope: containerRef },
    );

    // blur info div and make it smaller on scroll
    useGSAP(
        () => {
            if (window.innerWidth < 992) return;

            gsap.to('#info', {
                filter: 'blur(3px)',
                autoAlpha: 0,
                scale: 0.9,
                // position: 'sticky',
                scrollTrigger: {
                    trigger: '#info',
                    start: 'bottom bottom',
                    end: 'bottom top',
                    pin: true,
                    pinSpacing: false,
                    scrub: 0.5,
                },
            });
        },
        { scope: containerRef },
    );

    return (
        <section className="pt-5 pb-14">
            <div className="container" ref={containerRef}>
                <TransitionLink
                    back
                    href="/"
                    className="mb-16 inline-flex gap-2 items-center group h-12"
                >
                    <ArrowLeft className="group-hover:-translate-x-1 group-hover:text-primary transition-all duration-300" />
                    Back
                </TransitionLink>

                <div
                    className="top-0 min-h-[calc(100svh-100px)] flex"
                    id="info"
                >
                    <div className="relative w-full">
                        <div className="mx-auto mb-10 max-w-[635px]">
                            <div className="fade-in-later opacity-0 mb-5">
                                <TeamBadge project={project} />
                            </div>
                            <h1 className="fade-in-later opacity-0 text-4xl md:text-[60px] leading-none font-anton overflow-hidden">
                                <span className="inline-block">
                                    {project.title}
                                </span>
                            </h1>
                            <div className="fade-in-later opacity-0 mt-8">
                                <ProjectLinks project={project} size="md" />
                            </div>
                        </div>

                        <div className="max-w-[635px] space-y-7 pb-20 mx-auto">
                            <div className="fade-in-later">
                                <p className="text-muted-foreground font-anton mb-3">
                                    The Problem
                                </p>
                                <div className="text-lg">{project.problem}</div>
                            </div>

                            <div className="fade-in-later">
                                <p className="text-muted-foreground font-anton mb-3">
                                    What I Built
                                </p>
                                <div className="text-lg">{project.summary}</div>
                            </div>

                            {project.team && (
                                <div className="fade-in-later">
                                    <p className="text-muted-foreground font-anton mb-3">
                                        My Role
                                    </p>
                                    <div className="text-lg">{project.role}</div>
                                </div>
                            )}

                            <div className="fade-in-later">
                                <p className="text-muted-foreground font-anton mb-3">
                                    Tech Stack
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <TagPill key={tag}>{tag}</TagPill>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <ArrowAnimation />
                    </div>
                </div>

                {project.image && (
                    <div className="fade-in-later relative w-full max-w-[800px] mx-auto aspect-[16/9] bg-background-light overflow-hidden">
                        <Image
                            src={project.image}
                            alt={`${project.title} screenshot`}
                            fill
                            sizes="(max-width: 800px) 100vw, 800px"
                            className="object-cover object-top"
                        />
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProjectDetails;
