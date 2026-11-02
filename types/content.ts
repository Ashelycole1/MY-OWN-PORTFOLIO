// Content types for the portfolio. Components only render these shapes.
// Spec: DESIGN.md §6

export type ExperienceTag =
    | 'work'
    | 'freelance'
    | 'volunteer'
    | 'leadership'
    | 'community';

export type Experience = {
    title: string;
    org: string;
    location?: string;
    start: string; // "YYYY" or "YYYY-MM"
    end?: string; // omit = Present
    tag: ExperienceTag;
    bullets: string[];
};

type ProjectBase = {
    slug: string;
    title: string;
    problem: string;
    summary: string;
    tags: string[];
    live?: string;
    repo?: string;
    featured: boolean;
    order: number;
    /** Optional cover image in /public. Screenshots are an open item (DESIGN.md §9). */
    image?: string;
};

// `role` is required when `team` is true (DESIGN.md §6, §7).
export type Project = ProjectBase &
    ({ team: false; role?: string } | { team: true; role: string });

export type Certification = {
    issuer: string;
    name: string;
    date?: string; // display string, e.g. "October 2026"
    verifyUrl?: string;
    /** Optional badge image in /public/certifications. */
    badgeImage?: string;
};

export type Stat = { value: string; label: string };

export type StackItem = { name: string; icon?: string };

export type StackGroup = { group: string; items: StackItem[] };

export type Education = {
    degree: string;
    institution: string;
    expected?: string;
};

export type Recognition = {
    title: string;
    year?: string;
};
