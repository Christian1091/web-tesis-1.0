import { Pregunta } from './pregunta.model';

export class Cuestionario {

  _id?: string;
  nombre: string;
  descripcion: string;
  fechaCreacion?: Date;
  listPreguntas: Pregunta[];
  //activo?: number;

  constructor( id: string, nombre: string, descripcion: string, fechaCreacion: Date, listPreguntas: Pregunta[] ) {
    this._id = id
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.fechaCreacion =fechaCreacion;
    this.listPreguntas = listPreguntas;
  }

}
