import { SingleService } from '../single.service';
import { IDataGenerator } from '../data-generator.type';
import { CreateUserDto, UpdateUserDto, User } from './user.type';
import { IStorageService } from '../storage/storage.interface';
import { NOT_FOUND, NO_VALID_DATA } from '../../config/errors.config';


export class UserLocalService extends SingleService<User, CreateUserDto, UpdateUserDto> {
    constructor (
        storageService: IStorageService<User>,
        generator: IDataGenerator<User, CreateUserDto>,
    ) {
        super(
            storageService,
            generator,
        );
    }

    create (createUserDto: CreateUserDto): Promise<User> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!createUserDto) {
                    reject(NO_VALID_DATA);
                }

                for (let i = 0; i < this._items.length; i++) {
                    if (this._items[i].login === createUserDto.login) {
                        reject(NO_VALID_DATA);
                    }
                }
                const user: User = this._dataGenerator.byData(createUserDto);
                this._items.push(user);
                this._storageService.set(this._items);

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

                for (let i = 0; i < this._items.length; i++) {
                    const user: User = this._items[i];
                    if (user.login === login) {
                        this._items.splice(i, 1);
                        this._storageService.set(this._items);
                        resolve(true);
                    }
                }

                reject(NOT_FOUND);
            }, 1000);
        });
    }

    read (login: string): Promise<User | null> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!login) {
                    reject(NO_VALID_DATA);
                }

                this._separator
                    .findFirst(
                        this._items,
                        (user) => user.login === login,
                        {
                            maxOperationsPerStep: 100,
                        },
                    )
                    .then(resolve);
            }, 1000);
        });
    }

    update (updateUser: UpdateUserDto): Promise<User> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!updateUser) {
                    reject(NO_VALID_DATA);
                }

                for (let i = 0; i < this._items.length; i++) {
                    const user: User = this._items[i];
                    if (user.login === updateUser.login) {
                        const newData  = { ...user, ...updateUser };
                        this._items[i] = newData;
                        this._storageService.set(this._items);
                        resolve(newData);
                    }
                }

                reject(NOT_FOUND);
            }, 1000);
        });
    }
}