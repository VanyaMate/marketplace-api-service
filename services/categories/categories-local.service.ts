import { Category } from '../category/category.type';
import { MultiplyService } from '../multiply.service';
import { IStorageService } from '../storage/storage.interface';


export class CategoriesService extends MultiplyService<Category> {
    constructor (
        storageService: IStorageService<Category>,
        ...categories: Category[][]
    ) {
        super(
            storageService,
            categories,
            (category, id) => category.title === id,
        );
    }
}