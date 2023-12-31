export const storageNamePrefix = '__mps__';

export enum StorageName {
    AUTH       = `${ storageNamePrefix }auth`,
    USERS      = `${ storageNamePrefix }users`,
    PRODUCTS   = `${ storageNamePrefix }products`,
    CATEGORIES = `${ storageNamePrefix }categories`,
    CART       = `${ storageNamePrefix }cart`,
    WISHLIST   = `${ storageNamePrefix }wishlist`,
}