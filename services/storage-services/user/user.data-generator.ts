import { IDataGenerator } from '../../common-services/data-generator.interface.ts';
import { CreateUserDto, User } from './user.type.ts';


export class UserDataGenerator implements IDataGenerator<User, CreateUserDto> {
    private readonly clearUser: User = {
        login   : '',
        password: '',
        avatar  : '',
    };

    public avatar (): User['avatar'] {
        return '';
    }

    public byData (data: CreateUserDto): User {
        return {
            ...this.clearUser,
            ...data,
        };
    }

    public clear (): User {
        return { ...this.clearUser };
    }

    public filled (data: CreateUserDto | undefined): User {
        return {
            ...{
                login   : this.login(),
                password: this.password(),
                avatar  : this.avatar(),
            },
            ...data,
        };
    }

    public login (): User['login'] {
        return '';
    }

    public password (): User['password'] {
        return '';
    }

}