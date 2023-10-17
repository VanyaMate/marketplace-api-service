export interface IAuthService<T> {
    login (login: string, password: string, remember?: boolean): Promise<T>;

    registration (login: string, password: string, remember?: boolean): Promise<T>;

    refresh (): Promise<T>;

    logout (): Promise<void>;
}