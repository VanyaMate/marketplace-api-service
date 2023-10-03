import Separator from '@vanyamate/separator';
import { ISeparator } from '@vanyamate/separator/separator.interface';
import { NO_VALID_DATA, NOT_FOUND } from '../../config/errors.config';
import { StorageName } from '../../config/storage-names.config';
import { IStorage } from '../storage/storage.interface';
import { StorageService } from '../storage/storage.service';
import { ICategoryService } from './category.interface';
import {
    Category,
    CreateCategoryDto,
    UpdateCategoryDto,
} from './category.type';


export class CategoryService implements ICategoryService<Category, CreateCategoryDto, UpdateCategoryDto> {
    private readonly _separator: ISeparator = new Separator();
    private _categories: Category[]         = [];

    constructor (private readonly storage: IStorage<Category>) {
        this._categories = this.storage.get();
    }

    public create (item: CreateCategoryDto): Promise<Category> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this._separator
                    .findFirst<Category>(
                        this._categories,
                        (category) => category === item,
                        { maxOperationsPerStep: 100 },
                    )
                    .then(() => {
                        reject(NO_VALID_DATA);
                    })
                    .catch(() => {
                        this._categories.push(item);
                        this.storage.set(this._categories);
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

                this._categories = await this._separator.filter(
                    this._categories,
                    (category) => category !== id,
                    { maxOperationsPerStep: 100 },
                );
                this.storage.set(this._categories);
                resolve(true);
            }, 800);
        });
    }

    public read (id: string): Promise<Category> {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                if (!id) {
                    reject(NO_VALID_DATA);
                }

                this._separator
                    .findFirst(
                        this._categories,
                        (category) => category !== id,
                        { maxOperationsPerStep: 100 },
                    )
                    .then(resolve)
                    .catch(() => reject(NOT_FOUND));
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
                    .map<Category, Category>(this._categories, (category) => {
                        if (category === item.old) {
                            return item.new;
                        } else {
                            return category;
                        }
                    }, { maxOperationsPerStep: 100 });

                this._categories = categories;
                this.storage.set(this._categories);
            }, 900);
        });
    }
}

export default new CategoryService(
    new StorageService(
        localStorage,
        StorageName.CATEGORIES,
    ),
);