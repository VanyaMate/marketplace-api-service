export type IDataGenerator<T, C> = {
    [K in keyof T]: () => T[K];
} & {
    byData: (data: C) => T;
    filled: (data?: C) => T;
    clear: () => T;
}