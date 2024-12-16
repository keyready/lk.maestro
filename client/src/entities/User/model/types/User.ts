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
