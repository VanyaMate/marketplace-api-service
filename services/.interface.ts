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