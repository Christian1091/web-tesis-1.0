import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { PostForm } from '../interfaces/post.interface';
import { CargarPost } from '../interfaces/cargar-post.interface';
import { Post } from '../models/post.model';

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

    //Creamos un get para el uid del usuario
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

  crearPost( formData: PostForm) {
    console.log('creando post');
    return this.http.post(`${ base_url }/post`, formData, this.headers);

  }

  actulizarPost( data: { titulo: string, descripcion: string, texto: string }) {
   return this.http.put(`${ base_url }/post/${ this.pid }`, data, this.headers); // Ahora necesito los headers
 }

  eliminarPost( _id: string) {
    const url =  `${ base_url }/post/${ _id }`;
    return this.http.delete( url, this.headers );
  }
}
