import { MultiplyService } from '../multiply.service';
import { Product } from '../product/product.type';
import { IStorageService } from '../storage/storage.interface';
import { StorageService } from '../storage/storage.service';
import { StorageName } from '../../config/storage-names.config';
import product_1 from '../../data/products/products_1.json';
import product_2 from '../../data/products/products_2.json';


export class ProductsLocalService extends MultiplyService<Product> {
    constructor (
        storageService: IStorageService<Product>,
        ...products: Product[][]
    ) {
        super(
            storageService,
            products,
            (item: Product, id: string) => item.barcode === Number(id),
        );
    }
}

export default new ProductsLocalService(
    new StorageService(
        localStorage,
        StorageName.PRODUCTS,
    ),
    product_1,
    product_2,
);