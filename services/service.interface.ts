export interface IService<T, C, U> {
    create (item: C): Promise<T>;

    read (id: string): Promise<T>;

    update (item: U): Promise<T>;

    delete (id: string): Promise<boolean>;
}