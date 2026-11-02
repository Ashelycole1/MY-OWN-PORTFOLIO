'use client';
import SectionTitle from '@/components/SectionTitle';
import { experience, formatRange } from '@/lib/experience';
import { SECTION_IDS } from '@/lib/profile';
import TagPill from '@/components/TagPill';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Experiences = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 60%',
                    end: 'bottom 50%',
                    toggleActions: 'restart none none reverse',
                    scrub: 1,
                },
            });

            tl.from('.experience-item', {
                y: 50,
                opacity: 0,
                stagger: 0.3,
            });
        },
        { scope: containerRef },
    );

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'bottom 50%',
                    end: 'bottom 20%',
                    scrub: 1,
                },
            });

            tl.to(containerRef.current, {
                y: -150,
                opacity: 0,
            });
        },
        { scope: containerRef },
    );

    return (
        <section className="py-section" id={SECTION_IDS.experience}>
            <div className="container" ref={containerRef}>
                <SectionTitle title="My Experience" />

                <div className="grid gap-14">
                    {experience.map((item) => (
                        <article
                            key={`${item.org}-${item.title}`}
                            className="experience-item"
                        >
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                                <p className="text-xl text-muted-foreground">
                                    {item.org}
                                </p>
                                <TagPill>{item.tag}</TagPill>
                            </div>
                            <h3 className="text-3xl md:text-5xl font-anton leading-none mt-3.5 mb-2.5">
                                {item.title}
                            </h3>
                            <p className="text-lg text-muted-foreground">
                                {formatRange(item.start, item.end)}
                                {item.location && ` · ${item.location}`}
                            </p>
                            <ul className="mt-4 max-w-3xl list-disc list-outside ml-5 space-y-1.5 text-muted-foreground">
                                {item.bullets.map((bullet) => (
                                    <li key={bullet}>{bullet}</li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experiences;
