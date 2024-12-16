import { Suspense, useEffect } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/classNames';
import { useTheme } from '@/app/providers/ThemeProvider';
import { AppRouter } from '@/app/providers/AppRouter';
import { Toaster } from '@/widgets/Toaster';
import { Sidebar } from '@/widgets/Sidebar';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { getUserData, UserActions } from '@/entities/User';
import { USER_ACCESS } from '@/shared/const';

export const App = () => {
    const { theme } = useTheme();

    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const userData = useSelector(getUserData);

    useEffect(() => {
        const userLS = localStorage.getItem(USER_ACCESS);
        if (userLS) {
            dispatch(UserActions.setUserData(JSON.parse(userLS)));
        }
    }, [dispatch]);

    return (
        <NextUIProvider navigate={navigate}>
            <div className={classNames('app', {}, [theme])}>
                <Suspense fallback="">
                    <div className="flex w-full">
                        {userData && <Sidebar />}
                        {/* <Sidebar /> */}
                        <AppRouter />
                    </div>
                    <Toaster />
                </Suspense>
            </div>
        </NextUIProvider>
    );
};
