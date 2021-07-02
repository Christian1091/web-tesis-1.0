import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cuestionario } from 'src/app/models/cuestionario.model';

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

  cuestionario!: Cuestionario;

  idCuestionario: string;
  listPreguntas: Pregunta [] = [];
  listRespuesta: Respuesta [] = [];
  rtaConfirmada = false;
  indexPregunta = 0;

  // Respuesta Usuario
  opcionSeleccionada: any;
  indexSeleccionado: any;
  puntosTotales = 0;
  listRespuestaUsuario: any [] = [];
  nombreParticipante = '';

  constructor( private respuestaCuestionarioService: RespuestaCuestionarioService,
               private cuestionarioService: CuestionarioService,
               private router: Router ) { }

  ngOnInit(): void {

    this.cuestionario = this.respuestaCuestionarioService.cuestionario;
    this.nombreParticipante = this.respuestaCuestionarioService.nombreParticipante;

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
    return this.listPreguntas[this.indexPregunta]?.descripcion;
  }

  getIndex(): number {
    return this.indexPregunta;
  }

  respuestaSeleccionada( respuesta: any, index: number ) {
    this.opcionSeleccionada = respuesta;
    this.rtaConfirmada = true;

    this.indexSeleccionado = index;
  }

  AddClassOption( respuesta: any ): string {
    if ( respuesta === this.opcionSeleccionada ) {
      return 'active text-light';
    }
  }

  siguiente() {
    this.agregarRespuesta();
  }

  agregarRespuesta() {

    // Creamos un objeto respuesta y lo agregamos al array
    const respuestaUsuario: any = {
      tituloPregunta: this.listPreguntas[this.indexPregunta].descripcion,
      puntosObtenidos: '',
      indexRespuestaSeleccionada: this.obtenemosIndexSeleccionado(),
      // Hacemos una copia del listado respuestas
      listRespuesta: this.listPreguntas[this.indexPregunta].listRespuesta,
    }

    this.listRespuestaUsuario.push(respuestaUsuario);

    this.opcionSeleccionada = undefined;
    this.indexSeleccionado = undefined;

    // const respuestaUsuario: any = {
    //   titulo: this.listPreguntas[this.indexPregunta].descripcion
    // }
    this.rtaConfirmada = false;
    this.indexPregunta ++;

    if ( this.indexPregunta === this.listPreguntas.length ) {
      // Guardamos las respuestas en mongo
      // Creamos un nuevo objeto para almacenar en la BD
      this.guardamosRespuestaCuestionario();
      // Redireccionamos al proximo componente
      //console.log(this.listRespuestaUsuario);

   }

  }

  obtenemosIndexSeleccionado(): any {
    if( this.opcionSeleccionada === undefined ) {
      return '';
    } else {
      return this.indexSeleccionado;
    }
  }

  guardamosRespuestaCuestionario() {
    const respuestaCuestionario: any = {
      idCuestionario: this.idCuestionario,
      nombreParticipante: this.nombreParticipante,
      fecha: new Date(),
      puntosTotales: this.puntosTotales,
      listRespuestaUsuario: this.listRespuestaUsuario
    }
    //console.log(respuestaCuestionario);
    // Almacenamos la respuesta en mongoDB
    this.respuestaCuestionarioService.guardarRespuestaUsuario( respuestaCuestionario ).subscribe( res => {
      //console.log(res);
      //console.log(res.respuestaCuestionario._id);
      this.router.navigateByUrl(`/respuestaCuestionario/${ res.respuestaCuestionario._id }`);
    }, err => {
      //Swal.fire('Error', err.error.msg, 'error');
      console.log(err);
      this.router.navigateByUrl('/');
    });
  }

}
