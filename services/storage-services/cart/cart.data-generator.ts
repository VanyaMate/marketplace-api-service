import { IDataGenerator } from '../../common-services/data-generator.interface.ts';
import { Cart, CreateCartDto } from './cart.type.ts';


export class CartDataGenerator implements IDataGenerator<Cart, CreateCartDto> {
    private readonly _clearData: Cart = {
        userId: '',
        items : [],
    };

    public byData (data: CreateCartDto): Cart {
        return {
            ...this._clearData,
            ...data,
        };
    }

    public clear (): Cart {
        return { ...this._clearData };
    }

    public filled (data: CreateCartDto | undefined): Cart {
        return {
            ...this._clearData,
            ...(data ?? {}),
        };
    }

    public items (): Cart['items'] {
        return [];
    }

    public userId (): Cart['userId'] {
        return '';
    }

}