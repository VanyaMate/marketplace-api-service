export interface ICartService<Cart> {
    getMyCart (): Promise<Cart>;

    addToCart (id: string, amount?: number): Promise<Cart>;

    changeCartItem (id: string, amount: number): Promise<Cart>;

    deleteFromCart (id: string): Promise<Cart>;
}