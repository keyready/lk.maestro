import { useNavigate } from 'react-router-dom';

import classes from './MainPage.module.scss';

import { Page } from '@/widgets/Page';
import { classNames } from '@/shared/lib/classNames';
import { VStack } from '@/shared/ui/Stack';
import { TextButton } from '@/shared/ui/TextButton';

const MainPage = () => {
    const navigate = useNavigate();

    return (
        <Page className={classNames(classes.MainPage, {}, [])}>
            <VStack flexGrow maxH justify="center" align="center" maxW gap="24px">
                <h1 className="text-3xl text-white">Featured-Sliced Design App</h1>
                <h2 className="text-l">
                    Данный шаблон построен на архитектуре <TextButton>FSD</TextButton>.
                </h2>
                <h2 className="text-l">
                    Используйте его для создания высоконагруженных приложений
                </h2>
            </VStack>
        </Page>
    );
};

export default MainPage;
