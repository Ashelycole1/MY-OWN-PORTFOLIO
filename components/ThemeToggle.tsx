'use client';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { THEME_STORAGE_KEY } from '@/lib/theme';

const ThemeToggle = ({ className }: { className?: string }) => {
    const [isLight, setIsLight] = useState(false);

    useEffect(() => {
        setIsLight(document.documentElement.classList.contains('light'));
    }, []);

    const toggle = () => {
        const next = !isLight;
        document.documentElement.classList.toggle('light', next);
        try {
            localStorage.setItem(THEME_STORAGE_KEY, next ? 'light' : 'dark');
        } catch {
            // storage unavailable (private mode); theme still applies for this visit
        }
        setIsLight(next);
    };

    const label = isLight ? 'Switch to dark mode' : 'Switch to light mode';

    return (
        <button
            type="button"
            onClick={toggle}
            aria-label={label}
            title={label}
            className={cn(
                'flex items-center justify-center size-9 rounded-full bg-background-light/80 backdrop-blur-md border border-border/40 shadow-lg text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                className,
            )}
        >
            {isLight ? <Moon size={18} aria-hidden /> : <Sun size={18} aria-hidden />}
        </button>
    );
};

export default ThemeToggle;
