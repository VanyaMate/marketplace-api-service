import { MultiplyResponse, SearchOptions } from '../common.type';


export interface IMultiplyService<T> {
    findOne (id: string): Promise<T | null>;

    findMany (filters: Partial<T>, options: SearchOptions<T>): Promise<MultiplyResponse<T>>;

    findManyByFilter (filter: (product: T) => boolean, options: SearchOptions<T>): Promise<MultiplyResponse<T>>;
}