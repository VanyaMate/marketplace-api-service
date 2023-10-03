import { IProductsService } from './products.interface';
import { Product } from '../product/product.type';
import { MultiplyResponse, SearchOptions, SortOption } from '../.interface';
import { IStorage } from '../storage/storage.interface';
import { StorageService } from '../storage/storage.service';
import { StorageName } from '../../config/storage-names.config';
import product_1 from '../../data/products/products_1.json';
import product_2 from '../../data/products/products_2.json';
import { NO_VALID_DATA, NOT_FOUND } from '../../config/errors.config';
import { ISeparator } from '@vanyamate/separator/separator.interface';
import Separator from '@vanyamate/separator';


export class ProductsService implements IProductsService<Product> {
    private readonly _separator: ISeparator                        = new Separator();
    private readonly _products: Product[]                          = [];
    private readonly _defaultSearchOptions: SearchOptions<Product> = {
        limit : 10,
        offset: 0,
        sort  : [],
    };

    constructor (
        private readonly storage: IStorage<Product>,
        ...products: Product[][]
    ) {
        this._products = products.flat(1);
    }

    get products (): Product[] {
        return [ ...this._products, ...this.storage.get() ];
    }

    findMany (filters: Partial<Product>, options: SearchOptions<Product> = {}): Promise<MultiplyResponse<Product>> {
        return new Promise((resolve) => {
            setTimeout(async () => {
                const filtered: Product[] = await this._separator.filter(this.products, (product: Product) => {
                    let approach = true;

                    Object.keys(filters).forEach((key: keyof Product) => {
                        if (typeof product[key] === 'string') {
                            if (!product[key].toString().includes(filters[key.toString()])) {
                                approach = false;
                                return;
                            }
                        } else if (product[key] !== filters[key]) {
                            approach = false;
                            return;
                        }
                    });

                    return approach;
                }, { maxOperationsPerStep: 100 });

                resolve(
                    this._getMultiplyResponse(
                        options,
                        this._getSorted(filtered, options),
                    ),
                );
            }, 1200);
        });
    }

    findManyByFilter (filter: (product: Product) => boolean, options: SearchOptions<Product> = {}): Promise<MultiplyResponse<Product>> {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                if (!filter) {
                    reject(NO_VALID_DATA);
                }

                const filtered: Product[] = await this._separator.filter(this.products, filter, { maxOperationsPerStep: 100 });

                resolve(
                    this._getMultiplyResponse(
                        options,
                        this._getSorted(filtered, options),
                    ),
                );
            }, 1200);
        });
    }

    findOne (id: string): Promise<Product> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!id) {
                    reject(NO_VALID_DATA);
                }

                this._separator
                    .findFirst<Product>(
                        this.products,
                        (product) => product.barcode === Number(id),
                        { maxOperationsPerStep: 100 },
                    )
                    .then(resolve)
                    .catch(() => reject(NOT_FOUND));
            }, 1200);
        });
    }

    private _getSorted (products: Product[], options: SearchOptions<Product> = this._defaultSearchOptions) {
        if (!options.sort) {
            return products;
        }

        const [ sortOption, type ]: SortOption<Product> = options.sort;

        if (sortOption && type) {
            return products.sort((a: Product, b: Product) => {
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

    private _getMultiplyResponse (options: SearchOptions<Product>, products: Product[]): MultiplyResponse<Product> {
        const fullOptions: SearchOptions<Product> = {
            ...this._defaultSearchOptions,
            ...options,
        };
        const count: number                       = products.length;
        const list: Product[]                     = products.slice(fullOptions.offset, fullOptions.offset + fullOptions.limit);
        return {
            options: fullOptions,
            count  : count,
            list   : list,
        };
    }
}

export default new ProductsService(
    new StorageService(
        localStorage,
        StorageName.PRODUCTS,
    ),
    product_1,
    product_2,
);