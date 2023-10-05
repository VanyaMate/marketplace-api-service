import { IDataGenerator } from '../../common-services/data-generator.interface';
import { Product, ProductCreateDto } from './product.type';


export class ProductDataGenerator implements IDataGenerator<Product, ProductCreateDto> {
    private readonly clearProduct: Product = {
        product_name     : '',
        brand            : '',
        brand_name       : '',
        category         : '',
        price            : 0,
        available        : false,
        quantity         : 0,
        description      : '',
        weight           : 0,
        expiration_date  : this.expiration_date(),
        manufacturer     : '',
        country_of_origin: '',
        barcode          : this.barcode(),
        nutritional_facts: '',
        allergens        : '',
        ingredients      : '',
        net_weight       : 0,
        serving_size     : 0,
        calories         : 0,
        fat              : 0,
        carbohydrates    : 0,
        protein          : 0,
        sugar            : 0,
        fiber            : 0,
        vitamin_a        : 0,
        vitamin_c        : 0,
        calcium          : 0,
        iron             : 0,
        image_url        : '',
        images           : [],
        reviews          : 0,
        rating           : 0,
    };

    byData (product: ProductCreateDto): Product {
        return {
            ...this.clearProduct,
            ...product,
        };
    }

    public clear (): Product {
        return { ...this.clearProduct };
    }

    public filled (data: ProductCreateDto | undefined): Product {
        return {
            ...{
                product_name     : this.product_name(),
                brand            : this.brand(),
                brand_name       : this.brand_name(),
                category         : this.category(),
                price            : this.price(),
                available        : this.available(),
                quantity         : this.quantity(),
                description      : this.description(),
                weight           : this.weight(),
                expiration_date  : this.expiration_date(),
                manufacturer     : this.manufacturer(),
                country_of_origin: this.country_of_origin(),
                barcode          : this.barcode(),
                nutritional_facts: this.nutritional_facts(),
                allergens        : this.allergens(),
                ingredients      : this.ingredients(),
                net_weight       : this.net_weight(),
                serving_size     : this.serving_size(),
                calories         : this.calories(),
                fat              : this.fat(),
                carbohydrates    : this.carbohydrates(),
                protein          : this.protein(),
                sugar            : this.sugar(),
                fiber            : this.fiber(),
                vitamin_a        : this.vitamin_a(),
                vitamin_c        : this.vitamin_c(),
                calcium          : this.calcium(),
                iron             : this.iron(),
                image_url        : this.image_url(),
                images           : this.images(),
                reviews          : this.reviews(),
                rating           : this.rating(),
            },
            ...(data || {}),
        };
    }

    public barcode (): number {
        return Math.floor(Math.random() * 10000000000000);
    }

    public expiration_date (): string {
        const date: Date = new Date();
        return `${ date.getDate() }/${ date.getMonth() + 1 }/${ date.getFullYear() }`;
    }

    public allergens (): Product['allergens'] {
        return '';
    }

    public available (): Product['available'] {
        return false;
    }

    public brand (): Product['brand'] {
        return '';
    }

    public brand_name (): Product['brand_name'] {
        return '';
    }

    public calcium (): Product['calcium'] {
        return 0;
    }

    public calories (): Product['calories'] {
        return 0;
    }

    public carbohydrates (): Product['carbohydrates'] {
        return 0;
    }

    public category (): Product['category'] {
        return '';
    }

    public country_of_origin (): Product['country_of_origin'] {
        return '';
    }

    public description (): Product['description'] {
        return '';
    }

    public fat (): Product['fat'] {
        return 0;
    }

    public fiber (): Product['fiber'] {
        return 0;
    }

    public image_url (): Product['image_url'] {
        return '';
    }

    public images (): Product['images'] {
        return [];
    }

    public ingredients (): Product['ingredients'] {
        return '';
    }

    public iron (): Product['iron'] {
        return 0;
    }

    public manufacturer (): Product['manufacturer'] {
        return '';
    }

    public net_weight (): Product['net_weight'] {
        return 0;
    }

    public nutritional_facts (): Product['nutritional_facts'] {
        return 'undefined';
    }

    public price (): Product['price'] {
        return 0;
    }

    public product_name (): Product['product_name'] {
        return '';
    }

    public protein (): Product['protein'] {
        return 0;
    }

    public quantity (): Product['quantity'] {
        return 0;
    }

    public rating (): Product['rating'] {
        return 0;
    }

    public reviews (): Product['reviews'] {
        return 0;
    }

    public serving_size (): Product['serving_size'] {
        return 0;
    }

    public sugar (): Product['sugar'] {
        return 0;
    }

    public vitamin_a (): Product['vitamin_a'] {
        return 0;
    }

    public vitamin_c (): Product['vitamin_c'] {
        return 0;
    }

    public weight (): Product['weight'] {
        return 0;
    }
}