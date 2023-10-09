import {
    IStorageService,
} from '../../common-services/storage/storage-service.interface';
import { IAuthService } from './auth.interface';
import { IUserMapper, IUserService } from '../user/user.interface';
import { NO_VALID_DATA } from '../../../config/errors.config';
import { AuthStorageServiceOptions } from './auth.type.ts';


export class AuthStorageService<T, P, C, U> implements IAuthService<P> {
    constructor (
        private readonly _userService: IUserService<T, C, U>,
        private readonly _userMapper: IUserMapper<T, P>,
        private readonly _storageService: IStorageService<string>,
        private readonly _options: AuthStorageServiceOptions<T, C>,
    ) {
    }

    login (login: string, password: string): Promise<P> {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                const user: T | null = await this._userService.read(login);
                if (user && user[this._options.options.passwordKeyName] === password) {
                    const publicUser: P = this._userMapper.toPublic(user);
                    this._storageService.set([ login ]);
                    resolve(publicUser);
                } else {
                    reject(NO_VALID_DATA);
                }
            }, this._options.login?.timeout ?? this._options.options.timeout ?? 800);
        });
    }

    logout (): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                this._storageService.set([]);
                resolve();
            }, this._options.logout?.timeout ?? this._options.options.timeout ?? 800);
        });
    }

    refresh (): Promise<P> {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                const [ userLogin ]: string[] = this._storageService.get();
                if (!userLogin) {
                    reject();
                    return;
                }
                const user: T | null = await this._userService.read(userLogin);
                if (!user) {
                    this._storageService.set([]);
                    reject();
                    return;
                }
                const publicUser: P = this._userMapper.toPublic(user);
                resolve(publicUser);
            }, this._options.refresh?.timeout ?? this._options.options.timeout ?? 800);
        });
    }

    registration (login: string, password: string): Promise<P> {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                if (!login || !password) {
                    reject(NO_VALID_DATA);
                }
                try {
                    const user: T       = await this._userService.create({
                        [this._options.options.loginKeyName]   : login,
                        [this._options.options.passwordKeyName]: password,
                    } as C);
                    const publicUser: P = this._userMapper.toPublic(user);
                    resolve(publicUser);
                } catch (e) {
                    reject(e);
                }
            }, this._options.registration?.timeout ?? this._options.options.timeout ?? 800);
        });
    }
}