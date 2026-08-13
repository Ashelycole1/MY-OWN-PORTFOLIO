'use client';

import { IProject } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
    index: number;
    project: IProject;
    selectedProject: string | null;
    onMouseEnter: (_slug: string) => void;
    onOpenModal: (_project: IProject) => void;
}

gsap.registerPlugin(useGSAP);

const Project = ({ index, project, selectedProject, onMouseEnter, onOpenModal }: Props) => {
    const externalLinkSVGRef = useRef<SVGSVGElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Pick the best secondary image for hover reveal — use second image if available, else first
    const hoverImage = project.images && project.images.length > 1
        ? project.images[1]
        : project.images && project.images.length === 1
            ? project.images[0]
            : project.thumbnail;

    const { context, contextSafe } = useGSAP(() => {}, {
        scope: externalLinkSVGRef,
        revertOnUpdate: true,
    });

    const handleMouseEnter = contextSafe?.(() => {
        onMouseEnter(project.slug);
        setIsHovered(true);

        const arrowLine = externalLinkSVGRef.current?.querySelector(
            '#arrow-line',
        ) as SVGPathElement;
        const arrowCurb = externalLinkSVGRef.current?.querySelector(
            '#arrow-curb',
        ) as SVGPathElement;
        const box = externalLinkSVGRef.current?.querySelector(
            '#box',
        ) as SVGPathElement;

        if (!arrowLine || !arrowCurb || !box) return;

        gsap.set(box, {
            opacity: 0,
            strokeDasharray: box?.getTotalLength(),
            strokeDashoffset: box?.getTotalLength(),
        });
        gsap.set(arrowLine, {
            opacity: 0,
            strokeDasharray: arrowLine?.getTotalLength(),
            strokeDashoffset: arrowLine?.getTotalLength(),
        });
        gsap.set(arrowCurb, {
            opacity: 0,
            strokeDasharray: arrowCurb?.getTotalLength(),
            strokeDashoffset: arrowCurb?.getTotalLength(),
        });

        const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
        tl.to(externalLinkSVGRef.current, { autoAlpha: 1 })
            .to(box, { opacity: 1, strokeDashoffset: 0 })
            .to(arrowLine, { opacity: 1, strokeDashoffset: 0 }, '<0.2')
            .to(arrowCurb, { opacity: 1, strokeDashoffset: 0 })
            .to(externalLinkSVGRef.current, { autoAlpha: 0 }, '+=1');
    });

    const handleMouseLeave = contextSafe?.(() => {
        context.kill();
        setIsHovered(false);
    });

    return (
        <button
            className="project-item group leading-none py-5 md:border-b first:!pt-0 last:pb-0 last:border-none md:group-hover/projects:opacity-30 md:hover:!opacity-100 transition-all text-left w-full"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => onOpenModal(project)}
        >
            {/* Mobile thumbnail with hover-reveal crossfade */}
            {selectedProject === null && (
                <div className="relative w-full aspect-[3/2] mb-6 overflow-hidden rounded-md">
                    <Image
                        src={project.thumbnail}
                        alt={`${project.title} thumbnail`}
                        width={300}
                        height={200}
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                    />
                    <AnimatePresence>
                        {isHovered && hoverImage !== project.thumbnail && (
                            <motion.div
                                key="hover-image"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={hoverImage}
                                    alt={`${project.title} preview`}
                                    fill
                                    className="object-cover object-top"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}

            <div className="flex gap-2 md:gap-5">
                <div className="font-anton text-muted-foreground">
                    _{(index + 1).toString().padStart(2, '0')}.
                </div>
                <div className="flex-1">
                    <h4 className="text-4xl xs:text-6xl flex gap-4 font-anton transition-all duration-700 bg-gradient-to-r from-primary to-foreground from-[50%] to-[50%] bg-[length:200%] bg-right bg-clip-text text-transparent group-hover:bg-left">
                        {project.title}
                        <span className="text-foreground opacity-0 group-hover:opacity-100 transition-all">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="36"
                                height="36"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                ref={externalLinkSVGRef}
                            >
                                <path
                                    id="box"
                                    d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                                ></path>
                                <path id="arrow-line" d="M10 14 21 3"></path>
                                <path id="arrow-curb" d="M15 3h6v6"></path>
                            </svg>
                        </span>
                    </h4>
                    <p className="mt-3 text-muted-foreground text-sm line-clamp-2 max-w-[90%]">
                        {project.problem}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3 text-muted-foreground text-xs">
                        {project.techStack
                            .slice(0, 3)
                            .map((tech, idx, stackArr) => (
                                <div
                                    className="gap-3 flex items-center"
                                    key={tech}
                                >
                                    <span>{tech}</span>
                                    {idx !== stackArr.length - 1 && (
                                        <span className="inline-block size-2 rounded-full bg-background-light"></span>
                                    )}
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </button>
    );
};

export default Project;
