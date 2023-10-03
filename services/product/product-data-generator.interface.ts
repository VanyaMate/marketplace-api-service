export type ProductDataGenerator<T, C> = {
    [K in keyof T]: () => T[K];
} & {
    full: (C) => T;
}