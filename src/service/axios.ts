import axios from "axios";

export function getAxiosClient() {
  const api = axios.create({
    baseURL: 'https://demometaway.vps-kinghost.net:8485/api',
    headers: {
      "Content-Type": "application/json"
    }
  });

  return api;
}
