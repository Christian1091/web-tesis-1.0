import { Pregunta } from './pregunta.model';

export class Cuestionario {

  _id?: string;
  nombre: string;
  descripcion: string;
  fechaCreacion?: Date;
  listPreguntas: Pregunta[];
  //activo?: number;

  constructor( _id: string, nombre: string, descripcion: string, fechaCreacion: Date, listPreguntas: Pregunta[] ) {
    this._id = _id
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.fechaCreacion =fechaCreacion;
    this.listPreguntas = listPreguntas;
    //this.activo = 1;
  }

}
