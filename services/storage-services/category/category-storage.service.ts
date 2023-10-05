import { IDataGenerator } from '../../common-services/data-generator.interface';
import {
    SingleServiceOptions
} from '../../common-services/single/single-service.interface';
import { SingleService } from '../../common-services/single/single.service';
import {
    IStorageService
} from '../../common-services/storage/storage-service.interface';


export class CategoryStorageService<T, C, U> extends SingleService<T, C, U> {
    constructor (
        storageService: IStorageService<T>,
        generator: IDataGenerator<T, C>,
        options: SingleServiceOptions<T, C, U>,
    ) {
        super(storageService, generator, options);
    }
}