import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { PostForm } from '../interfaces/post.interface';
import { CargarPost } from '../interfaces/cargar-post.interface';
import { Post } from '../models/post.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PostService {

   // Creamos una propiedad para almacenar la informacion del post
   public post: Post;

  constructor( private http: HttpClient) { }

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

  //Creamos un get para el uid del post
  get pid(): string {
      return this.post._id || '';
  }

  // Este get es para visualizar todos los post creados por todos los usuarios
  getListPost() {
    const url =  `${ base_url }/post/listPosts`;

    return this.http.get<CargarPost>( url, this.headers );
  }

  // Este get es para visualizar los posts creados por el usuario ya autenticado en los cards
  getListPostByIdUser() {

    const url =  `${ base_url }/post/userId`;
    return this.http.get<CargarPost>( url, this.headers );
  }

  /* Este get es para visualizar el contenido de un post en especifico dentro del usuario autenticado */
  getVerContenidoPost( _id: string ) {

    const url =  `${ base_url }/post/verPost/${ _id }`;
    return this.http.get( url, this.headers )
                .pipe(
                  map( (resp: {ok: boolean, post: Post }) => resp.post )
                );
  }

  /* Este get es para visualizar el contenido de un post publicamente */
  getPublicoContenidoPost( _id: string ) {

    const url =  `${ base_url }/post/publico/${ _id }`;
    return this.http.get( url, this.headers )
                .pipe(
                  map( (resp: {ok: boolean, post: Post }) => resp.post )
                );
  }

  crearPost( post: { titulo: string, descripcion: string, texto: string }) {
    //console.log('creando post');
    return this.http.post(`${ base_url }/post`, post, this.headers);

  }

  actulizarPost( post: Post ) {
    const url = `${ base_url }/post/${ post._id }`;
    return this.http.put( url, post, this.headers); // Ahora necesito los headers
 }

  eliminarPost( _id: string) {
    const url =  `${ base_url }/post/${ _id }`;
    return this.http.delete( url, this.headers );
  }

}
