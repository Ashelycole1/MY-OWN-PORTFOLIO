import { notFound } from 'next/navigation';
import ProjectDetails from './_components/ProjectDetails';
import { getProject, projects } from '@/lib/projects';
import { Metadata } from 'next';

export const generateStaticParams = async () => {
    return projects.map((project) => ({ slug: project.slug }));
};

export const generateMetadata = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}) => {
    const { slug } = await params;
    const project = getProject(slug);

    return {
        title: `${project?.title} — Niwasiima Ashelycole`,
        description: project?.summary,
        openGraph: {
            title: project?.title,
            description: project?.summary,
            type: 'website',
        },
    } as Metadata;
};

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;

    const project = getProject(slug);

    if (!project) {
        return notFound();
    }

    return <ProjectDetails project={project} />;
};

export default Page;
