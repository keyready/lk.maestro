import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Alert, Button } from '@nextui-org/react';

import classes from './LkPage.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { Page } from '@/widgets/Page';
import { getUserData } from '@/entities/User';
import { HStack, VStack } from '@/shared/ui/Stack';
import { LecturesList, useLectures } from '@/entities/Lecture';
import { DefinitionsList, useDefinitions } from '@/entities/Definition';

interface LkPageProps {
    className?: string;
}

const LkPage = memo((props: LkPageProps) => {
    const { className } = props;

    useEffect(() => {
        document.title = 'Профиль';
    }, []);

    const { data: lectures, isLoading: isLecturesLoading } = useLectures();
    const { data: definitions, isLoading: isDefinitionsLoading } = useDefinitions();

    const userData = useSelector(getUserData);

    return (
        <Page className={classNames(classes.LkPage, {}, [className])}>
            <h1 className="text-2xl font-bold">
                Здравствуйте, {userData?.eduRank} {userData?.lastname}!
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

            <VStack className="fixed bottom-4 right-4 w-2/4">
                {!lectures?.length && !isLecturesLoading && (
                    <Alert
                        color="danger"
                        endContent={
                            <Button color="danger" size="sm" variant="flat">
                                Загрузить
                            </Button>
                        }
                        title="Вы не загрузили лекции своих дисциплин"
                        description="Сделайте это, чтобы не получить санкции"
                        variant="faded"
                    />
                )}
                {!definitions?.length && !isDefinitionsLoading && (
                    <Alert
                        color="danger"
                        endContent={
                            <Button color="danger" size="sm" variant="flat">
                                Загрузить
                            </Button>
                        }
                        title="Вы не загрузили определения"
                        description="Сделайте это, чтобы не получить санкции"
                        variant="faded"
                    />
                )}
            </VStack>
        </Page>
    );
});

export default LkPage;
