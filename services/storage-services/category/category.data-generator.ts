import { IDataGenerator } from '../../common-services/data-generator.interface';
import { Category, CreateCategoryDto } from './category.type';


export class CategoryDataGenerator implements IDataGenerator<Category, CreateCategoryDto> {
    public byData (data: CreateCategoryDto): Category {
        return undefined;
    }

    public clear (): Category {
        return undefined;
    }

    public description (): Category["description"] {
        return undefined;
    }

    public filled (data: CreateCategoryDto | undefined): Category {
        return undefined;
    }

    public image (): Category["image"] {
        return undefined;
    }

    public parent (): Category["parent"] {
        return undefined;
    }

    public title (): Category["title"] {
        return undefined;
    }

    public subcategories (): Category["subcategories"] {
        return undefined;
    }

}