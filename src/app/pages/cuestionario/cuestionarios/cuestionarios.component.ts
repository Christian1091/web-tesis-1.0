import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { Cuestionario } from 'src/app/models/cuestionario.model';
import { Pregunta } from 'src/app/models/pregunta.model';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

import { CuestionarioService } from '../../../services/cuestionario.service';
import { Area } from '../../../models/area.model';


@Component({
  selector: 'app-cuestionarios',
  templateUrl: './cuestionarios.component.html',
  styleUrls: [
    './cuestionarios.component.css'
  ]
})
export class CuestionariosComponent implements OnInit {

  //public url = "http://localhost:4200";
  //public url = "https://ups.tranformaciondigitalgih4pc.tech/";
  public url = "https://transformaciondigitalgihp4c.ups.edu.ec/";
  
    //public url = "https://portalweb-tesis.netlify.app";
  tituloCuestionario: string;
  descripcionCuestionario: string;
  puntajeCuestionario: number;
  listPregunta: Pregunta[] = [];

  public cuestionarios: Cuestionario[] = [];
  public cargando: boolean = true;
  public tipos: string[] = ["GENERAL", "MD4U", "IES"];
  public empresas: string[] = ["Universidad Politécnica Salesiana", "UDA", "SUPERMAXI"];
  public tipo: string = "";
  public tipoPersona: string = "";
  public empresa: string = "";

  public cuestionarioForm = this.fb.group({
    titulo: ['',Validators.required],
    descripcion: ['', Validators.required],
    puntaje: ['', Validators.required]
  })

  public nombreArea: string = "";
  public descripcionArea: string = "";
  public valorArea: number = 0;
  public areas: Area[] = [];

  constructor( private cuestionarioService: CuestionarioService,
               private fb: FormBuilder,
               private router: Router,
               private _clipboardService: ClipboardService) { }

  ngOnInit(): void {
    this.tituloCuestionario = this.cuestionarioService.tituloCuestionario;
    this.descripcionCuestionario = this.cuestionarioService.descripcionCuestionario;
    this.puntajeCuestionario = this.cuestionarioService.puntajecuestionario;

    this.cargarListCuestioanrios();
    this.cargarAreas();
  }

  cargarAreas() {
    this.cuestionarioService.getListAreas().subscribe(({areas}) => {
      this.areas = areas;
    });
  }

  crearArea() {
    if (this.nombreArea.trim().length > 0 && this.valorArea > 0) {
     
      this.cuestionarioService.crearArea(this.nombreArea, this.descripcionArea, this.valorArea).subscribe(response => {
        this.cargarAreas();
        this.nombreArea = "";
        this.descripcionArea = "";
        this.valorArea = 0;
      });
     } else {
     }
  }

  eliminarArea(_id: string, i: number) {
    this.cuestionarioService.eliminarArea(_id).subscribe(response => {
      this.areas.splice(i, 1);
    });
  }

  obtenerTipo(value: string) {
    this.tipo = value;
  }

  obtenerTipoPersona(value: string) {
    this.tipoPersona = value;
  }

  obtenerEmpresa(value: string) {
    this.empresa = value
  }

  /**Creamos las preguntas */
  crearPreguntas() {

    this.cuestionarioService.tituloCuestionario = this.cuestionarioForm.value.titulo;
    this.cuestionarioService.descripcionCuestionario = this.cuestionarioForm.value.descripcion;
    this.cuestionarioService.puntajecuestionario = this.cuestionarioForm.value.puntaje;
    this.cuestionarioService.tipo = this.tipo ?? "General";
    this.cuestionarioService.tipoPersona = this.tipoPersona ?? "Docentes";
    this.cuestionarioService.empresa = this.empresa ?? "UPS";
    this.router.navigateByUrl('/dashboard/preguntas');

  }

  guardarPregunta( pregunta: Pregunta ) {
    this.listPregunta.push(pregunta);
    
  }

  cargarListCuestioanrios() {
    this.cargando = true;
    this.cuestionarioService.getListCuestionarioByIdUser()
                            .subscribe( ({ cuestionarios }) => {
                              this.cuestionarios = cuestionarios;
                              this.cargando = false;
                            })

  }

  eliminarCuestionario( cuestionario: Cuestionario ) {
    
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
    

  }

}
