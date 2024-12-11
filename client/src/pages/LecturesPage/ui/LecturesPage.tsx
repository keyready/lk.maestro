import { memo, useEffect, useState } from 'react';
import { Divider } from '@nextui-org/react';

import classes from './LecturesPage.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { Page } from '@/widgets/Page';
import { SubjectSelector } from '@/entities/Subject';
import { HStack, VStack } from '@/shared/ui/Stack';

interface LecturesPageProps {
    className?: string;
}

const LecturesPage = memo((props: LecturesPageProps) => {
    const { className } = props;

    useEffect(() => {
        document.title = 'Лекции';
    }, []);

    const [selectedSubjectId, setSelectedSubjectId] = useState<number>(0);

    return (
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
                        Найденные лекции по выбранной дисциплине
                    </h2>
                </VStack>
            </HStack>
        </Page>
    );
});

export default LecturesPage;
