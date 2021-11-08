import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { Cuestionario } from 'src/app/models/cuestionario.model';
import { Pregunta } from 'src/app/models/pregunta.model';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

import { CuestionarioService } from '../../../services/cuestionario.service';


@Component({
  selector: 'app-cuestionarios',
  templateUrl: './cuestionarios.component.html',
  styleUrls: [
    './cuestionarios.component.css'
  ]
})
export class CuestionariosComponent implements OnInit {

  public url = "http://localhost:4200";
  //public url = "https://portalweb-tesis.netlify.app";
  tituloCuestionario: string;
  descripcionCuestionario: string;
  puntajeCuestionario: number;
  listPregunta: Pregunta[] = [];

  public cuestionarios: Cuestionario[] = [];
  public cargando: boolean = true;

  public cuestionarioForm = this.fb.group({
    titulo: ['',Validators.required],
    descripcion: ['', Validators.required],
    puntaje: ['', Validators.required]
  })

  constructor( private cuestionarioService: CuestionarioService,
               private fb: FormBuilder,
               private router: Router,
               private _clipboardService: ClipboardService) { }

  ngOnInit(): void {
    this.tituloCuestionario = this.cuestionarioService.tituloCuestionario;
    this.descripcionCuestionario = this.cuestionarioService.descripcionCuestionario;
    this.puntajeCuestionario = this.cuestionarioService.puntajecuestionario;

    this.cargarListCuestioanrios();

  }

  /**Creamos las preguntas */
  crearPreguntas() {

    this.cuestionarioService.tituloCuestionario = this.cuestionarioForm.value.titulo;
    this.cuestionarioService.descripcionCuestionario = this.cuestionarioForm.value.descripcion;
    this.cuestionarioService.puntajecuestionario = this.cuestionarioForm.value.puntaje;

    //console.log("Nos vamos a las preguntas");
    this.router.navigateByUrl('/dashboard/preguntas');

  }

  guardarPregunta( pregunta: Pregunta ) {
    this.listPregunta.push(pregunta);
    //console.log(this.listPregunta);
  }

  cargarListCuestioanrios() {
    this.cargando = true;
    this.cuestionarioService.getListCuestionarioByIdUser()
                            .subscribe( ({ cuestionarios }) => {
                              this.cuestionarios = cuestionarios;
                              //console.log(cuestionarios)
                              this.cargando = false;
                            })

  }

  eliminarCuestionario( cuestionario: Cuestionario ) {
    //console.log(cuestionario)
    Swal.fire({
      title: '¿Eliminar cuestionario?',
      text: `Esta a punto de eliminar a ${ cuestionario.nombre }`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cuestionarioService.eliminarCuestionario( cuestionario._id )
            .subscribe( resp => {
              /**Para refrescar la tabla despues de haber eliminado el usuario */
              this.cargarListCuestioanrios();
              Swal.fire(
              'Cuestionario borrado',
              `${ cuestionario.nombre } Fue eliminado exitosamente!`,
              'success');
            });
          }
    })
  }
  // copyDynamicText() {
  //   this._clipboardService.copyFromContent(this.title)
  // }

  crearLink( cuestionario: Cuestionario) {
    const idCuestionario = cuestionario._id;

    const link =` ${this.url}/validarIngreso/${idCuestionario}`;
    this._clipboardService.copyFromContent(link);
    //console.log(link);

  }

}
