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

  getListCuestionarioByIdUser() {
    const url =  `${ base_url }/cuestionarios`;

    return this.http.get<CargarCuestionario>( url, this.headers );
  }

  guardarCuestionario( cuestionario: Cuestionario ): Observable<any> {
    const url = `${ base_url }/cuestionarios`;

    return this.http.post( url, cuestionario, this.headers );
  }

  eliminarCuestionario( _id: string) {
    const url =  `${ base_url }/cuestionarios/${ _id }`;

    return this.http.delete( url, this.headers );
  }

  getVerCuestionario( _id: string ): Observable<any> {
    const url =  `${ base_url }/cuestionarios/ver-cuestionario/${ _id }`;

    return this.http.get( url, this.headers );
  }


}
