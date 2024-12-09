import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input } from '@nextui-org/react';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

import { UserLoginSchema, UserLoginValidationSchema } from '../model/types/LoginValidationSchema';

import { PasswordInput } from '@/shared/ui/PasswordInput';
import { VStack } from '@/shared/ui/Stack';
import {
    getUserAuthError,
    getUserDataService,
    getUserIsLoading,
    loginUser,
    UserActions,
} from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { RoutePath } from '@/shared/config/routeConfig';

interface LoginFormProps {
    className?: string;
}

export const LoginForm = (props: LoginFormProps) => {
    const { className } = props;

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isUserLoading = useSelector(getUserIsLoading);
    const userLoginError = useSelector(getUserAuthError);

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<UserLoginSchema>({
        mode: 'onSubmit',
        resolver: yupResolver(UserLoginValidationSchema),
    });

    useEffect(() => {
        dispatch(UserActions.clearAuthError());
    }, [dispatch]);

    const handleFormSubmit = useCallback(
        async (value: UserLoginSchema) => {
            const result = await dispatch(loginUser(value));

            if (result.meta.requestStatus === 'fulfilled') {
                const userData = await dispatch(getUserDataService());
                if (userData.meta.requestStatus === 'fulfilled') {
                    navigate(RoutePath.main);
                    toast.success('Авторизация успешна!');
                }
            }
        },
        [dispatch, navigate],
    );

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-5">
            <VStack className="p-10" gap="16px" maxW align="center">
                <h1 className="mb-5 leading-none font-bold text-2xl text-accent">Авторизация</h1>
                <Controller
                    control={control}
                    render={({ field }) => (
                        <Input
                            isInvalid={!!errors.username}
                            color={errors.username ? 'danger' : 'default'}
                            errorMessage={errors.username?.message || ''}
                            value={field.value}
                            onChange={(value) => field.onChange(value)}
                            label="Имя пользователя"
                            classNames={{
                                errorMessage: 'text-start',
                            }}
                        />
                    )}
                    name="username"
                />
                <Controller
                    control={control}
                    render={({ field }) => (
                        <PasswordInput
                            isInvalid={!!errors.password}
                            errorMessage={errors.password?.message || ''}
                            value={field.value}
                            onChange={(value) => field.onChange(value)}
                            label="Пароль"
                        />
                    )}
                    name="password"
                />

                {userLoginError && (
                    <p className="self-start italic text-danger">{userLoginError}</p>
                )}

                <Button
                    type="submit"
                    isLoading={isUserLoading}
                    className="text-white w-2/5 self-end"
                >
                    {isUserLoading ? 'Ожидайте...' : 'Войти!'}
                </Button>
            </VStack>
        </form>
    );
};
