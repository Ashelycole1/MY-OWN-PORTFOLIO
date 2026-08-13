'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IProject } from '@/types';
import { X, ExternalLink, Code } from 'lucide-react';
import Image from 'next/image';

interface ProjectModalProps {
    project: IProject | null;
    isOpen: boolean;
    onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
    const [iframeError, setIframeError] = useState(false);

    // Lock body scroll when modal is open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setIframeError(false); // Reset iframe error state on close
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && project && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed left-1/2 top-1/2 z-50 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 p-4 md:p-0 max-h-[100dvh]"
                    >
                        <div className="relative flex flex-col max-h-[90dvh] w-full overflow-hidden rounded-xl bg-card border border-border shadow-2xl">
                            {/* Header */}
                            <div className="flex items-center justify-between border-b border-border/50 p-4 md:p-6 bg-muted/30">
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-anton uppercase text-foreground">
                                        {project.title}
                                    </h2>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="rounded-full p-2 hover:bg-muted transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Scrollable Body */}
                            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-10 custom-scrollbar">
                                
                                {/* Live Demo (Iframe) */}
                                {project.liveUrl && !iframeError && (
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <p className="text-muted-foreground font-anton text-sm uppercase">Live Demo Preview</p>
                                            <a 
                                                href={project.liveUrl} 
                                                target="_blank" 
                                                rel="noreferrer"
                                                className="text-xs text-primary hover:underline flex items-center gap-1"
                                            >
                                                Open in new tab <ExternalLink size={12} />
                                            </a>
                                        </div>
                                        <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border/50 bg-muted flex items-center justify-center group">
                                            <div className="absolute inset-0 flex items-center justify-center opacity-50 text-sm">
                                                Loading demo...
                                            </div>
                                            <iframe
                                                src={project.liveUrl}
                                                className="absolute inset-0 w-full h-full z-10"
                                                sandbox="allow-scripts allow-same-origin"
                                                onError={() => setIframeError(true)}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Fallback if no iframe or it errors, show thumbnail */}
                                {(!project.liveUrl || iframeError) && (
                                    <div className="relative w-full aspect-[21/9] rounded-lg overflow-hidden border border-border/50 bg-muted">
                                        <Image
                                            src={project.longThumbnail && !project.longThumbnail.includes('TODO') ? project.longThumbnail : project.thumbnail}
                                            alt={project.title}
                                            fill
                                            className="object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = '/images/placeholder.svg';
                                            }}
                                        />
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="md:col-span-2 space-y-8">
                                        {/* The Problem */}
                                        <div>
                                            <h3 className="text-muted-foreground font-anton mb-2 uppercase">The Problem</h3>
                                            <p className="text-lg leading-relaxed">{project.problem}</p>
                                        </div>

                                        {/* The Constraints */}
                                        <div>
                                            <h3 className="text-muted-foreground font-anton mb-2 uppercase">The Constraints</h3>
                                            <p className="text-lg leading-relaxed">{project.constraint}</p>
                                        </div>

                                        {/* What I Built */}
                                        <div>
                                            <h3 className="text-muted-foreground font-anton mb-2 uppercase">What I Built</h3>
                                            <ul className="text-lg list-disc list-outside ml-5 space-y-2">
                                                {project.build.map((item, idx) => (
                                                    <li key={idx}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* The Result */}
                                        {project.result && (
                                            <div>
                                                <h3 className="text-muted-foreground font-anton mb-2 uppercase">The Result</h3>
                                                <p className="text-lg leading-relaxed">{project.result}</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Sidebar Info */}
                                    <div className="space-y-8">
                                        <div>
                                            <h3 className="text-muted-foreground font-anton mb-3 uppercase">Tech Stack</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {project.techStack.map((tech) => (
                                                    <span key={tech} className="px-3 py-1 bg-muted rounded-full text-sm font-medium">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            {project.liveUrl && (
                                                <a 
                                                    href={project.liveUrl} 
                                                    target="_blank" 
                                                    rel="noreferrer"
                                                    className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 px-4 rounded-md font-medium hover:bg-primary/90 transition-colors"
                                                >
                                                    <ExternalLink size={18} />
                                                    Visit Live Project
                                                </a>
                                            )}
                                            {project.sourceCode && (
                                                <a 
                                                    href={project.sourceCode} 
                                                    target="_blank" 
                                                    rel="noreferrer"
                                                    className="w-full flex items-center justify-center gap-2 border border-border py-3 px-4 rounded-md font-medium hover:bg-muted transition-colors"
                                                >
                                                    <Code size={18} />
                                                    View Source Code
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ProjectModal;
