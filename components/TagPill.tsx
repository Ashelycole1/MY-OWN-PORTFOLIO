import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface Props {
    children: ReactNode;
    className?: string;
}

/** Small pill used for experience tags and project team badges (DESIGN.md §5). */
const TagPill = ({ children, className }: Props) => (
    <span
        className={cn(
            'inline-flex items-center px-2.5 py-1 rounded-full border border-border bg-background-light text-xs font-medium uppercase tracking-wider text-foreground leading-none',
            className,
        )}
    >
        {children}
    </span>
);

export default TagPill;
