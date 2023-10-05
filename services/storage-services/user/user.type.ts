export type PublicUser = Omit<User, 'password'>;

export type CreateUserDto =
    Partial<Omit<User, 'login' | 'password'>>
    & Pick<User, 'login' | 'password'>;
export type UpdateUserDto = Partial<User>;

export type User = {
    login: string;
    password: string;
    avatar: string;
};
