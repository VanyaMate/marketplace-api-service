import Separator from '@vanyamate/separator';
import { ISeparator } from '@vanyamate/separator/separator.interface';
import { NO_VALID_DATA } from '../../../config/errors.config';
import { objectFilter } from '../../../utils/object-filter';
import {
    MultiplyResponse,
    SearchOptions,
    SortOption,
} from '../common.type';
import { IStorageService } from '../storage/storage-service.interface';
import { IMultiplyService } from './multiply-service.interface';
import { MultiplyServiceOptions } from './multiply-service.type';


export abstract class MultiplyService<T> implements IMultiplyService<T> {
    private readonly _defaultSearchOptions: SearchOptions<T> = {
        limit : 10,
        offset: 0,
        sort  : [],
    };
    protected readonly _separator: ISeparator                = new Separator();

    protected constructor (
        private readonly _storageService: IStorageService<T>,
        private readonly _options: MultiplyServiceOptions<T>,
    ) {
    }

    get items (): T[] {
        return [ ...(this._options.options.items ?? []), ...this._storageService.get() ];
    }

    findMany (filters: Partial<T>, options: SearchOptions<T> = {}): Promise<MultiplyResponse<T>> {
        return new Promise((resolve) => {
            setTimeout(async () => {
                const filtered: T[] = await this._separator.filter(
                    this.items,
                    objectFilter(filters),
                    { maxOperationsPerStep: 100 },
                );

                resolve(
                    this._getMultiplyResponse(
                        options,
                        this._getSorted(filtered, options),
                    ),
                );
            }, 1200);
        });
    }

    findManyByFilter (filter: (product: T) => boolean, options: SearchOptions<T> = {}): Promise<MultiplyResponse<T>> {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                if (!filter) {
                    reject(NO_VALID_DATA);
                }

                const filtered: T[] = await this._separator.filter(
                    this.items,
                    filter,
                    { maxOperationsPerStep: 100 },
                );

                resolve(
                    this._getMultiplyResponse(
                        options,
                        this._getSorted(filtered, options),
                    ),
                );
            }, 1200);
        });
    }

    findOne (id: string): Promise<T | null> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!id) {
                    reject(NO_VALID_DATA);
                }

                this._separator
                    .findFirst<T>(
                        this.items,
                        (item: T) => this._options.options.findOneFilter(item, id),
                        { maxOperationsPerStep: 100 },
                    )
                    .then(resolve);
            }, 1200);
        });
    }

    protected _getSorted (products: T[], options: SearchOptions<T> = this._defaultSearchOptions) {
        if (!options.sort) {
            return products;
        }

        const [ sortOption, type ]: SortOption<T> = options.sort;

        if (sortOption && type) {
            return products.sort((a: T, b: T) => {
                if (typeof a[sortOption] === 'string') {
                    return a[sortOption] > b[sortOption] ? type === 'asc' ? 1
                                                                          : -1
                                                         : type === 'asc' ? -1
                                                                          : 1;
                } else if (typeof a[sortOption] === 'number') {
                    return type === 'asc'
                           ? Number(a[sortOption]) - Number(b[sortOption])
                           : Number(b[sortOption]) - Number(a[sortOption]);
                } else {
                    return 0;
                }
            });
        } else {
            return products;
        }
    }

    protected _getMultiplyResponse (options: SearchOptions<T>, products: T[]): MultiplyResponse<T> {
        const fullOptions: SearchOptions<T> = {
            ...this._defaultSearchOptions,
            ...options,
        };
        const count: number                 = products.length;
        const list: T[]                     = products.slice(fullOptions.offset, fullOptions.offset + fullOptions.limit);
        return {
            options: fullOptions,
            count  : count,
            list   : list,
        };
    }
}