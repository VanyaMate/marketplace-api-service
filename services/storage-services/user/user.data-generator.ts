import { IDataGenerator } from '../../common-services/data-generator.interface';
import { CreateUserDto, User } from './user.type';


export class UserDataGenerator implements IDataGenerator<User, CreateUserDto> {
    private readonly clearUser: User = {
        login   : '',
        password: '',
        avatar  : '',
    };

    public avatar (): User['avatar'] {
        return undefined;
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
            login   : this.login(),
            password: this.password(),
            avatar  : this.avatar(),
        };
    }

    public login (): User['login'] {
        return undefined;
    }

    public password (): User['password'] {
        return undefined;
    }

}