import { IntersectionPropertiesOf2 } from '../common.type';


export interface ISingleService<T, C, U> {
    create (item: C): Promise<T>;

    read (pk: any): Promise<T | null>;

    update (pk: any, item: U): Promise<T>;

    delete (pk: any): Promise<boolean>;
}

export type SingleServiceOptions<T, C, U> = {
    [K in keyof ISingleService<T, C, U>]?: {
        timeout: number,
    }
} & {
    options: {
        timeout?: number,
        pk: IntersectionPropertiesOf2<T, C>,
    }
}