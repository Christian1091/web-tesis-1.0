export class Respuesta {
  //id?: string; //id puede ser opcional
  descripcion: string;
  puntosRespuesta: number;
  texto: boolean;
  tipoRespuesta: boolean;

  constructor( descripcion: string, puntosRespuesta:number, texto: boolean, tipoRespuesta: boolean){
    //this.id = id;
    this.descripcion = descripcion;
    this.puntosRespuesta = puntosRespuesta;
    this.texto = texto;
    this.tipoRespuesta = tipoRespuesta;
  }
}
