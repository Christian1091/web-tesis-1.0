export class Respuesta {
  id?: number; //id puede ser opcional
  descripcion: string;
  esCorrecta: boolean;

  constructor( descripcion: string, esCorrecta: boolean, id?: number){
    this.id = id;
    this.descripcion = descripcion;
    this.esCorrecta = esCorrecta;
  }
}
