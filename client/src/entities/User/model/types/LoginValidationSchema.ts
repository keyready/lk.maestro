import { object, ObjectSchema, string } from 'yup';

import { User } from './User';

export type UserLoginSchema = Omit<
    User,
    'id' | 'avatar' | 'firstname' | 'lastname' | 'middlename' | 'rank' | 'eduRank'
>;

export const UserLoginValidationSchema: ObjectSchema<UserLoginSchema> = object({
    password: string()
        .required('Введите пароль')
        .matches(
            /^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/,
            'Пароль может содержать только латинские буквы, цифры и специальные символы',
        )
        .min(8, 'Минимальная длина пароля - 8 символов'),
    username: string()
        .matches(
            /^[a-zA-Z0-9_]+$/,
            'Используйте только латинские буквы, цифры и знак подчеркивания',
        )
        .required('Введите имя пользователя'),
});
