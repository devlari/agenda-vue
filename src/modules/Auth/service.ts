import ApiClient from "@/service/httpClient";
import type { AuthInfo, Login } from "./types";

export default class AuthService {
  private apiClient: ApiClient;

  constructor() {
    this.apiClient = new ApiClient('');
  }

  async login(login: Login): Promise<AuthInfo> {
    return this.apiClient.post("/auth/login/", { ...login });
  }

}