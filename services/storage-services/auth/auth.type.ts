import {
    IntersectionPropertiesOf3,
} from '../../common-services/common.type.ts';
import { IAuthService } from './auth.interface.ts';


export type AuthStorageServiceOptions<T, P, C> = {
    [K in keyof IAuthService<T>]?: {
        timeout: number,
    }
} & {
    options: {
        timeout?: number,
        loginKeyName: IntersectionPropertiesOf3<T, P, C>;
        passwordKeyName: IntersectionPropertiesOf3<T, P, C>;
    }
}