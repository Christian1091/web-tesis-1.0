import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';

import Swal from 'sweetalert2';

import { Pregunta } from '../../../models/pregunta.model';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import { Router } from '@angular/router';
import { Cuestionario } from 'src/app/models/cuestionario.model';

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
  puntajeCuestionario: number;
  tipo: string;
  tipoPersona: string; 
  empresa: string;
  listPreguntas: Pregunta[] = [];

  cuestionarioAux: any;

  constructor( private fb: FormBuilder,
               private cuestionarioService: CuestionarioService,
               private router: Router) { }

  ngOnInit(): void {
    this.tituloCuestionario = this.cuestionarioService.tituloCuestionario;
    this.descripcionCuestionario = this.cuestionarioService.descripcionCuestionario;
    this.puntajeCuestionario = this.cuestionarioService.puntajecuestionario;
    this.tipo = this.cuestionarioService.tipo;
    this.tipoPersona = this.cuestionarioService.tipoPersona;
    this.empresa = this.cuestionarioService.empresa;
  }

  guardarPregunta( pregunta: Pregunta) {
    this.listPreguntas.push(pregunta);
  }

  eliminarPregunta( index: number ) {
    this.listPreguntas.splice( index, 1);
  }

  guardarCuestionario() {
    const cuestionario: Cuestionario = {
      nombre: this.tituloCuestionario,
      descripcion: this.descripcionCuestionario,
      puntajeCuestionario: this.puntajeCuestionario,
      listPreguntas: this.listPreguntas,
      tipo: this.tipo,
      tipoPersona: this.tipoPersona,
      empresa: this.empresa
    };
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Encuesta Guardada',
      showConfirmButton: false,
      timer: 1500
    })
    /**Enviamos el cuestionario al backend */
    this.cuestionarioService.guardarCuestionario(cuestionario).subscribe( res => {
      this.router.navigateByUrl('/dashboard/cuestionarios');
    
      this.cuestionarioAux = res;
      // const idCuestionario =  this.cuestionarioAux.cuestionario._id;
      // const linkCuestionario = '/validarIngreso';
    }, err => {
      Swal.fire('Error', err.error.msg, 'error');
    });
  }

}
