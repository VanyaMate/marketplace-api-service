import {
    MultiplyServiceOptions
} from '../../common-services/multiply/multiply-service.type';
import {
    MultiplyService
} from '../../common-services/multiply/multiply.service';
import {
    IStorageService
} from '../../common-services/storage/storage-service.interface';


export class ProductsStorageService<T> extends MultiplyService<T> {
    constructor (
        storageService: IStorageService<T>,
        options: MultiplyServiceOptions<T>,
    ) {
        super(
            storageService,
            options,
        );
    }
}