export type PublicUser = Omit<User, 'password'>;

export type CreateUserDto =
    Partial<Omit<User, 'login' | 'password'>>
    & Pick<User, 'login' | 'password'>;
export type UpdateUserDto =
    Partial<Omit<User, 'login' | 'password'>>
    & Pick<User, 'login'>;

export type User = {
    login: string;
    password: string;
    avatar: string;
};
