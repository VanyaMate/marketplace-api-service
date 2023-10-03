export type IProductDataGenerator<T, C> = {
    [K in keyof T]: () => T[K];
} & {
    full: (C) => T;
}