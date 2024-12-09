export type AuthErrorTypes =
    | 'Username not found'
    | 'Invalid password'
    | 'User with this username or mail already exists';

export interface Tokens {
    access_token: string;
    refresh_token: string;
}

export enum UserRoles {
    ADMIN = 'admin',
    USER = 'user',
    MAIL_CONFIRMED = 'mailConfirmed',
    PROFILE_CONFIRMED = 'profileConfirmed',
    BANNED = 'banned',
}

export interface ServerUser {
    id: number;

    username: string;
    password: string;
    avatar: string;

    firstname: string;
    lastname: string;
    middlename: string;
    rank: string;
    eduRank: string;
}

export type User = Partial<ServerUser>;
