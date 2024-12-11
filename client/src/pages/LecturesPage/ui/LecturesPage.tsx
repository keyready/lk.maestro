import { memo, useEffect, useState } from 'react';
import { Button, Divider } from '@nextui-org/react';
import { RiAddLine } from '@remixicon/react';

import classes from './LecturesPage.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { Page } from '@/widgets/Page';
import { SubjectSelector } from '@/entities/Subject';
import { HStack, VStack } from '@/shared/ui/Stack';
import { CreateLectureModal, LectureReducer, LecturesList } from '@/entities/Lecture';
import { DynamicModuleLoader } from '@/shared/lib/DynamicModuleLoader';

interface LecturesPageProps {
    className?: string;
}

const LecturesPage = memo((props: LecturesPageProps) => {
    const { className } = props;

    useEffect(() => {
        document.title = 'Лекции';
    }, []);

    const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

    const [selectedSubjectId, setSelectedSubjectId] = useState<number>(0);

    return (
        <DynamicModuleLoader reducers={{ lecture: LectureReducer }}>
            <Page className={classNames(classes.LecturesPage, {}, [className])}>
                <h1 className="text-2xl leading-tight font-bold">
                    На этой странице отображаются все лекции по Вашим дисциплинам
                </h1>

                <HStack gap="24px" maxW className="mt-10 relative" align="start">
                    <VStack className="w-fit sticky top-0">
                        <h2 className="font-bold text-nowrap text-xl mb-5 ">Выберете дисциплину</h2>
                        <SubjectSelector setSelectedSubjectId={setSelectedSubjectId} />
                    </VStack>
                    <Divider className="bg-accent w-1 rounded-xl" orientation="vertical" />
                    <VStack maxW className="">
                        <h2 className="text-xl mb-5 font-bold">
                            Найденные лекции по выбранной дисциплине:
                        </h2>
                        <LecturesList subjectId={selectedSubjectId} />
                    </VStack>
                </HStack>

                <Button
                    onClick={() => setIsModalOpened(true)}
                    variant="shadow"
                    className="absolute bottom-8 right-8 w-16 h-16 !min-w-none rounded-full"
                >
                    <RiAddLine color="white" size={128} />
                </Button>

                <CreateLectureModal
                    isModalOpened={isModalOpened}
                    setIsModalOpened={setIsModalOpened}
                />
            </Page>
        </DynamicModuleLoader>
    );
});

export default LecturesPage;
