import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

import { DefinitionCard } from '../DefinitionCard/DefinitionCard';

import { classNames } from '@/shared/lib/classNames';
import { useDefinitions } from '@/entities/Definition';
import { RoutePath } from '@/shared/config/routeConfig';
import { VStack } from '@/shared/ui/Stack';
import { TextButton } from '@/shared/ui/TextButton';

interface DefinitionsListProps {
    className?: string;
    cutUnder?: number;
}

export const DefinitionsList = (props: DefinitionsListProps) => {
    const { className, cutUnder } = props;

    const { isLoading, data: definitions } = useDefinitions();

    const navigate = useNavigate();

    const handleAllDefinitionsCLick = useCallback(() => {
        navigate(RoutePath.definitions);
    }, [navigate]);

    if (isLoading) {
        return <h1>Подгружаем данные....</h1>;
    }

    if (!isLoading && !definitions?.length) {
        return (
            <VStack maxW gap="0" className="mt-4">
                <h1 className="italic leading-none text-danger">Вы пока ничего не добавили</h1>
                <p>
                    Добавить опеределения можно{' '}
                    <TextButton onClick={handleAllDefinitionsCLick}>здесь</TextButton>
                </p>
            </VStack>
        );
    }

    return (
        <VStack maxW className={classNames('', {}, [className])}>
            {definitions?.slice(0, cutUnder || 1000).map((definition) => (
                <DefinitionCard definition={definition} key={definition.id} />
            ))}
            {cutUnder && (
                <p>
                    Все определения можно посмотреть{' '}
                    <TextButton onClick={handleAllDefinitionsCLick}>здесь</TextButton>
                </p>
            )}
        </VStack>
    );
};
