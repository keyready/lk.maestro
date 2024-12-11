import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';

import classes from './LkPage.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { Page } from '@/widgets/Page';
import { getUserData } from '@/entities/User';
import { HStack, VStack } from '@/shared/ui/Stack';
import { LecturesList } from '@/entities/Lecture';
import { DefinitionsList } from '@/entities/Definition';

interface LkPageProps {
    className?: string;
}

const LkPage = memo((props: LkPageProps) => {
    const { className } = props;

    useEffect(() => {
        document.title = 'Профиль';
    }, []);

    const userData = useSelector(getUserData);

    return (
        <Page className={classNames(classes.LkPage, {}, [className])}>
            <h1 className="text-2xl font-bold">
                Здравствуйте, профессор Иванов{userData?.eduRank} {userData?.lastname}!
            </h1>
            <h2 className="text-xl">
                Здесь Вы можете посмотреть материалы, которые были добавлены на ресурс
            </h2>

            <HStack align="start" maxW className="mt-10">
                <VStack maxW>
                    <h3 className="text-l font-bold">Лекции, которые Вы добавили:</h3>
                    <LecturesList cutUnder={5} />
                </VStack>
                <VStack maxW>
                    <h3 className="text-l font-bold">Определения Ваших дисциплин:</h3>
                    <DefinitionsList cutUnder={5} />
                </VStack>
            </HStack>
        </Page>
    );
});

export default LkPage;
