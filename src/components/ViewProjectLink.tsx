import type { FC } from 'react';
import { OpenExternalLink } from '../icons/OpenExternalLink.tsx';
import { NavArrowRight } from '../icons/NavArrowRight.tsx';

interface ViewProjectLinkProps {
    hasCustomLink?: boolean
}

export const ViewProjectLink: FC<ViewProjectLinkProps> = ({ hasCustomLink = false }) => {
    return (
        <div className="hidden font-serif italic opacity-0 transition group-hover:opacity-100 sm:inline-flex sm:gap-1 sm:items-center sm:shrink-0">
            {hasCustomLink && <OpenExternalLink className="mb-1 w-4 h-4" />} View Project <NavArrowRight className="fill-current w-4 h-4" />
        </div>
    );
}
