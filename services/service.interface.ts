import {
    MultiplyResponse, PK,
    SearchOptions,
} from './common.type';


export interface IService<T, C, U> {
    create (item: C): Promise<T>;

    read (pk: any): Promise<T | null>;

    update (pk: any, item: U): Promise<T>;

    delete (pk: any): Promise<boolean>;
}

export interface IMultiplyService<T> {
    findOne (id: string): Promise<T | null>;

    findMany (filters: Partial<T>, options: SearchOptions<T>): Promise<MultiplyResponse<T>>;

    findManyByFilter (filter: (product: T) => boolean, options: SearchOptions<T>): Promise<MultiplyResponse<T>>;
}