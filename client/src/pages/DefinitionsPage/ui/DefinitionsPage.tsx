import { memo, useEffect } from 'react';

import classes from './DefinitionsPage.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { Page } from '@/widgets/Page';

interface DefinitionsPageProps {
    className?: string;
}

const DefinitionsPage = memo((props: DefinitionsPageProps) => {
    const { className } = props;

    useEffect(() => {
        document.title = 'Определения';
    }, []);

    return (
        <Page className={classNames(classes.DefinitionsPage, {}, [className])}>
            <h1>DefinitionsPage</h1>
        </Page>
    );
});

export default DefinitionsPage;
