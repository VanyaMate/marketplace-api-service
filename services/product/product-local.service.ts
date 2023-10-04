import { SingleService } from '../single.service';
import { IProductDataGenerator } from './product-data-generator.interface';
import { Product, ProductCreateDto, ProductUpdateDto } from './product.type';
import { IStorageService } from '../storage/storage.interface';
import {
    ProductDefaultDataGenerator,
} from './product-default-data-generator';
import { NOT_FOUND, NO_VALID_DATA } from '../../config/errors.config';
import { StorageName } from '../../config/storage-names.config';
import { StorageService } from '../storage/storage.service';


export class ProductLocalService extends SingleService<Product, ProductCreateDto, ProductUpdateDto> {
    constructor (
        private readonly _generator: IProductDataGenerator<Product, ProductCreateDto>,
        _storageService: IStorageService<Product>,
    ) {
        super(_storageService);
    }

    create (product: ProductCreateDto): Promise<Product> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!product) {
                    reject(NO_VALID_DATA);
                }
                const createdProduct: Product = this._generator.byData(product);
                this._items.push(createdProduct);
                this._storageService.set(this._items);
                resolve(createdProduct);
            }, 800);
        });
    }

    delete (id: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!id) {
                    reject(NO_VALID_DATA);
                }
                for (let i = 0; i < this._items.length; i++) {
                    const product: Product = this._items[i];
                    if (product.barcode === Number(id)) {
                        this._items.splice(i, 1);
                        this._storageService.set(this._items);
                        resolve(true);
                    }
                }
                resolve(false);
            }, 800);
        });
    }

    read (id: string): Promise<Product | null> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!id) {
                    reject(NO_VALID_DATA);
                }
                for (let i = 0; i < this._items.length; i++) {
                    const product: Product = this._items[i];
                    if (product.barcode === Number(id)) {
                        resolve(product);
                    }
                }


                resolve(null);
            }, 800);
        });
    }

    update (updateData: ProductUpdateDto): Promise<Product> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!updateData) {
                    reject(NO_VALID_DATA);
                }
                for (let i = 0; i < this._items.length; i++) {
                    const product: Product = this._items[i];
                    if (product.barcode === updateData.barcode) {
                        this._items[i] = {
                            ...product,
                            ...updateData,
                        };
                        this._storageService.set(this._items);
                        resolve(this._items[i]);
                    }
                }
                reject(NOT_FOUND);
            }, 800);
        });
    }
}

export default new ProductLocalService(
    new ProductDefaultDataGenerator(),
    new StorageService(
        localStorage,
        StorageName.PRODUCTS,
    ),
);