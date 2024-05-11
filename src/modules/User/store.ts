import { defineStore } from "pinia";
import type { User } from "./types";

export const useUserStore = defineStore('user', {
    state: () => ({
        user: {} as User
    }),
    actions: {
        setUser(user: User): void {
            this.user = user;
        },
        getUser(): User {
            return this.user;
        }
    }
});
    
    