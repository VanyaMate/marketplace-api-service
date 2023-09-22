export interface IStorage<T> {
    get (): T[];

    set (items: T[]): void;
}