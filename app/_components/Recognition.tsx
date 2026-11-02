'use client';
import SectionTitle from '@/components/SectionTitle';
import { RECOGNITION, SECTION_IDS } from '@/lib/profile';
import { motion } from 'framer-motion';

const Recognition = () => {
    return (
        <section className="pb-section" id={SECTION_IDS.recognition}>
            <div className="container">
                <SectionTitle title="Recognition" />

                <ul className="border-t border-border">
                    {RECOGNITION.map((item, idx) => (
                        <motion.li
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.5, delay: idx * 0.08 }}
                            className="flex gap-4 md:gap-8 items-baseline py-6 border-b border-border"
                        >
                            <span className="font-anton text-muted-foreground shrink-0">
                                _{(idx + 1).toString().padStart(2, '0')}.
                            </span>
                            <p className="flex-1 text-xl md:text-3xl font-anton leading-tight">
                                {item.title}
                            </p>
                            {item.year && (
                                <span className="text-muted-foreground shrink-0">
                                    {item.year}
                                </span>
                            )}
                        </motion.li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Recognition;
