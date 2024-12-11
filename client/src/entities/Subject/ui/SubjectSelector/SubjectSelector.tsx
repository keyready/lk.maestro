import { memo, useCallback, useState } from 'react';
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    SharedSelection,
} from '@nextui-org/react';

import { Subject } from '../../model/types/Subject';

interface SubjectSelectorProps {
    className?: string;
    setSelectedSubjectId: (id: number) => void;
}

export const SubjectSelector = memo((props: SubjectSelectorProps) => {
    const { className, setSelectedSubjectId } = props;

    // const { data: subjects, isLoading } = useSubjects();

    const subjects = [
        { id: 1, title: 'АПР' },
        { id: 2, title: 'ИО' },
        { id: 3, title: 'РО' },
        { id: 4, title: 'ПВ' },
    ];

    const [selectedSubject, setSelectedSubject] = useState<Subject>(subjects[0]);

    const handleChangeSelectedSubject = useCallback(
        (keys: SharedSelection) => {
            const foundSubject = subjects.filter(
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
        <Dropdown
            classNames={{
                trigger: 'w-full',
            }}
        >
            <DropdownTrigger>
                <Button variant="solid" className="text-white font-bold">
                    {selectedSubject?.title}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                variant="flat"
                selectionMode="single"
                selectedKeys={[selectedSubject?.id.toString()]}
                items={subjects}
                onSelectionChange={handleChangeSelectedSubject}
            >
                {(subject) => (
                    <DropdownItem key={subject.id.toString()}>{subject.title}</DropdownItem>
                )}
            </DropdownMenu>
        </Dropdown>
    );
});
