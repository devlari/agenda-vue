import type { AxiosInstance } from "axios";
import { getAxiosClient } from "./axios";

export default class ApiClient {
  public axiosInstance: AxiosInstance;

  constructor(token: string) {
    this.axiosInstance = getAxiosClient();
    this.axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  async get<T = any>(url: string, data = {}): Promise<T> {
    return this.axiosInstance
      .get(url, data)
      .then((response) => response.data as T);
  }

    async post<T = any>(url: string, data = {}): Promise<T> {
        return this.axiosInstance
        .post(url, data)
        .then((response) => response.data as T);
    }

    async put<T = any>(url: string, data = {}): Promise<T> {
        return this.axiosInstance
        .put(url, data)
        .then((response) => response.data as T);
    }

    async delete<T = any>(url: string, data = {}): Promise<T> {
        return this.axiosInstance
        .delete(url, data)
        .then((response) => response.data as T);
    }
}
