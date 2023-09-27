import { IProductService } from './product.interface';
import { Product, ProductCreateDto, ProductUpdateDto } from './product.type';
import { IStorage } from '../storage/storage.interface';
import { ProductDataGenerator } from './product-data-generator';
import { NOT_FOUND, NO_VALID_DATA } from '../../config/errors.config';
import { StorageName } from '../../config/storage-names.config';
import { StorageService } from '../storage/storage.service';


export class ProductLocalService implements IProductService<Product, ProductCreateDto, ProductUpdateDto> {
    private readonly products: Product[] = [];

    constructor (
        private readonly generator: ProductDataGenerator,
        private readonly storage: IStorage<Product>,
    ) {
        this.products = [].concat(this.storage.get());
    }

    create (product: ProductCreateDto): Promise<Product> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!product) {
                    reject(NO_VALID_DATA);
                }
                const createdProduct: Product = this.generator.full(product);
                this.products.push(createdProduct);
                this.storage.set(this.products);
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
                for (let i = 0; i < this.products.length; i++) {
                    const product: Product = this.products[i];
                    if (product.barcode === Number(id)) {
                        this.products.splice(i, 1);
                        this.storage.set(this.products);
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
                for (let i = 0; i < this.products.length; i++) {
                    const product: Product = this.products[i];
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
                for (let i = 0; i < this.products.length; i++) {
                    const product: Product = this.products[i];
                    if (product.barcode === updateData.barcode) {
                        this.products[i] = {
                            ...product,
                            ...updateData,
                        };
                        this.storage.set(this.products);
                        resolve(this.products[i]);
                    }
                }
                reject(NOT_FOUND);
            }, 800);
        });
    }
}

export default new ProductLocalService(
    new ProductDataGenerator(),
    new StorageService(
        localStorage,
        StorageName.PRODUCTS,
    ),
);