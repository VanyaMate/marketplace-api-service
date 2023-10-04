import { IService } from '../service.interface';


export interface IUserService<T, C, U> extends IService<T, C, U> {
}

export interface IUserMapper<T, P> {
    toPublic (user: T): P;
}