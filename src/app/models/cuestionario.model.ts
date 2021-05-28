import { Pregunta } from './pregunta.model';

export class Cuestionario {
  id?: number;
  nombre: string;
  descripcion: string;
  fechaCreacion?: Date;
  listPreguntas: Pregunta[];
  //activo?: number;

  constructor( nombre: string, descripcion: string, fechaCreacion: Date, listPreguntas: Pregunta[] ) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.fechaCreacion =fechaCreacion;
    this.listPreguntas = listPreguntas;
    //this.activo = 1;
  }

}
