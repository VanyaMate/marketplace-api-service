import { MultiplyResponse, SearchOptions } from '../.interface';


export interface IProductsService<T> {
    findOne (id: string): Promise<T>;

    findMany (filters: Partial<T>, options: SearchOptions<T>): Promise<MultiplyResponse<T>>;

    findManyByFilter (filter: (product: T) => boolean, options: SearchOptions<T>): Promise<MultiplyResponse<T>>;
}