export class Respuesta {
  _id?: string; //id puede ser opcional
  descripcion: string;
  respuestas: any;

  constructor( descripcion: string, respuestas: any, id?: string){
    this._id = id;
    this.descripcion = descripcion;
    this.respuestas = respuestas;
  }
}
