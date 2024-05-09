export type Login = {
    username: string;
    password: string;
}

export type AuthInfo = {
    accessToken: string,
    id: number,
    tipos: string[],
    tokenType: string,
    username: string
}