import { Product } from './product.type';


export class ProductDataGenerator {
    full (): Product {
        return {
            product_name     : '',
            brand            : '',
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
    }

    barcode (): number {
        return Math.floor(Math.random() * 10000000000000);
    }

    expiration_date (): string {
        const date: Date = new Date();
        return `${ date.getDate() }/${ date.getMonth() + 1 }/${ date.getFullYear() }`;
    }
}