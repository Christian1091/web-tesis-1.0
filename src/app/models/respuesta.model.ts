export class Respuesta {
  //id?: string; //id puede ser opcional
  descripcion: string;
  puntosRespuesta: number;
  //tipoRespuesta: any;

  constructor( descripcion: string, puntosRespuesta:number ){
    //this.id = id;
    this.descripcion = descripcion;
    this.puntosRespuesta = puntosRespuesta;
    //this.tipoRespuesta = tipoRespuesta;
  }
}
