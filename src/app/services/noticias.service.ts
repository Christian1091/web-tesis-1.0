import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Noticia } from '../models/noticia.model';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  public noticia: Noticia;


  constructor() { }

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


}
