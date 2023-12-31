import {
    ISingleService
} from '../../common-services/single/single-service.interface.ts';


export interface IUserService<T, C, U> extends ISingleService<T, C, U> {
}

export interface IUserMapper<T, P> {
    toPublic (user: T): P;
}