import { Respuesta } from './respuesta.model';

export class Pregunta {
  descripcion: string;
  listRespuesta: Respuesta[];
  hide?: boolean;

  constructor( descripcion: string, respuestas: Respuesta[] ) {
    this.descripcion = descripcion;
    this.listRespuesta = respuestas;
  }
}
