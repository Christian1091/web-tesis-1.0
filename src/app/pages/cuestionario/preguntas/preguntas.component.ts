import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';

import { Pregunta } from '../../../models/pregunta.model';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: [
    './preguntas.component.css'
  ]
})
export class PreguntasComponent implements OnInit {

  tituloCuestionario: string;
  descripcionCuestionario: string;

  listPreguntas: Pregunta[] =[];

  constructor( private fb: FormBuilder,
               private cuestionarioService: CuestionarioService,
               private router: Router) { }

  ngOnInit(): void {
    this.tituloCuestionario = this.cuestionarioService.tituloCuestionario;
    this.descripcionCuestionario = this.cuestionarioService.descripcionCuestionario;
  }

  guardarPregunta( pregunta: Pregunta) {
    this.listPreguntas.push(pregunta);
    console.log(this.listPreguntas);
  }

}
