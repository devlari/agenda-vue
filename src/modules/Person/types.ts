export type Address = {
    bairro: string;
    cep: string;
    cidade: string;
    estado: string;
    id: number;
    logradouro: string;
    numero: number;
    pais: string;
  }
  
export type Photo = {
    id: string;
    name: string;
    type: string;
}
  
export type Person = {
    id: number;
    nome: string;
    cpf: string;
    endereco: Address;
    foto: Photo;
}