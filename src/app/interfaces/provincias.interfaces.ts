export interface Provincias {
  id: number;
  nombreProvincia: string;

}

export interface Cantones {
  id: number;
  provinciaId: number;
  nombreCanton: string;
}
