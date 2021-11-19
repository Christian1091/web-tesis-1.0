export interface DatosCuestionario {
    listRespuestasUsuario: ListRespuestasUsuario[];
    _id: string;
    nombreParticipante: string;
    correoParticipante: string;
    institucionParticipante: string;
    provinciaParticipante: string;
    ciudadParticipante: string;
    fechaCreacion: Date;
    puntosTotales: number;
    cuestionarioId: string;
    _v: number;

}

export interface ListRespuestasUsuario{
    tituloPregunta: string;
    puntajePregunta: string;
    indexRespuestaSeleccionada:number;
    puntosObtenidos: string;
    listRespuesta: ListRespuesta[];

}

export interface ListRespuesta{
    descripcion: string;
    puntosRespuesta: string;
}