import { Button, Divider, Input, Modal, ModalContent } from '@nextui-org/react';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { getDefinitionIsLoading } from '../../model/selectors/DefinitionSelectors';
import { createDefinition } from '../../model/services/createDefinition';

import { classNames } from '@/shared/lib/classNames';
import { HStack, VStack } from '@/shared/ui/Stack';
import { SubjectSelector } from '@/entities/Subject';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { toastDispatch } from '@/widgets/Toaster';

interface CreateDefinitionModalProps {
    className?: string;
    isModalOpened: boolean;
    setIsModalOpened: (state: boolean) => void;
}

export const CreateDefinitionModal = (props: CreateDefinitionModalProps) => {
    const { className, isModalOpened, setIsModalOpened } = props;

    const isDefinitionCreating = useSelector(getDefinitionIsLoading);

    const dispatch = useAppDispatch();

    const [selectedSubjectAddedSentence, setSelectedSubjectAddedSentence] = useState<number>(0);
    const [definition, setDefinition] = useState<string>('');
    const [subject, setSubject] = useState<string>('');

    const handleAddLecture = useCallback(async () => {
        const res = await toastDispatch(
            dispatch(
                createDefinition({
                    obj: subject,
                    definition,
                    subjectId: selectedSubjectAddedSentence,
                }),
            ),
            {
                error: 'Произошла ошибка во время добавления определения...',
                loading: 'Отправляем данные',
                success: 'Определение сохранено',
            },
        );

        if (res.meta.requestStatus === 'fulfilled') {
            setDefinition('');
            setSubject('');
        }
    }, [definition, dispatch, selectedSubjectAddedSentence, subject]);

    return (
        <Modal
            isOpen={isModalOpened}
            onClose={() => setIsModalOpened(false)}
            className={classNames('', {}, [className])}
        >
            <ModalContent className="p-4">
                <VStack maxW gap="8px">
                    <h1 className="text-xl font-bold">Добавить определение</h1>
                    <Divider className="bg-accent" />
                    <HStack maxW gap="12px">
                        <h2 className="text-l">Дисциплина:</h2>
                        <SubjectSelector
                            className="w-fit"
                            setSelectedSubjectId={setSelectedSubjectAddedSentence}
                        />
                    </HStack>
                    <HStack maxW gap="12px">
                        <h2 className="text-l text-nowrap">Понятие:</h2>
                        <Input
                            isDisabled={isDefinitionCreating}
                            value={definition}
                            onChange={(ev) => setDefinition(ev.target.value)}
                            color="secondary"
                        />
                    </HStack>
                    <HStack maxW gap="12px">
                        <h2 className="text-l text-nowrap">Определение:</h2>
                        <Input
                            isDisabled={isDefinitionCreating}
                            value={subject}
                            onChange={(ev) => setSubject(ev.target.value)}
                            color="secondary"
                        />
                    </HStack>

                    <Button
                        isLoading={isDefinitionCreating}
                        className="mt-8 text-white font-bold self-end"
                        onPress={handleAddLecture}
                    >
                        {isDefinitionCreating ? 'Ожидайте...' : 'Добавить определение!'}
                    </Button>
                </VStack>
            </ModalContent>
        </Modal>
    );
};
