'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React from 'react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const AboutMe = () => {
    const container = React.useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    id: 'about-me-in',
                    trigger: container.current,
                    start: 'top 80%',
                    end: 'bottom bottom',
                    scrub: 0.5,
                },
            });

            tl.from('.slide-up-and-fade', {
                y: 50,
                opacity: 0,
                stagger: 0.1,
            });
        },
        { scope: container },
    );

    return (
        <section className="py-20 md:py-32" id="about-me">
            <div className="container" ref={container}>
                <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
                    
                    {/* Left side: Image */}
                    <div className="md:col-span-5 slide-up-and-fade">
                        <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-[#F0F0D8]">
                            <Image
                                src="https://github.com/Ashelycole1.png"
                                alt="Niwasiima Ashelycole"
                                fill
                                className="object-cover object-center scale-[1.02]"
                                sizes="(max-width: 768px) 100vw, 40vw"
                            />
                        </div>
                    </div>

                    {/* Right side: Content */}
                    <div className="md:col-span-7 flex flex-col justify-center">
                        <h2 className="text-6xl md:text-7xl lg:text-8xl font-anton uppercase text-[#E1F036] mb-8 slide-up-and-fade leading-none">
                            ABOUT ME
                        </h2>

                        <div className="text-lg md:text-xl text-muted-foreground space-y-6">
                            <p className="slide-up-and-fade text-foreground font-medium">
                                Hi, I&apos;m Niwasiima Ashelycole, a software Engineer in Uganda turning ideas into creative solutions. I specialize in creating seamless and intuitive user experiences.
                            </p>
                            
                            <p className="slide-up-and-fade leading-relaxed">
                                My work spans frontend and backend development, along with a growing focus on artificial intelligence and system architecture. I enjoy designing complete solutions, from building user interfaces to developing backend services and APIs.
                            </p>
                            
                            <div className="slide-up-and-fade mt-10 border-l-4 border-[#E1F036] pl-6 py-2">
                                <p className="text-foreground font-bold text-xl md:text-2xl italic tracking-wide">
                                    I don&apos;t always have a solution, but I know how to find one.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
