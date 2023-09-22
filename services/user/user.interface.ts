export interface IUserService<T, P> {
    mapper: IUserMapper<T, P>;

    create (login: string, password: string): Promise<T>;

    read (login: string): Promise<T>;

    update (user: T): Promise<T>;

    delete (login: string): Promise<boolean>;
}

export interface IUserMapper<T, P> {
    toPublic (user: T): P;
}