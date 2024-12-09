import { Input } from '@nextui-org/react';
import { RiEyeLine, RiEyeOffLine } from '@remixicon/react';
import { useState } from 'react';

import { classNames } from '@/shared/lib/classNames';

interface PasswordInputProps {
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
    label?: string;
    isInvalid?: boolean;
    errorMessage?: string;
}

export const PasswordInput = (props: PasswordInputProps) => {
    const { className, label, errorMessage, isInvalid, value, onChange } = props;

    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    return (
        <Input
            isInvalid={isInvalid}
            errorMessage={errorMessage}
            value={value}
            label={label}
            type={isPasswordVisible ? 'text' : 'password'}
            color={isInvalid ? 'danger' : 'default'}
            endContent={
                <button
                    tabIndex={-1}
                    onClick={() => setIsPasswordVisible((prevState) => !prevState)}
                    type="button"
                    aria-label={isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'}
                >
                    {isPasswordVisible ? (
                        <RiEyeOffLine className="opacity-50" />
                    ) : (
                        <RiEyeLine className="opacity-50" />
                    )}
                </button>
            }
            onChange={(ev) => onChange?.(ev.target.value)}
            className={classNames('', {}, [className])}
            classNames={{
                errorMessage: 'text-start',
            }}
        />
    );
};
