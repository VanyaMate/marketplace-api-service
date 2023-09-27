export interface IProductService<T, C, U> {
    create (product: C): Promise<T>;

    read (id: string): Promise<T>;

    update (product: U): Promise<T>;

    delete (id: string): Promise<boolean>;
}