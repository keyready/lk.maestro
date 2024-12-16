import { memo, useCallback, useState } from 'react';
import {
    Button,
    ButtonGroup,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    SharedSelection,
} from '@nextui-org/react';
import { RiArrowDownLine, RiCloseLine } from '@remixicon/react';

import { Subject } from '../../model/types/Subject';
import { useSubjects } from '../../api/SubjectApi';

interface SubjectSelectorProps {
    className?: string;
    setSelectedSubjectId: (id: number) => void;
}

export const SubjectSelector = memo((props: SubjectSelectorProps) => {
    const { className, setSelectedSubjectId } = props;

    const { data: subjects, isLoading } = useSubjects();

    const [selectedSubject, setSelectedSubject] = useState<Subject>({
        title: 'Выберите дисциплину...',
        id: 0,
    });

    const handleClearFilters = useCallback(() => {
        setSelectedSubject({
            title: 'Выберите дисциплину...',
            id: 0,
        });
        setSelectedSubjectId(0);
    }, [setSelectedSubjectId]);

    const handleChangeSelectedSubject = useCallback(
        (keys: SharedSelection) => {
            if (!subjects?.length) return;

            const foundSubject = subjects?.filter(
                (s) => s.id.toString() === keys.currentKey?.toString(),
            );
            if (foundSubject?.length) {
                setSelectedSubject(foundSubject[0]);
                setSelectedSubjectId(foundSubject[0].id);
            }
        },
        [setSelectedSubjectId, subjects],
    );

    return (
        <ButtonGroup>
            <Button className="text-white min-w-32 justify-start">{selectedSubject?.title}</Button>
            <Dropdown isDisabled={!subjects?.length}>
                <DropdownTrigger>
                    <Button isLoading={isLoading} isIconOnly variant="solid">
                        <RiArrowDownLine size={18} color="white" />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    variant="flat"
                    selectionMode="single"
                    selectedKeys={[selectedSubject?.id.toString()]}
                    items={subjects}
                    onSelectionChange={handleChangeSelectedSubject}
                    emptyContent="Не добавлено ни одной дисциплины"
                >
                    {(subject) => (
                        <DropdownItem key={subject.id.toString()}>{subject.title}</DropdownItem>
                    )}
                </DropdownMenu>
            </Dropdown>
            <Button onPress={handleClearFilters} color="danger" isIconOnly>
                <RiCloseLine />
            </Button>
        </ButtonGroup>
    );
});
