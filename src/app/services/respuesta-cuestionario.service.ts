import { Injectable } from '@angular/core';

import { Cuestionario } from "../models/cuestionario.model";

@Injectable({
  providedIn: 'root'
})
export class RespuestaCuestionarioService {

  nombreParticipante: string;
  idCuestionario: string;
  respuestas: number[] = [];
  cuestionario: Cuestionario;

  constructor() { }
}
