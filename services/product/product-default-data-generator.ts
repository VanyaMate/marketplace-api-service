import { IProductDataGenerator } from './product-data-generator.interface';
import { Product, ProductCreateDto } from './product.type';


export class ProductDefaultDataGenerator implements IProductDataGenerator<Product, ProductCreateDto> {
    byData (product: ProductCreateDto): Product {
        return {
            ...{
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
            },
            ...product,
        };
    }

    public clear (): Product {
        return {
            ...{
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
            },
        };
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
        return undefined;
    }

    public available (): Product['available'] {
        return undefined;
    }

    public brand (): Product['brand'] {
        return undefined;
    }

    public brand_name (): Product['brand_name'] {
        return undefined;
    }

    public calcium (): Product['calcium'] {
        return undefined;
    }

    public calories (): Product['calories'] {
        return undefined;
    }

    public carbohydrates (): Product['carbohydrates'] {
        return undefined;
    }

    public category (): Product['category'] {
        return undefined;
    }

    public country_of_origin (): Product['country_of_origin'] {
        return undefined;
    }

    public description (): Product['description'] {
        return undefined;
    }

    public fat (): Product['fat'] {
        return undefined;
    }

    public fiber (): Product['fiber'] {
        return undefined;
    }

    public image_url (): Product['image_url'] {
        return undefined;
    }

    public images (): Product['images'] {
        return undefined;
    }

    public ingredients (): Product['ingredients'] {
        return undefined;
    }

    public iron (): Product['iron'] {
        return undefined;
    }

    public manufacturer (): Product['manufacturer'] {
        return undefined;
    }

    public net_weight (): Product['net_weight'] {
        return undefined;
    }

    public nutritional_facts (): Product['nutritional_facts'] {
        return undefined;
    }

    public price (): Product['price'] {
        return undefined;
    }

    public product_name (): Product['product_name'] {
        return undefined;
    }

    public protein (): Product['protein'] {
        return undefined;
    }

    public quantity (): Product['quantity'] {
        return undefined;
    }

    public rating (): Product['rating'] {
        return undefined;
    }

    public reviews (): Product['reviews'] {
        return undefined;
    }

    public serving_size (): Product['serving_size'] {
        return undefined;
    }

    public sugar (): Product['sugar'] {
        return undefined;
    }

    public vitamin_a (): Product['vitamin_a'] {
        return undefined;
    }

    public vitamin_c (): Product['vitamin_c'] {
        return undefined;
    }

    public weight (): Product['weight'] {
        return undefined;
    }
}