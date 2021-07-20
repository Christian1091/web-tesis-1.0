import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Provincias, Cantones } from '../interfaces/provincias.interfaces';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProvinciasService {

  public provincia: Provincias[];
  public canton: Cantones[];

  constructor( private http: HttpClient ) { }

  getProvincias(): Observable<Provincias[]> {
    return this.http.get<Provincias[]>('./assets/json/provinciasCantones.json');
  }

  getCantones(): Observable<Cantones[]>  {
    return this.http.get<Cantones[]>('./assets/json/cantones.json');
  }

}
