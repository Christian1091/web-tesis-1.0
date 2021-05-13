import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { Pregunta } from 'src/app/models/pregunta.model';

import { CuestionarioService } from '../../../services/cuestionario.service';

@Component({
  selector: 'app-cuestionarios',
  templateUrl: './cuestionarios.component.html',
  styles: [
  ]
})
export class CuestionariosComponent implements OnInit {

  tituloCuestionario: string;
  descripcionCuestionario: string;
  listPregunta: Pregunta[] = [];

  public cuestionarioForm = this.fb.group({
    titulo: ['',Validators.required],
    descripcion: ['', Validators.required]
  })

  constructor( private cuestionarioService: CuestionarioService,
               private fb: FormBuilder,
               private router: Router) { }

  ngOnInit(): void {
    this.tituloCuestionario = this.cuestionarioService.tituloCuestionario;
    this.descripcionCuestionario = this.cuestionarioService.descripcionCuestionario;

  }

  crearPreguntas() {

    this.cuestionarioService.tituloCuestionario = this.cuestionarioForm.value.titulo;
    this.cuestionarioService.descripcionCuestionario = this.cuestionarioForm.value.descripcion;

    console.log("Nos vamos a las preguntas");
    this.router.navigateByUrl('/dashboard/preguntas');
  }

  guardarPregunta( pregunta: Pregunta ) {
    this.listPregunta.push(pregunta);
    console.log(this.listPregunta);
  }

}
