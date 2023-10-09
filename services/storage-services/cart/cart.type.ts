export type CartItem = {
    productId: string;
    amount: number;
}

export type Cart = {
    userId: string;
    items: CartItem[];
}

export type CreateCartDto = Pick<Cart, 'userId'>;
export type UpdateCartDto = Pick<Cart, 'items'>;