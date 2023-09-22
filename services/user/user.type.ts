export type PublicUser = Omit<User, 'password'>;

export type User = {
    login: string;
    password: string;
    avatar: string;
};
