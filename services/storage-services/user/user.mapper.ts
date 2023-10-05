import { PublicUser, User } from './user.type';
import { IUserMapper } from './user.interface';


export class UserMapper implements IUserMapper<User, PublicUser> {
    public toPublic (user: User): PublicUser {
        return {
            login : user.login,
            avatar: user.avatar,
        };
    }
}