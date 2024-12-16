import { memo } from 'react';

import { Lecture } from '../../model/types/Lecture';

import classes from './LectureCard.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { VStack } from '@/shared/ui/Stack';

interface LectureCardProps {
    className?: string;
    lecture: Lecture;
}

export const LectureCard = memo((props: LectureCardProps) => {
    const { className, lecture } = props;

    return (
        <VStack maxW className={classNames(classes.LectureCard, {}, [className])}>
            <h1 className="text-l font-bold">{lecture.title}</h1>
            <p>
                Вы можете скачать файл лекции{' '}
                <a download href={`/api/download/${lecture.file}`}>
                    здесь
                </a>
            </p>
        </VStack>
    );
});
