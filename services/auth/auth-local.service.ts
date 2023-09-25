import { IAuthService } from './auth.interface';
import { IUserService } from '../user/user.interface';
import { PublicUser, User } from '../user/user.type';
import { NO_VALID_DATA } from '../../config/errors.config';
import { IStorage } from '../storage/storage.interface';
import { UserLocalService } from '../user/user-local.service';
import { UserMapper } from '../user/user.mapper';
import { StorageService } from '../storage/storage.service';
import { StorageName } from '../../config/storage-names.config';


export class AuthLocalService implements IAuthService {
    constructor (
        private readonly userService: IUserService<User, PublicUser>,
        private readonly storageService: IStorage<string>,
    ) {
    }

    login (login: string, password: string): Promise<PublicUser> {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                const user: User = await this.userService.read(login);
                if (user.password === password) {
                    const publicUser: PublicUser = this.userService.mapper.toPublic(user);
                    this.storageService.set([ publicUser.login ]);
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
                this.storageService.set([]);
                resolve();
            }, 1000);
        });
    }

    refresh (): Promise<PublicUser> {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                const [ userLogin ]: string[] = this.storageService.get();
                if (!userLogin) {
                    reject();
                }
                const user: User = await this.userService.read(userLogin);
                if (!user) {
                    this.storageService.set([]);
                    reject();
                }
                const publicUser: PublicUser = this.userService.mapper.toPublic(user);
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
                const user: User             = await this.userService.create(login, password);
                const publicUser: PublicUser = this.userService.mapper.toPublic(user);
                resolve(publicUser);
            }, 800);
        });
    }
}

export default new AuthLocalService(
    new UserLocalService(
        new UserMapper(),
        new StorageService(
            localStorage,
            StorageName.USERS,
        ),
    ),
    new StorageService(
        localStorage,
        StorageName.AUTH,
    ),
);