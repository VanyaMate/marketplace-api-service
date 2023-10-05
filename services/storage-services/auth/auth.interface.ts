export interface IAuthService<T> {
    login (login: string, password: string): Promise<T>;

    registration (login: string, password: string): Promise<T>;

    refresh (): Promise<T>;

    logout (): Promise<void>;
}