import { IUserMapper, IUserService } from './user.interface';
import { PublicUser, User } from './user.type';
import { IStorage } from '../storage/storage.interface';
import { NOT_FOUND, NO_VALID_DATA } from '../../config/errors.config';


export class UserLocalService implements IUserService<User, PublicUser> {
    constructor (
        public readonly mapper: IUserMapper<User, PublicUser>,
        public readonly storage: IStorage<User>) {
    }

    create (login: string, password: string): Promise<User> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!login || !password) {
                    reject(NO_VALID_DATA);
                }

                const users: User[] = this.storage.get();
                for (let i = 0; i < users.length; i++) {
                    if (users[i].login === login) {
                        reject(NO_VALID_DATA);
                    }
                }
                const user: User = {
                    login   : login,
                    password: password,
                    avatar  : '',
                };
                users.push(user);
                this.storage.set(users);

                resolve(user);
            }, 1000);
        });
    }

    delete (login: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!login) {
                    reject(NO_VALID_DATA);
                }

                const users: User[] = this.storage.get();
                for (let i = 0; i < users.length; i++) {
                    const user: User = users[i];
                    if (user.login === login) {
                        users.splice(i, 1);
                        this.storage.set(users);
                        resolve(true);
                    }
                }

                reject(NOT_FOUND);
            }, 1000);
        });
    }

    read (login: string): Promise<User> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!login) {
                    reject(NO_VALID_DATA);
                }

                const users: User[] = this.storage.get();
                for (let i = 0; i < users.length; i++) {
                    const user: User = users[i];
                    if (user.login === login) {
                        resolve(user);
                    }
                }

                reject(NOT_FOUND);
            }, 1000);
        });
    }

    update (updateUser: User): Promise<User> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!updateUser) {
                    reject(NO_VALID_DATA);
                }

                const users: User[] = this.storage.get();
                for (let i = 0; i < users.length; i++) {
                    const user: User = users[i];
                    if (user.login === updateUser.login) {
                        users[i] = updateUser;
                        this.storage.set(users);
                        resolve(updateUser);
                    }
                }

                reject(NOT_FOUND);
            }, 1000);
        });
    }
}