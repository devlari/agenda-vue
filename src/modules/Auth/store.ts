import { defineStore } from 'pinia';
import type { AuthInfo } from './types';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authInfo: null as AuthInfo | null, 
    rememberMe: false
  }),
  actions: {
    async login(authInfo: AuthInfo): Promise<void> {
      this.authInfo = authInfo; 
      localStorage.setItem('authInfo', JSON.stringify(authInfo)); 
    },
    async logout(): Promise<void> {
      localStorage.removeItem('authInfo'); 
      this.authInfo = null; 
    },
    setRememberMe(rememberMe: boolean) {
      this.rememberMe = rememberMe;
    },
  },
  getters: {
    isAuthenticated(): boolean {
      return !!this.authInfo;
    },
    getRememberMe(): boolean {
      return this.rememberMe;
    },
    getAuthInfo(): AuthInfo | null {
      return this.authInfo;
    }
  }
});