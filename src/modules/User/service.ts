import ApiClient from "@/service/httpClient";
import type { User, UserAPI, UserResponse } from "./types";

export default class UserService {
  private apiClient: ApiClient;

  constructor(token: string) {
    this.apiClient = new ApiClient(token);
  }

  async alterarSenha(user: User): Promise<User> {
    return this.apiClient.post("/usuario/alterar-senha/", { ...user });
  }

  async atualizarUsuario(user: User): Promise<User> {
    return this.apiClient.put("/usuario/atualizar/", { ...user });
  }

  async buscarUsuario(id: number): Promise<UserResponse> {
    const res: UserAPI = await this.apiClient.get(`/usuario/buscar/${id}`);

    return res.object;
  }

  async pesquisarUsuarios(termo: string): Promise<User[]> {
    return this.apiClient.post(`/usuario/pesquisar`, { termo });
  }

  async salvarUsuario(user: User): Promise<User> {
    return this.apiClient.post("/usuario/salvar/", { ...user });
  }

}