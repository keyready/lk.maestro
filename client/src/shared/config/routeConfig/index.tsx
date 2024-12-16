import { RouteProps } from 'react-router-dom';

import { MainPage } from '@/pages/MainPage';
import { NotFound } from '@/pages/NotFound';
import { AuthPage } from '@/pages/AuthPage';
import { LkPage } from '@/pages/LkPage';
import { LecturesPage } from '@/pages/LecturesPage';
import { DefinitionsPage } from '@/pages/DefinitionsPage';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
};

export enum AppRoutes {
    MAIN = 'main',
    LK = 'lk',
    DEFINITIONS = 'definitions',
    LECTURES = 'lectures',

    AUTH = 'auth',

    // last
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.AUTH]: '/welcome',
    [AppRoutes.LK]: '/lk',
    [AppRoutes.DEFINITIONS]: '/definitions',
    [AppRoutes.LECTURES]: '/lectures',

    // last
    [AppRoutes.NOT_FOUND]: '/*',
};

export const routerConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
        authOnly: true,
    },
    [AppRoutes.LK]: {
        path: RoutePath.lk,
        element: <LkPage />,
        authOnly: true,
    },
    [AppRoutes.LECTURES]: {
        path: RoutePath.lectures,
        element: <LecturesPage />,
        authOnly: true,
    },
    [AppRoutes.DEFINITIONS]: {
        path: RoutePath.definitions,
        element: <DefinitionsPage />,
        authOnly: true,
    },

    [AppRoutes.AUTH]: {
        path: RoutePath.auth,
        element: <AuthPage />,
    },

    // last
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFound />,
    },
};
