import { Product } from '../services/product/product.type';


export const objectFilter = function <T> (filters: Partial<T>): (item: T) => boolean {
    return (item: T) => {
        let approach = true;

        Object.keys(filters).forEach((key: keyof Product) => {
            if (typeof item[key] === 'string') {
                if (!item[key].toString().includes(filters[key.toString()])) {
                    approach = false;
                    return;
                }
            } else if (item[key] !== filters[key]) {
                approach = false;
                return;
            }
        });

        return approach;
    };
};