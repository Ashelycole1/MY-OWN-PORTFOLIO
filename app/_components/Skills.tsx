'use client';
import SectionTitle from '@/components/SectionTitle';
import { SECTION_IDS, STACK } from '@/lib/profile';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Image from 'next/image';
import React, { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Skills = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const slideUpEl =
                containerRef.current?.querySelectorAll('.slide-up');

            if (!slideUpEl?.length) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    end: 'bottom 80%',
                    scrub: 0.5,
                },
            });

            tl.from('.slide-up', {
                opacity: 0,
                y: 40,
                ease: 'none',
                stagger: 0.4,
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
                    end: 'bottom 10%',
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
        <section id={SECTION_IDS.stack} ref={containerRef}>
            <div className="container">
                <SectionTitle title="My Stack" />

                <div className="space-y-16 md:space-y-20">
                    {STACK.map(({ group, items }) => (
                        <div className="grid sm:grid-cols-12 gap-y-6" key={group}>
                            <div className="sm:col-span-5">
                                <p className="slide-up text-4xl md:text-5xl font-anton leading-none text-muted-foreground uppercase">
                                    {group}
                                </p>
                            </div>

                            <div className="sm:col-span-7 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
                                {items.map((item) => (
                                    <div
                                        className="slide-up flex gap-3 items-center leading-none"
                                        key={item.name}
                                    >
                                        <div className="relative size-6 flex items-center justify-center shrink-0">
                                            {item.icon ? (
                                                <Image
                                                    src={item.icon}
                                                    alt=""
                                                    aria-hidden
                                                    fill
                                                    className="object-contain"
                                                    unoptimized
                                                />
                                            ) : (
                                                <span
                                                    aria-hidden
                                                    className="size-2.5 rounded-full bg-primary"
                                                />
                                            )}
                                        </div>
                                        <span className="text-lg text-muted-foreground hover:text-foreground transition-colors cursor-default">
                                            {item.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );

};

export default Skills;
