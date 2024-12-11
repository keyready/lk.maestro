import { memo } from 'react';

import { Lecture } from '../../model/types/Lecture';

import classes from './LectureCard.module.scss';

import { classNames } from '@/shared/lib/classNames';

interface LectureCardProps {
    className?: string;
    lecture: Lecture;
}

export const LectureCard = memo((props: LectureCardProps) => {
    const { className, lecture } = props;

    return (
        <div className={classNames(classes.LectureCard, {}, [className])}>
            <h1 className="text-l">{lecture.title}</h1>
            <p>
                Вы можете скачать файл лекции{' '}
                <a download href={`/api/download/${lecture.file}`}>
                    здесь
                </a>
            </p>
        </div>
    );
});
