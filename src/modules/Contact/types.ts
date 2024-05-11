import type { Person } from "../Person/types";
import type { User } from "../User/types";

export type TypeContact = 'CELULAR' | 'TELEFONE' |'EMAIL'

export type Contact = {
    id: number;
    email: string;
    pessoa: Person;
    privado: boolean;
    tag: string;
    telefone: string;
    tipoContato: TypeContact;
    usuario: User;
}