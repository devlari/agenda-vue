export type UserAPI = {
    message: string;
    object: UserResponse;
}

export type User = {
    id: number;
    nome: string;
    email: string;
    dataNascimento: string;
    cpf: string;
    username: string;
    password: string;
    telefone: string;
}

export type UserResponse = {
    tipos: string[];
    usuario: User;
}