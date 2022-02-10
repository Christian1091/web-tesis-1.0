import { Pregunta } from './pregunta.model';

export class Cuestionario {

  _id?: string;
  nombre: string;
  descripcion: string;
  puntajeCuestionario: number;
  fechaCreacion?: Date;
  listPreguntas: Pregunta[];
  tipo?: string;
  //activo?: number;

  constructor( id: string, nombre: string, descripcion: string, puntaje: number, fechaCreacion: Date, listPreguntas: Pregunta[], tipo: string) {
    this._id = id
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.puntajeCuestionario = puntaje;
    this.fechaCreacion =fechaCreacion;
    this.listPreguntas = listPreguntas;
    this.tipo = tipo; 
  }

}
