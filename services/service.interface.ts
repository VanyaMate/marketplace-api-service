import { MultiplyResponse, SearchOptions } from './common.type';


export interface IService<T, C, U> {
    create (item: C): Promise<T>;

    read (id: string): Promise<T>;

    update (item: U): Promise<T>;

    delete (id: string): Promise<boolean>;
}

export interface IMultiplyService<T> {
    findOne (id: string): Promise<T>;

    findMany (filters: Partial<T>, options: SearchOptions<T>): Promise<MultiplyResponse<T>>;

    findManyByFilter (filter: (product: T) => boolean, options: SearchOptions<T>): Promise<MultiplyResponse<T>>;
}