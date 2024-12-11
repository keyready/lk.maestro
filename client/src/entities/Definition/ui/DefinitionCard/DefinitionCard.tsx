import { memo } from 'react';

import classes from './DefinitionCard.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { Definition } from '@/entities/Definition';

interface DefinitionCardProps {
    className?: string;
    definition: Definition;
}

export const DefinitionCard = memo((props: DefinitionCardProps) => {
    const { className, definition } = props;

    return (
        <div className={classNames(classes.DefinitionCard, {}, [className])}>
            <h1 className="text-l">{definition.obj}</h1>
        </div>
    );
});
