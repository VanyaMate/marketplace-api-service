import { IDataGenerator } from '../../common-services/data-generator.interface';
import { Category, CreateCategoryDto } from './category.type';


export class CategoryDataGenerator implements IDataGenerator<Category, CreateCategoryDto> {
    private readonly _clearCategory: Category = {
        title        : '',
        description  : '',
        parent       : '',
        image        : '',
        subcategories: [],
    };

    public byData (data: CreateCategoryDto): Category {
        return {
            ...this._clearCategory,
            ...data,
        };
    }

    public clear (): Category {
        return { ...this._clearCategory };
    }

    public description (): Category['description'] {
        return '';
    }

    public filled (data: CreateCategoryDto | undefined): Category {
        return {
            ...{
                title        : this.title(),
                description  : this.description(),
                image        : this.image(),
                parent       : this.parent(),
                subcategories: this.subcategories(),
            },
            ...data,
        };
    }

    public image (): Category['image'] {
        return '';
    }

    public parent (): Category['parent'] {
        return '';
    }

    public title (): Category['title'] {
        return '';
    }

    public subcategories (): Category['subcategories'] {
        return [];
    }

}