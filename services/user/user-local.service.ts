import { IUserMapper, IUserService } from './user.interface';
import { CreateUserDto, PublicUser, UpdateUserDto, User } from './user.type';
import { IStorage } from '../storage/storage.interface';
import { NOT_FOUND, NO_VALID_DATA } from '../../config/errors.config';


export class UserLocalService implements IUserService<User, PublicUser, CreateUserDto, UpdateUserDto> {
    constructor (
        public readonly mapper: IUserMapper<User, PublicUser>,
        public readonly storage: IStorage<User>) {
    }

    create (createUserDto: CreateUserDto): Promise<User> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!createUserDto) {
                    reject(NO_VALID_DATA);
                }

                const users: User[] = this.storage.get();
                for (let i = 0; i < users.length; i++) {
                    if (users[i].login === createUserDto.login) {
                        reject(NO_VALID_DATA);
                    }
                }
                const user: User = {
                    login   : createUserDto.login,
                    password: createUserDto.password,
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

    update (updateUser: UpdateUserDto): Promise<User> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!updateUser) {
                    reject(NO_VALID_DATA);
                }

                const users: User[] = this.storage.get();
                for (let i = 0; i < users.length; i++) {
                    const user: User = users[i];
                    if (user.login === updateUser.login) {
                        const newData = { ...user, ...updateUser };
                        users[i]      = newData;
                        this.storage.set(users);
                        resolve(newData);
                    }
                }

                reject(NOT_FOUND);
            }, 1000);
        });
    }
}