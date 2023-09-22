import { PublicUser } from '../user/user.type';


export interface IAuthService {
    login (login: string, password: string): Promise<PublicUser>;

    registration (login: string, password: string): Promise<PublicUser>;

    refresh (): Promise<PublicUser>;

    logout (): Promise<void>;
}