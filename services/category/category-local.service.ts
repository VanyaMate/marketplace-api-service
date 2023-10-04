import { NO_VALID_DATA } from '../../config/errors.config';
import { StorageName } from '../../config/storage-names.config';
import { IDataGenerator } from '../data-generator.type';
import { SingleService } from '../single.service';
import { IStorageService } from '../storage/storage.interface';
import { StorageService } from '../storage/storage.service';
import { CategoryDataGenerator } from './category.data-generator';
import {
    Category,
    CreateCategoryDto,
    UpdateCategoryDto,
} from './category.type';


export class CategoryLocalService extends SingleService<Category, CreateCategoryDto, UpdateCategoryDto> {
    constructor (
        storageService: IStorageService<Category>,
        generator: IDataGenerator<Category, CreateCategoryDto>,
    ) {
        super(storageService, generator);
    }

    public create (data: CreateCategoryDto): Promise<Category> {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                const category: Category | null = await this._separator
                    .findFirst<Category>(
                        this._items,
                        (category) => category.title === data.title,
                        { maxOperationsPerStep: 100 },
                    );

                if (category) {
                    reject(NO_VALID_DATA);
                } else {
                    const category: Category = this._dataGenerator.byData(data);
                    this._items.push(category);
                    this._storageService.set(this._items);
                    resolve(category);
                }
            }, 960);
        });
    }

    public delete (title: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                if (!title) {
                    reject(NO_VALID_DATA);
                }

                this._items = await this._separator.filter(
                    this._items,
                    (category) => category.title !== title,
                    { maxOperationsPerStep: 100 },
                );
                this._storageService.set(this._items);
                resolve(true);
            }, 800);
        });
    }

    public read (title: string): Promise<Category | null> {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                if (!title) {
                    reject(NO_VALID_DATA);
                }

                this._separator
                    .findFirst(
                        this._items,
                        (category) => category.title !== title,
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
                        if (category.title === item.old.title) {
                            return { ...category, ...item.new };
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
    new CategoryDataGenerator(),
);