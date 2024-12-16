import { Navigate, useLocation } from 'react-router-dom';

import { RoutePath } from '@/shared/config/routeConfig';
import { USER_ACCESS } from '@/shared/const';

interface RequireAuthProps {
    children: JSX.Element;
}
export function RequireAuth({ children }: RequireAuthProps) {
    const userLS = localStorage.getItem(USER_ACCESS);

    const currentLocation = useLocation();

    if (!userLS) {
        return <Navigate to={RoutePath.auth} state={{ from: currentLocation }} replace />;
    }

    return children;
}
