import { IProductService } from './product.interface';
import { Product } from './product.type';
import { IStorage } from '../storage/storage.interface';
import { ProductDataGenerator } from './product-data-generator';


export class ProductService implements IProductService<Product> {
    private readonly products: Product[] = [];

    constructor (
        private readonly generator: ProductDataGenerator,
        private readonly storage: IStorage<Product>,
        ...products: Product[][]
    ) {
        this.products = [].concat(this.storage.get(), ...products);
    }

    create (product: Product): Promise<Product> {
        return Promise.resolve(undefined);
    }

    delete (id: string): Promise<boolean> {
        return Promise.resolve(false);
    }

    read (id: string): Promise<Product> {
        return Promise.resolve(undefined);
    }

    update (product: Product): Promise<Product> {
        return Promise.resolve(undefined);
    }
}