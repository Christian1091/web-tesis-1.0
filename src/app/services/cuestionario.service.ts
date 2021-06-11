import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../src/environments/environment';

import { Cuestionario } from '../models/cuestionario.model';

import { CargarCuestionario } from '../interfaces/cargar-cuestionarios.interface';

import { Observable } from 'rxjs';

// Aqui llamamos al url que creamos en el envairoment
const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class CuestionarioService {

  tituloCuestionario: string;
  descripcionCuestionario: string;

  constructor( private http: HttpClient ) { }

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

  // Este get es para visualizar publicamente
  getListCuestionarios() {
    const url =  `${ base_url }/cuestionarios/list-cuestionarios`;

    return this.http.get<CargarCuestionario>( url, this.headers );
    //return this.http.get<ReqCuestionario>( url, this.headers );
  }

  // Este get es para visualizar los cuestionarios creados por el usuario ya autenticado
  getListCuestionarioByIdUser() {
    const url =  `${ base_url }/cuestionarios`;

    return this.http.get<CargarCuestionario>( url, this.headers );
  }

 /* Este get es para visualizar un cuestionario en especifico dentro del usuario autenticado */
  getVerCuestionario( _id: string ): Observable<any> {
    const url =  `${ base_url }/cuestionarios/ver-cuestionario/${ _id }`;

    return this.http.get( url, this.headers );
  }

  guardarCuestionario( cuestionario: Cuestionario ): Observable<any> {
    const url = `${ base_url }/cuestionarios`;

    return this.http.post( url, cuestionario, this.headers );
  }

  eliminarCuestionario( _id: string) {
    const url =  `${ base_url }/cuestionarios/${ _id }`;

    return this.http.delete( url, this.headers );
  }

}
