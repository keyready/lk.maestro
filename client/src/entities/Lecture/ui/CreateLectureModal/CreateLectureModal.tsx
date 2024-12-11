import { Button, Divider, Input, Modal, ModalContent } from '@nextui-org/react';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { getLectureIsLoading } from '../../model/selectors/LectureSelectors';
import { createLecture } from '../../model/services/createLecture';

import { HStack, VStack } from '@/shared/ui/Stack';
import { SubjectSelector } from '@/entities/Subject';
import { MultiplyFilesInput } from '@/shared/ui/MultiplyFilesInput';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { toastDispatch } from '@/widgets/Toaster';

interface CreateLectureModalProps {
    className?: string;
    isModalOpened: boolean;
    setIsModalOpened: (state: boolean) => void;
}

export const CreateLectureModal = (props: CreateLectureModalProps) => {
    const { className, isModalOpened, setIsModalOpened } = props;

    const isLectureCreating = useSelector(getLectureIsLoading);

    const dispatch = useAppDispatch();

    const [selectedSubjectAddedLecture, setSelectedSubjectAddedLecture] = useState<number>(0);
    const [lectureTitle, setLectureTitle] = useState<string>('');
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const handleAddLecture = useCallback(async () => {
        const res = await toastDispatch(
            dispatch(
                createLecture({
                    title: lectureTitle,
                    files: selectedFiles,
                    subjectId: selectedSubjectAddedLecture,
                }),
            ),
            {
                error: 'Произошла ошибка во время добавления лекции...',
                loading: 'Отправляем данные',
                success: 'Лекция сохранена',
            },
        );

        if (res.meta.requestStatus === 'fulfilled') {
            setLectureTitle('');
            setSelectedFiles([]);
        }
    }, [dispatch, lectureTitle, selectedFiles, selectedSubjectAddedLecture]);

    return (
        <Modal size="4xl" isOpen={isModalOpened} onClose={() => setIsModalOpened(false)}>
            <ModalContent className="p-4">
                <VStack maxW gap="8px">
                    <h1 className="text-xl font-bold">Добавить лекцию</h1>
                    <Divider className="bg-accent" />
                    <HStack maxW gap="12px">
                        <h2 className="text-l">Дисциплина:</h2>
                        <SubjectSelector
                            className="w-fit"
                            setSelectedSubjectId={setSelectedSubjectAddedLecture}
                        />
                    </HStack>
                    <HStack maxW gap="12px">
                        <h2 className="text-l text-nowrap">Название лекции:</h2>
                        <Input
                            isDisabled={isLectureCreating}
                            value={lectureTitle}
                            onChange={(ev) => setLectureTitle(ev.target.value)}
                            color="default"
                        />
                    </HStack>
                    <HStack maxW gap="12px">
                        <h2 className="text-l text-nowrap">Файл лекции (до 10):</h2>
                        <MultiplyFilesInput
                            isDisabled={isLectureCreating}
                            onChange={setSelectedFiles}
                            files={selectedFiles}
                        />
                    </HStack>

                    <Button
                        isLoading={isLectureCreating}
                        className="mt-8 text-white font-bold self-end"
                        onClick={handleAddLecture}
                    >
                        {isLectureCreating ? 'Ожидайте...' : 'Добавить лекцию!'}
                    </Button>
                </VStack>
            </ModalContent>
        </Modal>
    );
};
