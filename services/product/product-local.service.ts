import { IProductService } from './product.interface';
import { Product, ProductCreateDto } from './product.type';
import { IStorage } from '../storage/storage.interface';
import { ProductDataGenerator } from './product-data-generator';
import { NO_VALID_DATA } from '../../config/errors.config';
import { StorageService } from '../storage/storage.service';
import { StorageName } from '../../config/storage-names.config';


export class ProductLocalService implements IProductService<Product> {
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
            }, 500);
        });
    }

    delete (id: string): Promise<boolean> {
        return Promise.resolve(false);
    }

    read (id: string): Promise<Product> {
        return Promise.resolve(undefined);
    }

    update (product: ProductCreateDto): Promise<Product> {
        return Promise.resolve(undefined);
    }
}