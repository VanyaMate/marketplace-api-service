export interface IAuthService<User> {
    login (login: string, password: string, remember?: boolean): Promise<User>;

    registration (login: string, password: string, remember?: boolean): Promise<User>;

    refresh (): Promise<User>;

    logout (): Promise<void>;
}