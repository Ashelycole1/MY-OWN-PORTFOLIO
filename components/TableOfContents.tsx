'use client';

import { useEffect, useState } from 'react';
import { ListOrdered } from 'lucide-react';

export interface TocItem {
    id: string;
    text: string;
    level: number;
}

interface TableOfContentsProps {
    items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        if (!items.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-80px 0% -60% 0%',
                threshold: 0.1,
            }
        );

        items.forEach((item) => {
            const element = document.getElementById(item.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [items]);

    if (!items.length) return null;

    return (
        <nav aria-label="Table of contents" className="sticky top-28 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground pb-2 border-b border-border/40">
                <ListOrdered className="w-3.5 h-3.5 text-primary" />
                <span>On This Page</span>
            </div>
            <ul className="space-y-2 text-xs">
                {items.map((item) => {
                    const isActive = activeId === item.id;
                    return (
                        <li
                            key={item.id}
                            style={{ paddingLeft: item.level === 3 ? '0.75rem' : '0' }}
                        >
                            <a
                                href={`#${item.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    const target = document.getElementById(item.id);
                                    if (target) {
                                        const yOffset = -100;
                                        const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                        window.scrollTo({ top: y, behavior: 'smooth' });
                                        history.pushState(null, '', `#${item.id}`);
                                        setActiveId(item.id);
                                    }
                                }}
                                className={`block py-1 transition-colors leading-normal ${
                                    isActive
                                        ? 'text-primary font-medium border-l-2 border-primary pl-2.5 -ml-3'
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                {item.text}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export default TableOfContents;
