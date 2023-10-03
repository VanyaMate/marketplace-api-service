import { StorageName } from '../../config/storage-names.config';
import { Category } from '../category/category.type';
import { MultiplyService } from '../multiply.service';
import { IStorageService } from '../storage/storage.interface';
import { StorageService } from '../storage/storage.service';
import categories from '../../data/categories/categories.json';


export class CategoriesService extends MultiplyService<Category> {
    constructor (
        storageService: IStorageService<Category>,
        ...categories: Category[][]
    ) {
        super(
            storageService,
            categories,
            (category, id) => category === id,
        );
    }
}

export default new CategoriesService(
    new StorageService(
        localStorage,
        StorageName.CATEGORIES,
    ),
    categories,
);