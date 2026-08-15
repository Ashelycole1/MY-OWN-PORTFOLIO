'use client';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MENU_LINKS = [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/#about-me' },
    { name: 'Projects', url: '/#selected-projects' },
    { name: 'Skills', url: '/#skills' },
    { name: 'Tech Nation', url: '/blog' },
    { name: 'Contact', url: '/#contact' },
];

// Social icons as inline SVGs
const SocialIcon = ({ name }: { name: string }) => {
    if (name === 'github') {
        return (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
        );
    }
    if (name === 'linkedin') {
        return (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        );
    }
    if (name === 'x') {
        return (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.734l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        );
    }
    return null;
};

// Logo mark — initials in a small circle
const Logo = () => (
    <Link href="/" className="flex items-center justify-center size-9 rounded-full bg-foreground text-background font-anton text-sm select-none hover:bg-primary hover:text-primary-foreground transition-colors">
        AC
    </Link>
);

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState('/');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setActiveLink(pathname);
    }, [pathname]);

    const handleNav = (url: string) => {
        setMobileMenuOpen(false);
        router.push(url);
        setActiveLink(url);
    };

    // Pick the social links we want in the icon tray (github, linkedin, x)
    const iconSocials = [
        { name: 'github', url: 'https://github.com/Ashelycole1' },
        { name: 'linkedin', url: 'https://www.linkedin.com/in/niwasiima-ashelycole-091698390' },
        { name: 'x', url: 'https://x.com/ashelycole01' },
    ];

    return (
        <header className="fixed top-0 inset-x-0 z-50 flex items-start justify-between px-5 md:px-10 pt-5 pointer-events-none">
            
            {/* Left — logo */}
            <div className="pointer-events-auto">
                <Logo />
            </div>

            {/* Center — Desktop pill nav */}
            <nav
                className={cn(
                    'pointer-events-auto absolute left-1/2 -translate-x-1/2 top-4 hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full',
                    'bg-[hsl(var(--background-light))/80] backdrop-blur-md border border-border/40',
                    'shadow-lg transition-all duration-300',
                    scrolled && 'shadow-2xl border-border/60',
                )}
            >
                {MENU_LINKS.map((link) => {
                    const isActive = activeLink === link.url || (link.url !== '/' && pathname === link.url);
                    return (
                        <button
                            key={link.name}
                            onClick={() => handleNav(link.url)}
                            className={cn(
                                'px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap',
                                isActive
                                    ? 'bg-foreground text-background'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-muted',
                            )}
                        >
                            {link.name}
                        </button>
                    );
                })}
            </nav>

            {/* Right — actions */}
            <div className="pointer-events-auto flex items-center gap-2 md:gap-3">
                <a
                    href="/Niwasiima_Ashelycole_CV_2026.pdf"
                    target="_blank"
                    className="flex items-center gap-2 bg-[#E1F036] text-black px-4 py-2 rounded-full text-sm font-bold tracking-wider hover:brightness-105 transition-all shadow-lg whitespace-nowrap"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 hidden sm:block">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    RESUME
                </a>

                {/* Mobile Hamburger Menu Toggle */}
                <button
                    className="md:hidden flex items-center justify-center size-9 rounded-full bg-[hsl(var(--background-light))/80] backdrop-blur-md border border-border/40 shadow-lg text-foreground hover:bg-muted transition-colors"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>

                {/* Desktop Socials */}
                <div className="hidden sm:flex items-center gap-1.5 bg-[hsl(var(--background-light))/80] backdrop-blur-md border border-border/40 rounded-full px-2 py-1.5 shadow-lg">
                    {iconSocials.map((social) => (
                        <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center size-7 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
                            aria-label={social.name}
                        >
                            <SocialIcon name={social.name} />
                        </a>
                    ))}
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="pointer-events-auto absolute top-16 right-5 bg-[hsl(var(--background-light))/95] backdrop-blur-xl border border-border/40 p-2 rounded-2xl shadow-2xl flex flex-col gap-1 min-w-[200px]"
                    >
                        {MENU_LINKS.map((link) => {
                            const isActive = activeLink === link.url || (link.url !== '/' && pathname === link.url);
                            return (
                                <button
                                    key={link.name}
                                    onClick={() => handleNav(link.url)}
                                    className={cn(
                                        'px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left',
                                        isActive
                                            ? 'bg-foreground text-background'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
                                    )}
                                >
                                    {link.name}
                                </button>
                            );
                        })}
                        <div className="flex items-center justify-center gap-4 mt-2 pt-3 border-t border-border/40">
                            {iconSocials.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-foreground transition-all duration-200"
                                >
                                    <SocialIcon name={social.name} />
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </header>
    );
};

export default Navbar;
