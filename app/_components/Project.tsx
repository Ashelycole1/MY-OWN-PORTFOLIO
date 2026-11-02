import Button from '@/components/Button';
import TagPill from '@/components/TagPill';
import TransitionLink from '@/components/TransitionLink';
import { cn } from '@/lib/utils';
import { Project } from '@/types/content';
import { Code, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface Props {
    project: Project;
    variant: 'featured' | 'compact';
}

export const TeamBadge = ({ project }: { project: Project }) => (
    <TagPill>{project.team ? `Team · ${project.role}` : 'Solo'}</TagPill>
);

export const ProjectLinks = ({
    project,
    size = 'sm',
}: {
    project: Project;
    size?: 'sm' | 'md';
}) => {
    if (!project.live && !project.repo) return null;
    const sizeClass = size === 'sm' ? 'h-10 px-5 text-base' : '';

    return (
        <div className="flex flex-wrap gap-3">
            {project.live && (
                <Button
                    as="link"
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="primary"
                    className={sizeClass}
                    aria-label={`${project.title} live demo (opens in a new tab)`}
                >
                    <span className="inline-flex items-center gap-2">
                        Live <ExternalLink size={16} aria-hidden />
                    </span>
                </Button>
            )}
            {project.repo && (
                <Button
                    as="link"
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                    className={sizeClass}
                    aria-label={`${project.title} source code (opens in a new tab)`}
                >
                    <span className="inline-flex items-center gap-2">
                        Code <Code size={16} aria-hidden />
                    </span>
                </Button>
            )}
        </div>
    );
};

const ProjectCard = ({ project, variant }: Props) => {
    const isFeatured = variant === 'featured';
    const number = project.order.toString().padStart(2, '0');

    return (
        <article
            className={cn(
                'project-item group flex flex-col h-full rounded-2xl border border-border bg-background-light/40 hover:border-primary/60 transition-colors overflow-hidden',
            )}
        >
            {isFeatured && project.image && (
                <div className="relative w-full aspect-[16/9] overflow-hidden border-b border-border bg-background-light">
                    <Image
                        src={project.image}
                        alt={`${project.title} screenshot`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                    />
                </div>
            )}

            <div
                className={cn(
                    'flex flex-col flex-1',
                    isFeatured ? 'p-6 md:p-7' : 'p-5',
                )}
            >
                <div className="flex items-start justify-between gap-3">
                    <span className="font-anton text-muted-foreground">
                        _{number}.
                    </span>
                    <TeamBadge project={project} />
                </div>

                <h3
                    className={cn(
                        'font-anton leading-none mt-3 transition-all duration-700 bg-gradient-to-r from-primary to-foreground from-[50%] to-[50%] bg-[length:200%] bg-right bg-clip-text text-transparent group-hover:bg-left',
                        isFeatured ? 'text-4xl md:text-5xl' : 'text-3xl',
                    )}
                >
                    <TransitionLink
                        href={`/projects/${project.slug}`}
                        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                    >
                        {project.title}
                    </TransitionLink>
                </h3>

                <p className="mt-3 text-foreground">{project.problem}</p>
                {isFeatured && (
                    <p className="mt-2 text-sm text-muted-foreground">
                        {project.summary}
                    </p>
                )}

                <ul
                    className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-muted-foreground text-xs"
                    aria-label="Tech stack"
                >
                    {project.tags.map((tag, idx, arr) => (
                        <li className="gap-3 flex items-center" key={tag}>
                            <span>{tag}</span>
                            {idx !== arr.length - 1 && (
                                <span
                                    aria-hidden
                                    className="inline-block size-1.5 rounded-full bg-muted-foreground/50"
                                ></span>
                            )}
                        </li>
                    ))}
                </ul>

                <div className="mt-auto pt-6">
                    <ProjectLinks project={project} />
                </div>
            </div>
        </article>
    );
};

export default ProjectCard;
