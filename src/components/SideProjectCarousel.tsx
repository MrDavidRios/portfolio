import type { CollectionEntry } from 'astro:content';
import { useState } from 'react';
import ArrowLeftIcon from '../icons/arrow-left.svg';
import ArrowRightIcon from '../icons/arrow-right.svg';
import ShuffleIcon from '../icons/shuffle.svg';

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
        const randomprojectidx = getRandomProjectIdx();
        console.log('[2] random project idx:', randomprojectidx, '; projects length:', projects.length);

        setProjectIdx(randomprojectidx);
    };

    const randomprojectidx = getRandomProjectIdx();
    console.log('[1] random project idx:', randomprojectidx, '; projects length:', projects.length);
    const [projectIdx, setProjectIdx] = useState(randomprojectidx);
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
                    <img src={ArrowRightIcon.src} className="ml-1 w-4 h-4" alt="Next Project" />
                </div>
            </a>

            <div className="flex justify-between mt-6">
                <button onClick={previousProject}>
                    <img src={ArrowLeftIcon.src} className="w-6 h-6" alt="Previous Project" />
                </button>
                <button onClick={randomizeProject} className="flex flex-col items-center gap-2">
                    <p>Randomize Project</p>
                    <img src={ShuffleIcon.src} className="w-6 h-6" alt="" />
                </button>
                <button onClick={nextProject}>
                    <img src={ArrowRightIcon.src} className="w-6 h-6" alt="Next Project" />
                </button>
            </div>
        </div>
    );
};
