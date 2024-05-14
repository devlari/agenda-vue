import { defineStore } from "pinia";
import type { User } from "./types";

export const useUserStore = defineStore('user', {
    state: () => ({
        user: {} as User,
        tipos: [] as string[]
    }),
    actions: {
        setUser(user: User): void {
            this.user = user;
        },
        getUser(): User {
            return this.user;
        },

        setTipos(tipos: string[]): void {
            this.tipos = tipos;
        },

        getTipos(): string[] {
            return this.tipos;
        }
    }
});
    
    