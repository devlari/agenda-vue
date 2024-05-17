import ApiClient from "@/service/httpClient";
import type { Contact } from "./types";

export default class ContactService {
    private apiClient: ApiClient;

    constructor(token: string) {
        this.apiClient = new ApiClient(token);
    }

    async buscarContato(id: number): Promise<Contact> {
        const res: Contact = await this.apiClient.get(`/contato/listar/${id}`);
        return res;
    }

    async pesquisarContatos(termo: string): Promise<Contact[]> {
        return this.apiClient.post(`/contato/pesquisar`, { termo });
    }

    async removerContato(id: number): Promise<void> {
        return this.apiClient.delete(`/contato/remover/${id}`);
    }

    async salvarContato(contact: Contact): Promise<Contact> {
        return this.apiClient.post("/contato/salvar/", { ...contact });
    }


}