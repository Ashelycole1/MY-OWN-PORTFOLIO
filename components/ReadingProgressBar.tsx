'use client';

import { useEffect, useState } from 'react';

export function ReadingProgressBar() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const currentProgress = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollHeight) {
                setProgress(Math.min(100, Math.max(0, (currentProgress / scrollHeight) * 100)));
            }
        };

        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();
        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 h-[3px] bg-transparent z-[60] pointer-events-none">
            <div
                className="h-full bg-[#E1F036] shadow-[0_0_10px_rgba(225,240,54,0.8)] transition-all duration-75 ease-out"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}

export default ReadingProgressBar;
