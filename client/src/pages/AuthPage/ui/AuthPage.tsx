import { memo, useEffect } from 'react';

import classes from './AuthPage.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { Page } from '@/widgets/Page';
import { LoginForm } from '@/entities/User';

interface AuthPageProps {
    className?: string;
}

const AuthPage = memo((props: AuthPageProps) => {
    const { className } = props;

    useEffect(() => {
        document.title = 'Авторизация';
    }, []);

    return (
        <Page className={classNames(classes.AuthPage, {}, [className])}>
            <div className="flex items-center justify-center absolute backdrop-blur-md backdrop-brightness-90 top-0 bottom-0 right-0 left-0">
                <div className="z-10 bg-white rounded-xl shadow-lg w-2/4 min-h-2/4">
                    <LoginForm />
                </div>
            </div>
        </Page>
    );
});

export default AuthPage;
