import { defineStore } from 'pinia';
import type { Login } from './types';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    username: '',
    password: '',
    isLoggedIn: false,
  }),
  actions: {
    login({username, password}: Login) {
      this.username = username;
      this.password = password;
      this.isLoggedIn = true; 
    },
    logout() {
    },
  },
});