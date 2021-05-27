export class Respuesta {
  id?: number; //id puede ser opcional
  descripcion: string;
  respuestas: any;

  constructor( descripcion: string, respuestas: any, id?: number){
    this.id = id;
    this.descripcion = descripcion;
    this.respuestas = respuestas;
  }
}
