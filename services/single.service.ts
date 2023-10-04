import Separator from '@vanyamate/separator';
import { ISeparator } from '@vanyamate/separator/separator.interface';
import { IService } from './service.interface';
import { IStorageService } from './storage/storage.interface';


export abstract class SingleService<T, R, C> implements IService<T, R, C> {
    protected _items: T[]            = [];
    protected _separator: ISeparator = new Separator();

    protected constructor (protected readonly _storageService: IStorageService<T>) {
        this._items = this._storageService.get();
    }

    public abstract create (item: R): Promise<T>;

    public abstract delete (id: string): Promise<boolean>;

    public abstract read (id: string): Promise<T | null>;

    public abstract update (item: C): Promise<T>;
}