import { Pregunta } from './pregunta.model';

export class respuestaUsuario {

  constructor(
    public _id?: string,
    public nombreParticipante?: string,
    public correoParticipante?: string,
    public institucionParticipante?: string,
    public provinciaParticipante?: string,
    public ciudadParticipante?: string,
    public fechaCreacion?: Date,
    public puntosTotales?: number,
    public cuestionarioId?: string,
    public listRespuestasUsuario?: Pregunta []
  ) { }

}
