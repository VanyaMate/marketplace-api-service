import { IStorageService } from './storage.interface';


export class StorageService<T> implements IStorageService<T> {
    constructor (
        private readonly _storage: Storage,
        private readonly _storageName: string,
    ) {
    }

    get (): T[] {
        const result: string | null = this._storage.getItem(this._storageName);
        return result ? JSON.parse(result) : [];
    }

    set (items: T[]): void {
        this._storage.setItem(this._storageName, JSON.stringify(items));
    }
}