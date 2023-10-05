export type IntersectionPropertiesOf3<T, U, V> =
    Extract<keyof T, keyof U & keyof V> |
    Extract<keyof U, keyof T & keyof V> |
    Extract<keyof V, keyof T & keyof U>;

export type IntersectionPropertiesOf2<T, U> =
    Extract<keyof T, keyof U> |
    Extract<keyof U, keyof T>;

export type PK<T, C> = T[IntersectionPropertiesOf2<T, C>];

export type SortOption<T> =
    [ keyof T, 'asc' | 'desc' ]
    | [];

export type SearchOptions<T> = {
    limit?: number;
    offset?: number;
    sort?: SortOption<T>;
}

export type MultiplyResponse<T> = {
    list: T[];
    options: SearchOptions<T>;
    count: number;
}