import { IMultiplyService } from './multiply-service.interface';


export type FindOneFilter<T> = (item: T, id: string) => boolean;

export type MultiplyServiceOptions<T> = {
    [K in keyof IMultiplyService<T>]?: {
        timeout?: number,
        maxOperationsPerStep?: number,
    }
} & {
    options: {
        timeout?: number,
        maxOperationsPerStep?: number,
        items?: T[],
        findOneFilter: FindOneFilter<T>,
    }
}