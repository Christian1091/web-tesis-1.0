import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Cuestionario } from "../models/cuestionario.model";
import { respuestaUsuario } from "../models/respuestaUsuario.model";
import { respuestaByIdCuestionario } from "../models/respuestaByIdCuestionario";

// Aqui llamamos al url que creamos en el envairoment
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class RespuestaCuestionarioService {

  public idCuestionario: string;
  //respuestas: number[] = [];
  public cuestionario!: Cuestionario;

  public nombreParticipante: string;
  public correoParticipante: string;
  public institucionParticipante: string;
  public provinciaParticipante: string;
  public ciudadParticipante: string;

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
       // Ahora necesito los headers
       headers: {
        'x-token': this.token
      }
    }
  }

  constructor( private http: HttpClient ) { }

  guardarRespuestaUsuario( respuestaUsuario: any ): Observable<any> {
    const url = `${ base_url }/respuestaCuestionarios`;
    //console.log('probando' + respuestaUsuario);
    return this.http.post( url, respuestaUsuario, this.headers );
  }

  getRespuestaUsuario( _id: string ) {

    const url =  `${ base_url }/respuestaCuestionarios/${ _id }`;
    return this.http.get( url, this.headers )
                .pipe(
                  map( (resp: {ok: boolean, respuestaUsuario: respuestaUsuario }) => resp.respuestaUsuario )
                );
  }

  // Este get es para visualizar los posts creados por el usuario ya autenticado en los cards
  getRespuestaByIdCuestionario( _id: string ) {

    const url =  `${ base_url }/respuestaCuestionarios/estadisticas/${ _id }`;
    //console.log('hoooola' + url);
    return this.http.get( url, this.headers )
                .pipe(
                  map( (resp: {ok: boolean, respuestaByIdCuestionario: respuestaByIdCuestionario }) => resp.respuestaByIdCuestionario )
                );
  }

  borrarRespuestaUsuario( _id: string ) {
    const url =  `${ base_url }/respuestaCuestionarios/${ _id }`;
    return this.http.delete( url, this.headers );
  }

}
