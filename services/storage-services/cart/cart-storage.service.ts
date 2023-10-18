import {
    IDataGenerator,
} from '../../common-services/data-generator.interface.ts';
import {
    SingleServiceOptions,
} from '../../common-services/single/single-service.interface.ts';
import { SingleService } from '../../common-services/single/single.service.ts';
import {
    IStorageService,
} from '../../common-services/storage/storage-service.interface.ts';


export class CartStorageService<T, C, U> extends SingleService<T, C, U> {
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