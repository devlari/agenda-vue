import ApiClient from "@/service/httpClient";
import type { User } from "./types";

export default class UserService {
  private apiClient: ApiClient;

  constructor() {
    this.apiClient = new ApiClient();
  }

  async alterarSenha(user: User): Promise<User> {
    return this.apiClient.post("/usuario/alterar-senha/", { ...user });
  }

  async atualizarUsuario(user: User): Promise<User> {
    return this.apiClient.put("/usuario/atualizar/", { ...user });
  }

  async buscarUsuario(id: number): Promise<User> {
    // return this.apiClient.get(`/usuario/buscar/${id}`);

    const mockUser: User = {
      id: 1,
      nome: "Usuário",
      email: "usuario@example.com",
      dataNascimento: "1990-01-01",
      cpf: "123.456.789-00",
      username: "usuario",
      password: "senha123",
      telefone: "(00) 1234-5678"
    };

    return mockUser;
  }

  async pesquisarUsuarios(termo: string): Promise<User[]> {
    return this.apiClient.post(`/usuario/pesquisar`, { termo });
  }

  async salvarUsuario(user: User): Promise<User> {
    return this.apiClient.post("/usuario/salvar/", { ...user });
  }

}