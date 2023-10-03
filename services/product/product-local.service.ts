import { IProductDataGenerator } from './product-data-generator.interface';
import { IProductService } from './product.interface';
import { Product, ProductCreateDto, ProductUpdateDto } from './product.type';
import { IStorageService } from '../storage/storage.interface';
import {
    ProductDefaultDataGenerator,
} from './product-default-data-generator';
import { NOT_FOUND, NO_VALID_DATA } from '../../config/errors.config';
import { StorageName } from '../../config/storage-names.config';
import { StorageService } from '../storage/storage.service';


export class ProductLocalService implements IProductService<Product, ProductCreateDto, ProductUpdateDto> {
    private readonly _products: Product[] = [];

    constructor (
        private readonly _generator: IProductDataGenerator<Product, ProductCreateDto>,
        private readonly _storageService: IStorageService<Product>,
    ) {
        this._products = [].concat(this._storageService.get());
    }

    create (product: ProductCreateDto): Promise<Product> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!product) {
                    reject(NO_VALID_DATA);
                }
                const createdProduct: Product = this._generator.byData(product);
                this._products.push(createdProduct);
                this._storageService.set(this._products);
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
                for (let i = 0; i < this._products.length; i++) {
                    const product: Product = this._products[i];
                    if (product.barcode === Number(id)) {
                        this._products.splice(i, 1);
                        this._storageService.set(this._products);
                        resolve(true);
                    }
                }
                resolve(false);
            }, 800);
        });
    }

    read (id: string): Promise<Product> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!id) {
                    reject(NO_VALID_DATA);
                }
                for (let i = 0; i < this._products.length; i++) {
                    const product: Product = this._products[i];
                    if (product.barcode === Number(id)) {
                        resolve(product);
                    }
                }
                reject(NOT_FOUND);
            }, 800);
        });
    }

    update (updateData: ProductUpdateDto): Promise<Product> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!updateData) {
                    reject(NO_VALID_DATA);
                }
                for (let i = 0; i < this._products.length; i++) {
                    const product: Product = this._products[i];
                    if (product.barcode === updateData.barcode) {
                        this._products[i] = {
                            ...product,
                            ...updateData,
                        };
                        this._storageService.set(this._products);
                        resolve(this._products[i]);
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