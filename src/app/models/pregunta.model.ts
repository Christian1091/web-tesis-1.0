import { Respuesta } from './respuesta.model';

export class Pregunta {
	_id?: number;
	descripcion: string;
	puntajePregunta: number;
	listRespuesta: Respuesta[];
	hide?: boolean;
	otraRespuesta: boolean;
	area?: string;
	valorArea?: number;

	constructor(descripcion: string, puntaje: number, respuestas: Respuesta[], otraRespuesta: boolean, area: string, valorArea: number) {
		this.descripcion = descripcion;
		this.puntajePregunta = puntaje;
		this.listRespuesta = respuestas;
		this.hide = true; //Cuando se crea una pregunta estamos setiando el hide como true
		this.otraRespuesta = otraRespuesta;
		this.area = area;
		this.valorArea = valorArea;
	}
}
