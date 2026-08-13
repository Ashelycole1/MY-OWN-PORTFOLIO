'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { socialLinks } from '@/lib/socials';

// SVG icons for each platform
const PlatformIcon = ({ icon }: { icon: string }) => {
    switch (icon) {
        case 'github':
            return (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
            );
        case 'linkedin':
            return (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
            );
        case 'gmail':
        case 'email':
            return (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                </svg>
            );
        case 'tiktok':
            return (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
            );
        case 'x':
            return (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.734l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
            );
        case 'youtube':
            return (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
            );
        default:
            return <span className="text-2xl font-bold">{icon[0].toUpperCase()}</span>;
    }
};

// Fan rotation angles and X offsets for each card
const FAN_ROTATIONS = [-20, -10, 0, 10, 20];
const FAN_X_OFFSETS = [-140, -70, 0, 70, 140];
const FAN_Y_OFFSETS = [20, 5, 0, 5, 20]; // to create an arc

const SocialCardStack = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    return (
        <section id="social" className="py-20 md:py-32 w-full max-w-[1200px] mx-auto px-5 lg:px-10">
            <div className="flex justify-between items-end mb-14">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-anton uppercase text-foreground">
                    Find Me Online
                </h2>
            </div>

            {isMobile ? (
                // Mobile: clean scrollable grid
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {socialLinks.map((social) => (
                        <a
                            key={social.platform}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center gap-3 rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 group"
                            style={{ backgroundColor: `${social.brandColor}15` }}
                        >
                            <span style={{ color: social.brandColor }} className="transition-transform duration-300 group-hover:scale-110">
                                <PlatformIcon icon={social.icon} />
                            </span>
                            <span className="font-semibold text-sm">{social.platform}</span>
                        </a>
                    ))}
                </div>
            ) : (
                // Desktop: fanned card stack
                <div className="flex items-center justify-center min-h-[420px] relative">
                    <div className="relative w-[200px] h-[280px]">
                        {socialLinks.map((social, idx) => {
                            const baseRotation = FAN_ROTATIONS[idx] ?? idx * 6 - 15;
                            const isHovered = hoveredIndex === idx;
                            const isAnyHovered = hoveredIndex !== null;

                            return (
                                <motion.a
                                    key={social.platform}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-4 cursor-pointer shadow-xl border border-white/10"
                                    style={{
                                        backgroundColor: social.brandColor,
                                        color: '#ffffff',
                                        zIndex: isHovered ? 20 : idx,
                                        transformOrigin: 'bottom center',
                                    }}
                                    initial={{ rotate: baseRotation }}
                                    animate={{
                                        rotate: isHovered ? 0 : isAnyHovered ? baseRotation * 1.1 : baseRotation,
                                        x: isHovered ? 0 : FAN_X_OFFSETS[idx] || 0,
                                        y: isHovered ? -28 : (FAN_Y_OFFSETS[idx] || 0),
                                        scale: isHovered ? 1.1 : isAnyHovered ? 0.95 : 1,
                                    }}
                                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                                    onHoverStart={() => setHoveredIndex(idx)}
                                    onHoverEnd={() => setHoveredIndex(null)}
                                >
                                    <PlatformIcon icon={social.icon} />
                                    <span className="font-bold text-lg tracking-wide">{social.platform}</span>

                                    {/* Arrow hint on hover */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 4 }}
                                        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 4 }}
                                        className="text-xs font-medium opacity-80 flex items-center gap-1"
                                    >
                                        Visit ↗
                                    </motion.div>
                                </motion.a>
                            );
                        })}
                    </div>

                    {/* Side labels on hover — shows username / link info */}
                    <motion.div
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-right pr-4 md:pr-0 md:left-[calc(50%+130px)] space-y-1"
                        animate={{ opacity: hoveredIndex !== null ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {hoveredIndex !== null && (
                            <>
                                <p className="text-2xl font-anton">{socialLinks[hoveredIndex]?.platform}</p>
                                <p className="text-muted-foreground text-sm">{socialLinks[hoveredIndex]?.url.replace('mailto:', '').replace('https://', '')}</p>
                            </>
                        )}
                    </motion.div>
                </div>
            )}
        </section>
    );
};

export default SocialCardStack;
