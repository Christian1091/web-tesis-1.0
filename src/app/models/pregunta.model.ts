import { Respuesta } from './respuesta.model';

export class Pregunta {
  descripcion: string;
  puntajePregunta: number;
  listRespuesta: Respuesta[];
  hide?: boolean;
  otraRespuesta: boolean;

  constructor( descripcion: string, puntaje: number, respuestas: Respuesta[], otraRespuesta:boolean ) {
    this.descripcion = descripcion;
    this.puntajePregunta = puntaje;
    this.listRespuesta = respuestas;
    this.hide = true; //Cuando se crea una pregunta estamos setiando el hide como true
    this.otraRespuesta = otraRespuesta;
  }
}
