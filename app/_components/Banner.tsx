'use client';
import ArrowAnimation from '@/components/ArrowAnimation';
import Button from '@/components/Button';
import { CONTACT, HERO, SECTION_IDS, STATS } from '@/lib/profile';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Banner = () => {
    const containerRef = React.useRef<HTMLDivElement>(null);

    // move the content a little up on scroll
    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'bottom 70%',
                    end: 'bottom 10%',
                    scrub: 1,
                },
            });

            tl.fromTo(
                '.slide-up-and-fade',
                { y: 0 },
                { y: -150, opacity: 0, stagger: 0.02 },
            );
        },
        { scope: containerRef },
    );

    return (
        <section className="relative overflow-hidden" id="banner">
            <ArrowAnimation />
            <div
                className="container h-[100svh] min-h-[530px] max-md:pb-10 flex justify-between items-center max-md:flex-col"
                ref={containerRef}
            >
                <div className="max-md:grow max-md:flex flex-col justify-center items-start max-w-[544px]">
                    <h1 className="banner-title slide-up-and-fade leading-[.95] text-6xl sm:text-[80px] font-anton">
                        <span className="text-primary">{HERO.titleTop}</span>
                        <br /> <span className="ml-4">{HERO.titleBottom}</span>
                    </h1>
                    <p className="banner-description slide-up-and-fade mt-6 text-lg text-muted-foreground">
                        I&apos;m{' '}
                        <span className="font-medium text-foreground">
                            {HERO.name}
                        </span>
                        . {HERO.intro}
                    </p>
                    <div className="mt-9 flex flex-wrap gap-3 banner-button slide-up-and-fade">
                        <Button
                            as="link"
                            href={`#${SECTION_IDS.projects}`}
                            variant="primary"
                        >
                            View Projects
                        </Button>
                        <Button
                            as="link"
                            href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(CONTACT.emailSubject)}`}
                            variant="outline"
                        >
                            Let&apos;s Talk
                        </Button>
                        <Button
                            as="link"
                            href={CONTACT.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="outline"
                        >
                            Resume
                        </Button>
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                        <span className="size-3 rounded-full bg-primary"></span>
                        <span className="text-sm text-muted-foreground">
                            {HERO.status}
                        </span>
                    </div>
                </div>

                <div className="md:absolute bottom-[10%] right-[4%] flex md:flex-col gap-4 md:gap-8 text-center md:text-right">
                    {STATS.map((stat) => (
                        <div className="slide-up-and-fade" key={stat.label}>
                            <h5 className="text-3xl sm:text-4xl font-anton text-primary mb-1.5">
                                {stat.value}
                            </h5>
                            <p className="text-muted-foreground max-md:text-sm">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Banner;
