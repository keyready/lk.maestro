import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLectures } from '../../api/LectureApi';
import { LectureCard } from '../LectureCard/LectureCard';

import { classNames } from '@/shared/lib/classNames';
import { VStack } from '@/shared/ui/Stack';
import { TextButton } from '@/shared/ui/TextButton';
import { RoutePath } from '@/shared/config/routeConfig';

interface LecturesListProps {
    className?: string;
    cutUnder?: number;
}

export const LecturesList = (props: LecturesListProps) => {
    const { className, cutUnder } = props;

    const { data: lectures, isLoading } = useLectures();

    const navigate = useNavigate();

    const handleAllLecturesCLick = useCallback(() => {
        navigate(RoutePath.lectures);
    }, [navigate]);

    if (isLoading) {
        return <h1>Подгружаем данные....</h1>;
    }

    if (!isLoading && !lectures?.length) {
        return (
            <VStack maxW gap="0" className="mt-4">
                <h1 className="italic leading-none text-danger">Вы пока ничего не добавили</h1>
                <p>
                    Добавить лекции можно{' '}
                    <TextButton onClick={handleAllLecturesCLick}>здесь</TextButton>
                </p>
            </VStack>
        );
    }

    return (
        <VStack maxW className={classNames('', {}, [className])}>
            {lectures?.slice(0, cutUnder || 1000).map((lecture) => (
                <LectureCard lecture={lecture} key={lecture.id} />
            ))}
            {cutUnder && (
                <p>
                    Все лекции можно посмотреть{' '}
                    <TextButton onClick={handleAllLecturesCLick}>здесь</TextButton>
                </p>
            )}
        </VStack>
    );
};
