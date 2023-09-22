import { IStorage } from './storage.interface';


export class StorageService<T> implements IStorage<T> {
    constructor (
        private readonly storage: Storage,
        private readonly storageName: string,
    ) {
    }

    get (): T[] {
        const result: string | null = this.storage.getItem(this.storageName);
        return result ? JSON.parse(result) : [];
    }

    set (items: T[]): void {
        this.storage.setItem(this.storageName, JSON.stringify(items));
    }
}