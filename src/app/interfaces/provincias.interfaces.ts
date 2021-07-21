export interface Provincias {
  id: string;
  //nombreProvincia: string;

}

export interface Cantones {
  id: number;
  provinciaId: string;
  nombreCanton: string;
}
