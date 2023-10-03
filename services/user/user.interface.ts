import { IService } from '../service.interface';


export interface IUserService<T, P, C, U> extends IService<T, C, U> {
    mapper: IUserMapper<T, P>;
}

export interface IUserMapper<T, P> {
    toPublic (user: T): P;
}