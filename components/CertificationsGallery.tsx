'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { certifications } from '@/lib/certifications';

const CertificationsGallery = () => {
    return (
        <section id="certifications" className="py-20 md:py-32 w-full max-w-[1200px] mx-auto px-5 lg:px-10">
            <div className="flex justify-between items-end mb-10 md:mb-14 fade-in-up">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-anton uppercase text-foreground">
                    Certifications
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {certifications.map((cert, idx) => (
                    <motion.div
                        key={cert.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: idx * 0.08 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className={`bg-card border border-border/50 rounded-2xl overflow-hidden group hover:border-primary/50 transition-colors ${cert.verifyUrl ? 'cursor-pointer' : ''}`}
                        onClick={() => cert.verifyUrl && window.open(cert.verifyUrl, '_blank')}
                    >
                        <div className="aspect-[4/3] bg-muted/30 relative flex items-center justify-center p-6 border-b border-border/30">
                            {cert.badgeImage ? (
                                <div className="relative w-full h-full">
                                    <Image
                                        src={cert.badgeImage}
                                        alt={cert.name}
                                        fill
                                        className="object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                                        unoptimized
                                    />
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-2xl font-anton text-primary">
                                        {cert.issuer.charAt(0)}
                                    </div>
                                    {cert.verifyUrl && (
                                        <span className="text-xs text-primary/60 uppercase tracking-widest font-medium">
                                            View Certificate
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="p-5">
                            <p className="text-xs font-semibold text-primary/80 uppercase tracking-wider mb-2">
                                {cert.issuer}
                            </p>
                            <h3 className="font-semibold text-base leading-tight mb-2 group-hover:text-primary transition-colors">
                                {cert.name}
                            </h3>
                            {cert.date && (
                                <p className="text-sm text-muted-foreground">
                                    {new Date(cert.date + '-01').toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                                </p>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default CertificationsGallery;

