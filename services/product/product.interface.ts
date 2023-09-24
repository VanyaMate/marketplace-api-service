export interface IProductService<T> {
    create (product: T): Promise<T>;

    read (id: string): Promise<T>;

    update (product: T): Promise<T>;

    delete (id: string): Promise<boolean>;
}

export type IProductDataGenerator<T> = {

}