import Separator from '@vanyamate/separator';
import { ISeparator } from '@vanyamate/separator/separator.interface';
import { NO_VALID_DATA, NOT_FOUND } from '../../../config/errors.config';
import {
    PK,
} from '../common.type';
import {
    ISingleService,
    SingleServiceOptions,
} from './single-service.interface';
import { IStorageService } from '../storage/storage-service.interface';
import { IDataGenerator } from '../data-generator.interface';


export class SingleService<T, C, U> implements ISingleService<T, C, U> {
    protected readonly _separator: ISeparator = new Separator();
    protected _items: T[]                     = [];

    protected constructor (
        protected readonly _storageService: IStorageService<T>,
        protected readonly _dataGenerator: IDataGenerator<T, C>,
        protected readonly _options: SingleServiceOptions<T, C, U>,
    ) {
        this._items = this._storageService.get();
    }

    create (createDto: C): Promise<T> {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                if (!createDto) {
                    reject(NO_VALID_DATA);
                    return;
                }

                const foundItem: T | null = await this._separator
                    .findFirst(
                        this._items,
                        (item) => item[this._options.options.pk] === createDto[this._options.options.pk],
                        {
                            maxOperationsPerStep: 100,
                        },
                    );

                if (foundItem) {
                    reject(NO_VALID_DATA);
                    return;
                }

                const item: T = this._dataGenerator.byData(createDto);
                this._items.push(item);
                this._storageService.set(this._items);

                resolve(item);
            }, this._options.create?.timeout ?? this._options.options.timeout ?? 800);
        });
    }

    delete (pk: PK<T, C>): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            setTimeout(() => {
                if (!pk) {
                    reject(NO_VALID_DATA);
                    return;
                }

                for (let i = 0; i < this._items.length; i++) {
                    const item: T = this._items[i];
                    if (item[this._options.options.pk] === pk) {
                        this._items.splice(i, 1);
                        this._storageService.set(this._items);
                        resolve(true);
                        return;
                    }
                }

                resolve(false);
            }, this._options.delete?.timeout ?? this._options.options.timeout ?? 800);
        });
    }

    read (pk: PK<T, C>): Promise<T | null> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!pk) {
                    reject(NO_VALID_DATA);
                    return;
                }

                this._separator
                    .findFirst(
                        this._items,
                        (item) => item[this._options.options.pk] === pk,
                        {
                            maxOperationsPerStep: 100,
                        },
                    )
                    .then(resolve);
            }, this._options.read?.timeout ?? this._options.options.timeout ?? 800);
        });
    }

    update (pk: PK<T, C>, updateDto: U): Promise<T> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!updateDto || !pk) {
                    reject(NO_VALID_DATA);
                    return;
                }

                for (let i = 0; i < this._items.length; i++) {
                    const item: T = this._items[i];
                    if (item[this._options.options.pk] === pk) {
                        const newData  = { ...item, ...updateDto };
                        this._items[i] = newData;
                        this._storageService.set(this._items);
                        resolve(newData);
                        return;
                    }
                }

                reject(NOT_FOUND);
            }, this._options.update?.timeout ?? this._options.options.timeout ?? 800);
        });
    }
}