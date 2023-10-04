import { SingleService, SingleServiceOptions } from '../single.service';
import { IDataGenerator } from '../data-generator.type';
import { Product, ProductCreateDto, ProductUpdateDto } from './product.type';
import { IStorageService } from '../storage/storage.interface';
import {
    ProductDataGenerator,
} from './product.data-generator';
import { StorageName } from '../../config/storage-names.config';
import { StorageService } from '../storage/storage.service';


export class ProductLocalService<T, C, U> extends SingleService<T, C, U> {
    constructor (
        storageService: IStorageService<T>,
        generator: IDataGenerator<T, C>,
        options: SingleServiceOptions<T, C, U>,
    ) {
        super(
            storageService,
            generator,
            options,
        );
    }
}