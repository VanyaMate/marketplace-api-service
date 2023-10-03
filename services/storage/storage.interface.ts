export interface IStorageService<T> {
    get (): T[];

    set (items: T[]): void;
}