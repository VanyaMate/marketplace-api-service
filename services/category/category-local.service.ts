import { IDataGenerator } from '../data-generator.type';
import { SingleService, SingleServiceOptions } from '../single.service';
import { IStorageService } from '../storage/storage.interface';


export class CategoryLocalService<T, C, U> extends SingleService<T, C, U> {
    constructor (
        storageService: IStorageService<T>,
        generator: IDataGenerator<T, C>,
        options: SingleServiceOptions<T, C, U>,
    ) {
        super(storageService, generator, options);
    }
}