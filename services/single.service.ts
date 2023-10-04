import Separator from '@vanyamate/separator';
import { ISeparator } from '@vanyamate/separator/separator.interface';
import { IService } from './service.interface';
import { IStorageService } from './storage/storage.interface';
import { IDataGenerator } from './data-generator.type';


export abstract class SingleService<T, C, U> implements IService<T, C, U> {
    protected _items: T[]            = [];
    protected _separator: ISeparator = new Separator();

    protected constructor (
        protected readonly _storageService: IStorageService<T>,
        protected readonly _dataGenerator: IDataGenerator<T, C>,
    ) {
        this._items = this._storageService.get();
    }

    public abstract create (item: C): Promise<T>;

    public abstract delete (id: string): Promise<boolean>;

    public abstract read (id: string): Promise<T | null>;

    public abstract update (item: U): Promise<T>;
}