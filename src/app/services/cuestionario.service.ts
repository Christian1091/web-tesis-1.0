import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../src/environments/environment';

import { Cuestionario } from '../models/cuestionario.model';
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

  guardarCuestionario( cuestionario: Cuestionario ): Observable<any> {
    const url = `${ base_url }/cuestionarios`;

    return this.http.post( url, cuestionario, this.headers );
  }

}
