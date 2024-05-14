import { defineStore } from "pinia";
import type { PersonResponse } from "./types";

export const usePersonStore = defineStore('profile', {
    state: () => ({
        person: {} as PersonResponse,
    }),
    actions: {
        setPerson(person: PersonResponse): void {
            this.person = person;
        },
        getPerson(): PersonResponse {
            return this.person;
        }
    }
});
    
    