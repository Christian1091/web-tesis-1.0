import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Pregunta } from 'src/app/models/pregunta.model';
import { Respuesta } from 'src/app/models/respuesta.model';

import { CuestionarioService } from 'src/app/services/cuestionario.service';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: [
    './pregunta.component.css',
  ]
})
export class PreguntaComponent implements OnInit {

  idCuestionario: string;
  listPreguntas: Pregunta [] = [];
  listRespuesta: Respuesta [] = [];
  rtaConfirmada = false;
  opcionSeleccionada: any;
  index = 0;

  constructor( private respuestaCuestionarioService: RespuestaCuestionarioService,
               private cuestionarioService: CuestionarioService,
               private router: Router ) { }

  ngOnInit(): void {

    this.idCuestionario = this.respuestaCuestionarioService.idCuestionario;
    if (this.idCuestionario == null ){
      this.router.navigateByUrl('/');
      return;
    }

    this.getCuestionario();

    //console.log(this.respuestaCuestionarioService.idCuestionario);
  }

  getCuestionario() {
    this.cuestionarioService.getVerCuestionario(this.idCuestionario)
                            .subscribe( res  => {
                              //console.log(res.cuestionarios[0].listPreguntas);
                              this.listPreguntas = res.cuestionarios[0].listPreguntas;
                              //this.listRespuesta = this.listPreguntas[1].listRespuesta;
                              console.log(this.listRespuesta);
                            });
  }

  obtenerPregunta(): string {
    return this.listPreguntas[this.index]?.descripcion;
  }

  getIndex(): number {
    return this.index;
  }

  respuestaSeleccionada( respuesta: any ) {
    this.opcionSeleccionada = respuesta;
    this.rtaConfirmada = true;
  }

  AddClassOption( respuesta: any ): string {
    if ( respuesta === this.opcionSeleccionada ) {
      return 'active text-light';
    }
  }

  siguiente() {
    this.rtaConfirmada = false;
    this.index ++;

    if ( this.index === this.listPreguntas.length ) {
      this.router.navigateByUrl('/respuestaCuestionario');
   }
  }

}
