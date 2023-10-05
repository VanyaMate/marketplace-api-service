import {
    IStorageService
} from '../../common-services/storage/storage-service.interface';
import { IAuthService } from './auth.interface';
import { IUserMapper, IUserService } from '../user/user.interface';
import {
    CreateUserDto,
    PublicUser,
    UpdateUserDto,
    User,
} from '../user/user.type';
import { NO_VALID_DATA } from '../../../config/errors.config';


export class AuthLocalService implements IAuthService<PublicUser> {
    constructor (
        private readonly _userService: IUserService<User, CreateUserDto, UpdateUserDto>,
        private readonly _userMapper: IUserMapper<User, PublicUser>,
        private readonly _storageService: IStorageService<string>,
    ) {
    }

    login (login: string, password: string): Promise<PublicUser> {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                const user: User = await this._userService.read(login);
                if (user.password === password) {
                    const publicUser: PublicUser = this._userMapper.toPublic(user);
                    this._storageService.set([ publicUser.login ]);
                    resolve(publicUser);
                } else {
                    reject(NO_VALID_DATA);
                }
            }, 800);
        });
    }

    logout (): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                this._storageService.set([]);
                resolve();
            }, 1000);
        });
    }

    refresh (): Promise<PublicUser> {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                const [ userLogin ]: string[] = this._storageService.get();
                if (!userLogin) {
                    reject();
                }
                const user: User = await this._userService.read(userLogin);
                if (!user) {
                    this._storageService.set([]);
                    reject();
                }
                const publicUser: PublicUser = this._userMapper.toPublic(user);
                resolve(publicUser);
            }, 500);
        });
    }

    registration (login: string, password: string): Promise<PublicUser> {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                if (!login || !password) {
                    reject(NO_VALID_DATA);
                }
                const user: User             = await this._userService.create({
                    login,
                    password,
                });
                const publicUser: PublicUser = this._userMapper.toPublic(user);
                resolve(publicUser);
            }, 800);
        });
    }
}