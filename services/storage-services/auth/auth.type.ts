import {
    IntersectionPropertiesOf2,
} from '../../common-services/common.type.ts';
import { IAuthService } from './auth.interface.ts';


export type AuthStorageServiceOptions<T, C> = {
    [K in keyof IAuthService<T>]?: {
        timeout: number,
    }
} & {
    options: {
        timeout?: number,
        loginKeyName: IntersectionPropertiesOf2<T, C>;
        passwordKeyName: IntersectionPropertiesOf2<T, C>;
    }
}