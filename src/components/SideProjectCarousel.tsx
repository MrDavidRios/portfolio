import type { CollectionEntry } from 'astro:content';
import { useState } from 'react';
import NavArrowLeft from '../icons/NavArrowLeft';
import { NavArrowRight } from '../icons/NavArrowRight';
import Shuffle from '../icons/Shuffle';

interface SideProjectCarouselProps {
    projects: CollectionEntry<'projects'>[];
    headingLevel?: 'h2' | 'h3';
    className?: string;
}

export const SideProjectCarousel: React.FC<SideProjectCarouselProps> = ({ projects, headingLevel = 'h2', className = '' }) => {
    const getRandomProjectIdx = () => {
        return Math.floor(Math.random() * projects.length);
    };

    const previousProject = () => {
        const prevIdx = projectIdx === 0 ? projects.length - 1 : projectIdx - 1;
        setProjectIdx(prevIdx);
    };

    const nextProject = () => {
        const nextIdx = projectIdx === projects.length - 1 ? 0 : projectIdx + 1;
        setProjectIdx(nextIdx);
    };

    const randomizeProject = () => {
        setProjectIdx(getRandomProjectIdx());
    };

    const [projectIdx, setProjectIdx] = useState(getRandomProjectIdx());
    const TitleTag = headingLevel;

    const project = projects[projectIdx];

    const link = project.data.customLink ?? `/projects/${project.slug}/`;
    const linkTarget = project.data.customLink ? `_blank` : `_self`;

    return (
        <div>
            <a className={`flex justify-between flex-col items-start gap-4 group ${className}`} href={link} target={linkTarget}>
                <div className="grow">
                    <TitleTag className="text-xl leading-tight font-serif font-medium group-hover:underline group-hover:decoration-dashed group-hover:underline-offset-4 group-hover:decoration-1 sm:text-2xl">
                        {project.data.title}
                    </TitleTag>
                    {project.data.projectDate && <div className="text-sm leading-normal mt-1 italic">{project.data.projectDate}</div>}
                    {project.data.description && <div className="mt-1 text-sm leading-normal">{project.data.description}</div>}
                </div>
                <div className="hidden font-serif italic opacity-0 transition group-hover:opacity-100 sm:inline-flex sm:gap-1 sm:items-center sm:shrink-0">
                    View Project
                    <NavArrowRight className="w-5 h-5 fill-current" />
                </div>
            </a>

            <div className="flex justify-between mt-6">
                <button onClick={previousProject}>
                    <NavArrowLeft className="w-5 h-5 fill-current" />
                </button>
                <button onClick={randomizeProject} className="flex flex-col items-center gap-2">
                    <p>Randomize Project</p>
                    <Shuffle className="w-6 h-6 fill-current" />
                </button>
                <button onClick={nextProject}>
                    <NavArrowRight className="w-5 h-5 fill-current" />
                </button>
            </div>
        </div>
    );
};
