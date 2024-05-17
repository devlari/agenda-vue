import ApiClient from "@/service/httpClient";
import { encode } from 'base64-arraybuffer';

export default class PhotoService {
    private apiClient: ApiClient;

    constructor(token: string) {
        this.apiClient = new ApiClient(token);
    }

    async getPhoto(id: number): Promise<string> {
        const res = await this.apiClient.get(`/foto/download/${id}`, { responseType: 'arraybuffer' });
        const base64String = encode(res)
        return base64String;
    }

    // async uploadPhoto(): Promise<> {
    //     return this.apiClient.post("/photo/upload", { ...photo });
    // }
}