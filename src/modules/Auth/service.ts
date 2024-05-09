import ApiClient from "@/service/httpClient";
import type { Login } from "./types";

export default class UserService {
  private apiClient: ApiClient;

  constructor() {
    this.apiClient = new ApiClient();
  }

  async login(login: Login) {
    return this.apiClient.post("/auth/login", { ...login });
  }

}