import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

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

  private transformarUsuarios( resultados: any[]): Usuario[] {
    return resultados.map(
      user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
    );
  }

  /**Metodo para buscar en todo o globalmente */
  busquedaGlobal( termino: string ) {
    const url = `${ base_url }/todo/${ termino }`;

    // El CargarUsuario lo importamos del interface ya que ahi creamos
    return this.http.get(url, this.headers);
  }

  buscar( tipo: 'usuarios', termino: string ) {

    const url = `${ base_url }/todo/coleccion/${ tipo }/${ termino }`;

    // El CargarUsuario lo importamos del interface ya que ahi creamos
    return this.http.get<any[]>(url, this.headers)
            .pipe(
              map( ( resp: any ) => {

                switch ( tipo ) {
                  case 'usuarios':
                    return this.transformarUsuarios( resp.resultados )

                  default:
                    return [];
                }
              } )
            );
  }
}
