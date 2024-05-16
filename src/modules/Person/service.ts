import ApiClient from "@/service/httpClient";
import type { Person, PersonForm, PersonResponse } from "./types";

export default class PersonService {
  private apiClient: ApiClient;

  constructor(token: string) {
    this.apiClient = new ApiClient(token);
  }

  async buscarPessoa(id: number): Promise<PersonResponse> {
    const res: PersonResponse = await this.apiClient.get(`/pessoa/buscar/${id}`);   
    return res;
  }

  async pesquisarPessoas(nome: string): Promise<Person[]> {
    return this.apiClient.post(`/pessoa/pesquisar`, { nome });
  }

  async removerPessoa(id: number): Promise<void> {
    return this.apiClient.delete(`/pessoa/remover/${id}`);
  }

  async salvarPessoa(person: Person | PersonForm): Promise<PersonResponse> {
    return this.apiClient.post("/pessoa/salvar/", { ...person });
  }

}