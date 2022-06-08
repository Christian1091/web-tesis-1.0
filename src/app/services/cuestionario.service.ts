import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../src/environments/environment';

import { Cuestionario } from '../models/cuestionario.model';

import { CargarCuestionario } from '../interfaces/cargar-cuestionarios.interface';

import { Observable } from 'rxjs';
import { Area } from '../models/area.model';
import { Correo } from '../models/correo.model';

// Aqui llamamos al url que creamos en el envairoment
const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})

export class CuestionarioService {

  tituloCuestionario: string;
  descripcionCuestionario: string;
  puntajecuestionario: number;
  tipo: string;
  tipoPersona: string;
  empresa: string;
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



  guardarUsuarioRespondeTemp(tipo: string, ciudad: string, provincia: string, empresa: string) {
      const usuarioResponde = {
        "tipo": tipo,
        "ciudad": ciudad, 
        "provincia": provincia,
        "empresa": empresa
      };
      localStorage.setItem("usuarioResponse", JSON.stringify(usuarioResponde));
  }

  cargarUsuarioRespondeTemp() {
    return JSON.parse(localStorage.getItem("usuarioResponse"));
  }

  eliminarUsuarioRespondeTemp() {
    localStorage.removeItem("usuarioResponse");
  }
  
  guardarEmpresa(nombre: string, descripcion: string) {
    const url = `${ base_url }/empresa/registrar`;
    return this.http.post(url, {"nombre": nombre, "descripcion": descripcion}, this.headers);
  }

  obtenerEmpresas() {
    const url = `${ base_url }/empresa/empresas`;
    return this.http.get(url, this.headers);
  }

  eliminarEmpresa(nombre: string) {
    const url = `${ base_url }/empresa/${nombre}`;
    return this.http.delete(url, this.headers);
  }

  guardarTipoPersonas(tipo: string, descripcion: string) {
    const url = `${ base_url }/tipo-persona/registrar`;
    return this.http.post(url, {"tipo": tipo, "descripcion": descripcion}, this.headers);
  }

  obtenerTipoPersonas() {
    const url = `${ base_url }/tipo-persona/tipos`;
    return this.http.get(url, this.headers);
  }

  eliminarTipoPersona(tipo: string) {
    const url = `${ base_url }/tipo-persona/${tipo}`;
    return this.http.delete(url, this.headers);
  }

  crearArea(area: string, descripcion: string, valor: number) {
    const url =  `${ base_url }/area/crear`;
    return this.http.post(url, {area, descripcion, valor}, this.headers);

  }
  eliminarArea( _id: string) {
    const url = `${ base_url }/area/eliminar/${ _id }`;
    return this.http.delete( url, this.headers );
  }

  getListAreas() {
		const url = `${base_url}/area/areas`;
		return this.http.get<{ 'ok': boolean, 'areas': Area[] }>(url, this.headers);
	}
  // Este get es para visualizar publicamente
  getListCuestionarios() {
    const url =  `${ base_url }/cuestionarios/list-cuestionarios`;
    return this.http.get<CargarCuestionario>( url, this.headers );
    //return this.http.get<ReqCuestionario>( url, this.headers );
  }

  // Este get es para visualizar los cuestionarios creados por el usuario ya autenticado en los cards
  getListCuestionarioByIdUser() {
    const url =  `${ base_url }/cuestionarios`;
    return this.http.get<CargarCuestionario>( url, this.headers );
  }

  /* servicio para estadistica general por provincia */
  getListEstadisticaGeneralProvinvia(provincia: string) {
    const url = `${base_url}/cuestionarios/list-cuestionarios-provincia/${provincia}`;
    return this.http.get<any>(url);
  }

  /* servicio para estadistica general por provincia */
  getListEstadisticaGeneralGeneral() {
    const url = `${base_url}/cuestionarios/list-cuestionarios-general`;
    return this.http.get<any>(url);
  }

  getListEstadisticaGeneralInstitucion(institucion: string) {
    const url = `${base_url}/cuestionarios/list-cuestionarios-institucion/${institucion}`;
    return this.http.get<any>(url);
  }

  getListEstadisticaGeneralInstitucionTipo(institucion: string, tipo: string) {
    const url = `${base_url}/cuestionarios/list-cuestionarios-institucion-tipo/${institucion}/${tipo}`;
    return this.http.get<any>(url);
  }

 /* Este get es para visualizar el contenido de un cuestionario en especifico dentro del usuario autenticado */
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

  actualizarCuestionario(cuestionario: Cuestionario) {
    const url =  `${ base_url }/cuestionarios/${ cuestionario._id }`;
    return this.http.put(url, cuestionario, this.headers);
  }

  enviarCorreo(correo: Correo) {
    const url =  `${ base_url }/cuestionarios/enviar-correo`;
    return this.http.post(url, correo);
  }

}
