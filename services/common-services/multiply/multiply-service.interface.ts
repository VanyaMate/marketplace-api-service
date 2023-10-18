import { MultiplyResponse, SearchOptions } from '../common.type';


export interface IMultiplyService<Item> {
    findOne (id: string): Promise<Item | null>;

    findMany (filters: Partial<Item>, options: SearchOptions<Item>): Promise<MultiplyResponse<Item>>;

    findManyByFilter (filter: (item: Item) => boolean, options: SearchOptions<Item>): Promise<MultiplyResponse<Item>>;
}