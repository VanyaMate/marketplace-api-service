import { NO_VALID_DATA, NOT_FOUND } from '../../config/errors.config';
import { StorageName } from '../../config/storage-names.config';
import { SingleService } from '../single.service';
import { IStorageService } from '../storage/storage.interface';
import { StorageService } from '../storage/storage.service';
import {
    Category,
    CreateCategoryDto,
    UpdateCategoryDto,
} from './category.type';


export class CategoryLocalService extends SingleService<Category, CreateCategoryDto, UpdateCategoryDto> {
    constructor (_storageService: IStorageService<Category>) {
        super(_storageService);
    }

    public create (item: CreateCategoryDto): Promise<Category> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this._separator
                    .findFirst<Category>(
                        this._items,
                        (category) => category === item,
                        { maxOperationsPerStep: 100 },
                    )
                    .then(() => {
                        reject(NO_VALID_DATA);
                    })
                    .catch(() => {
                        this._items.push(item);
                        this._storageService.set(this._items);
                        resolve(item);
                    });
            }, 960);
        });
    }

    public delete (id: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                if (!id) {
                    reject(NO_VALID_DATA);
                }

                this._items = await this._separator.filter(
                    this._items,
                    (category) => category !== id,
                    { maxOperationsPerStep: 100 },
                );
                this._storageService.set(this._items);
                resolve(true);
            }, 800);
        });
    }

    public read (id: string): Promise<Category | null> {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                if (!id) {
                    reject(NO_VALID_DATA);
                }

                this._separator
                    .findFirst(
                        this._items,
                        (category) => category !== id,
                        { maxOperationsPerStep: 100 },
                    )
                    .then(resolve);
            }, 900);
        });
    }

    public update (item: UpdateCategoryDto): Promise<Category> {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                if (!item) {
                    reject(NO_VALID_DATA);
                }

                const categories: Category[] = await this._separator
                    .map<Category, Category>(this._items, (category) => {
                        if (category === item.old) {
                            return item.new;
                        } else {
                            return category;
                        }
                    }, { maxOperationsPerStep: 100 });

                this._items = categories;
                this._storageService.set(this._items);
            }, 900);
        });
    }
}

export default new CategoryLocalService(
    new StorageService(
        localStorage,
        StorageName.CATEGORIES,
    ),
);