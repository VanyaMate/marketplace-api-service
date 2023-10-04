import { MultiplyService } from '../multiply.service';
import { Product } from '../product/product.type';
import { IStorageService } from '../storage/storage.interface';


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