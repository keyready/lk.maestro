import { useSelector } from 'react-redux';
import {
    Button,
    ButtonGroup,
    Checkbox,
    Image,
    InputOtp,
    Modal,
    ModalContent,
} from '@nextui-org/react';
import { useCallback, useEffect, useState } from 'react';

import classes from './Sidebar.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { HStack, VStack } from '@/shared/ui/Stack';
import { getUserData, UserActions } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { USER_OTP } from '@/shared/const';

interface SidebarProps {
    className?: string;
}

export const Sidebar = (props: SidebarProps) => {
    const { className } = props;

    const userData = useSelector(getUserData);

    const dispatch = useAppDispatch();

    const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
    const [isSaveDataEnabled, setIsSaveDataEnabled] = useState<boolean>(false);
    const [otpPass, setOtpPass] = useState<string>('');
    const [isOTPExist, setIsOTPExist] = useState<boolean>(false);

    useEffect(() => {
        const otpLSPass = localStorage.getItem(USER_OTP);
        if (otpLSPass) setIsOTPExist(true);
    }, []);

    const handleLogoutClick = useCallback(() => {
        dispatch(UserActions.logout());
    }, [dispatch]);

    const handleSaveOtpLogout = useCallback(() => {
        handleLogoutClick();
        localStorage.setItem(USER_OTP, btoa(`pass:${otpPass}`));
    }, [handleLogoutClick, otpPass]);

    return (
        <VStack
            justify="between"
            align="center"
            className={classNames(classes.Sidebar, {}, [className])}
        >
            <VStack gap="24px" align="center" maxW>
                <Image width="80px" src="/static/avatar.webp" />
                <VStack align="center" maxW>
                    <h1 className="text-black leading-none">{userData?.rank}</h1>
                    <h1 className="text-black leading-none mb-2">{userData?.eduRank}</h1>
                    <h1 className="text-black leading-none text-l">{userData?.lastname}</h1>
                    <h1 className="text-black leading-none text-l">{userData?.firstname}</h1>
                    <h1 className="text-black leading-none text-l">{userData?.middlename}</h1>
                </VStack>
            </VStack>

            <Button onPress={() => setIsModalOpened(true)} color="danger">
                Выйти
            </Button>

            <Modal isOpen={isModalOpened} onClose={() => setIsModalOpened(false)} size="3xl">
                <ModalContent className="px-6 py-4">
                    <VStack gap="24px" maxW>
                        <h1 className="text-xl font-bold">Уже уходите? Так быстро?</h1>

                        <HStack gap="24px" maxW>
                            <ButtonGroup>
                                <Button onPress={handleLogoutClick} color="danger">
                                    Да!
                                </Button>
                                <Button onPress={() => setIsModalOpened(false)} color="success">
                                    Нет, еще останусь
                                </Button>
                            </ButtonGroup>
                        </HStack>
                        {!isOTPExist && (
                            <>
                                <Checkbox
                                    checked={isSaveDataEnabled}
                                    onValueChange={setIsSaveDataEnabled}
                                    color="secondary"
                                    value="save"
                                >
                                    Запомнить меня
                                </Checkbox>

                                {isSaveDataEnabled && (
                                    <VStack maxW gap="4px">
                                        <h2 className="text-l leadnig-none">
                                            Вы можете придумать быстрый пароль
                                        </h2>
                                        <p className="italic leadnig-none text-danger opacity-70">
                                            Используйте только свои устройства
                                        </p>
                                        <InputOtp
                                            value={otpPass}
                                            onValueChange={(ev) => setOtpPass(ev)}
                                            color="secondary"
                                            length={4}
                                        />
                                        {otpPass?.length === 4 && (
                                            <Button onPress={handleSaveOtpLogout} color="success">
                                                Сохранить и выйти
                                            </Button>
                                        )}
                                    </VStack>
                                )}
                            </>
                        )}
                    </VStack>
                </ModalContent>
            </Modal>
        </VStack>
    );
};
