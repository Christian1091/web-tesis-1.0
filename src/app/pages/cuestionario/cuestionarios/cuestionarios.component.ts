import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { Cuestionario } from 'src/app/models/cuestionario.model';
import { Pregunta } from 'src/app/models/pregunta.model';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { CuestionarioService } from '../../../services/cuestionario.service';
import { Area } from '../../../models/area.model';
import { AdminEmpresaComponent } from '../../component/admin-empresa/admin-empresa.component';
import { AdminTipoPersonasComponent } from '../../component/admin-tipo-personas/admin-tipo-personas.component';
import { Subscription } from 'rxjs';


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
  subscriptions: Subscription [] = [];

  public cuestionarios: Cuestionario[] = [];
  public cargando: boolean = true;
  public tipos: string[] = ["GENERAL", "MD4U", "IES"];
  public empresas: string[] = [];
  public dirigidos: string[] = [];
  public tipo: string = "";
  public tipoPersona: string = "";
  public empresa: string = "";

  public cuestionarioForm = this.fb.group({
    titulo: ['', Validators.required],
    descripcion: ['', Validators.required],
    puntaje: ['', Validators.required]
  })

  public nuevaEmpresa = new FormControl("");
  public nuevaTipoCuestionario = new FormControl("");
  public nuevaDirigido = new FormControl("");
  public nombreArea: string = "";
  public descripcionArea: string = "";
  public valorArea: number = 0;
  public areas: Area[] = [];


  constructor(private cuestionarioService: CuestionarioService,
    private fb: FormBuilder,
    private router: Router,
    private _clipboardService: ClipboardService, private dialog: MatDialog) {


    this.cargarEmpresas();
    this.cargarTipoPersonas();

    // cuestionarioService.obtenerEmpresas().subscribe(res => {
    //   const emp: string[] = res['empresas'];
    //   emp.map(e => this.empresas.push(e['nombre']));
    // });

    // cuestionarioService.obtenerTipoPersonas().subscribe(res => {
    //   console.log(res);
    //   const tip: string[] = res['tiposPersonas'];
    //   tip.map(t => this.dirigidos.push(t['tipo']));
    // });

  }

  cargarEmpresas() {
    this.empresas = [];
    const searchObtenerE = this.cuestionarioService.obtenerEmpresas().subscribe(res => {
      const emp: string[] = res['empresas'];
      emp.map(e => this.empresas.push(e['nombre']));
    });
    this.subscriptions.push(searchObtenerE)
  }

  cargarTipoPersonas() {
    this.dirigidos = [];
    const searchObtenerTP = this.cuestionarioService.obtenerTipoPersonas().subscribe(res => {
      const tip: string[] = res['tiposPersonas'];
      tip.map(t => this.dirigidos.push(t['tipo']));
      
    });
    this.subscriptions.push(searchObtenerTP);
  }

  ngOnInit(): void {
    this.tituloCuestionario = this.cuestionarioService.tituloCuestionario;
    this.descripcionCuestionario = this.cuestionarioService.descripcionCuestionario;
    this.puntajeCuestionario = this.cuestionarioService.puntajecuestionario;
    this.cargarListCuestioanrios();
    this.cargarAreas();
  }

  agregarEmpresa() {
    const searchAdminEC = this.dialog.open(AdminEmpresaComponent, {
      width: '800px',
    }).afterClosed().subscribe(res => {
      if (res) {
        this.cargarEmpresas();

      }
    });

    this.subscriptions.push(searchAdminEC);

    return;

    const ne: string = this.nuevaEmpresa.value;
    if (ne.trim().length < 3) {
      this.mostrarAlerta("Error", "El nombre es de la empresa es muy corto", false);
      return;
    }
    if (!this.verificarExiste(ne, this.empresas) && ne.length > 2) {
      const searchGuardarE = this.cuestionarioService.guardarEmpresa(ne, ne).subscribe(res => {
        const ok: boolean = res['ok'];
        if (ok) {
          this.empresas.push(ne);
          this.nuevaEmpresa.setValue("");
        } else {
          this.mostrarAlerta("Error", "Ocurrio un error", false);
        }
      });
      this.subscriptions.push(searchGuardarE);
    }
  }

  verificarExiste(valor: string, arreglo: string[]): boolean {
    arreglo = arreglo.map(e => {
      return e.toLowerCase();
    });
    if (arreglo.indexOf(valor.trim().toLowerCase()) > -1) {
      this.mostrarAlerta("Error", "Ya existe la propiedad", false);
      return true;
    } else {
      this.mostrarAlerta("Correcto", "Propiedad creada", true);
      return false;
    }
  }

  eliminar(i: number, emp: string) {
    const searchEliminarEmpresa = this.cuestionarioService.eliminarEmpresa(emp).subscribe(res => {
      const ok: boolean = res["ok"];
      if (ok) {
        this.mostrarAlerta("Correcto", "Empresa eliminada correctamente", true);
        this.empresas.splice(i, i);
      } else {
        this.mostrarAlerta("Error", "Error al eliminar", false);
      }
    });
    this.subscriptions.push(searchEliminarEmpresa);
  }

  eliminarTipoP(i: number, dirigido: string) {
    const searchEliminarTP = this.cuestionarioService.eliminarTipoPersona(dirigido).subscribe(res => {
      const ok: boolean = res["ok"];
      if (ok) {
        this.mostrarAlerta("Correcto", "Tipo persona eliminada correctamente", true);
        this.dirigidos.splice(i, i);
      } else {
        this.mostrarAlerta("Error", "Error al eliminar", false);
      }
    });
    this.subscriptions.push(searchEliminarTP);
  }

  agregarTipoCue() {
    const ne: string = this.nuevaTipoCuestionario.value;
    if (ne.length < 3) {
      this.mostrarAlerta("Error", "El nombre es del cuestionario es muy corto", false);
      return;
    }
    if (!this.verificarExiste(ne, this.tipos) && ne.length > 2) {
     const searchGuardarTP =  this.cuestionarioService.guardarTipoPersonas(ne, ne).subscribe(res => {
        const ok: boolean = res['ok'];
        if (ok) this.tipos.push(ne);
        this.nuevaDirigido.setValue("");
      });
      this.subscriptions.push(searchGuardarTP);
    }
  }

  agregarDirigido() {
   const searchAdminTPC = this.dialog.open(AdminTipoPersonasComponent, {
      width: '800px',
    }).afterClosed().subscribe(res => {
      if (res) {
        this.cargarTipoPersonas();

      }
    });
    this.subscriptions.push(searchAdminTPC);
    return;
    const ne: string = this.nuevaDirigido.value;
    if (ne.length < 3) {
      this.mostrarAlerta("Error", "El nombre es muy corto", false);
      return;
    }
    if (!this.verificarExiste(ne, this.dirigidos) && ne.length > 3) {
     const searchGuardarTP = this.cuestionarioService.guardarTipoPersonas(ne, ne).subscribe(res => {
        const ok: boolean = res['ok'];
        if (ok) this.dirigidos.push(ne);
        this.nuevaDirigido.setValue("");
      });
      this.subscriptions.push(searchGuardarTP);
    }
  }

  cargarAreas() {
    const searchListAreas = this.cuestionarioService.getListAreas().subscribe(({ areas }) => {
      this.areas = areas;
    });
    this.subscriptions.push(searchListAreas);
  }

  crearArea() {
    if (this.nombreArea.trim().length > 0 && this.valorArea > 0) {

    const searchCrearArea = this.cuestionarioService.crearArea(this.nombreArea, this.descripcionArea, this.valorArea).subscribe(response => {
        this.cargarAreas();
        this.nombreArea = "";
        this.descripcionArea = "";
        this.valorArea = 0;
      });
      this.subscriptions.push(searchCrearArea);
    } else {
    }
  }

  eliminarArea(_id: string, i: number) {
   const searchEliminarArea = this.cuestionarioService.eliminarArea(_id).subscribe(response => {
      this.areas.splice(i, 1);
    });
    this.subscriptions.push(searchEliminarArea);
  }

  obtenerTipo(value: string) {
    this.tipo = value;
  }

  obtenerTipoPersona(value: string) {
    console.log(value);

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

  guardarPregunta(pregunta: Pregunta) {
    this.listPregunta.push(pregunta);

  }

  cargarListCuestioanrios() {
    this.cargando = true;
    this.cuestionarioService.getListCuestionarioByIdUser()
      .subscribe(({ cuestionarios }) => {
        this.cuestionarios = cuestionarios;
        this.cargando = false;
      })

  }

  mostrarAlerta(title: string, body: string, ok: boolean) {
    Swal.fire(
      title,
      body,
      ok ? 'success' : 'error');
  }

  eliminarCuestionario(cuestionario: Cuestionario) {

    Swal.fire({
      title: '¿Eliminar cuestionario?',
      text: `Esta a punto de eliminar a ${cuestionario.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        const searchEliminarC = this.cuestionarioService.eliminarCuestionario(cuestionario._id)
          .subscribe(resp => {
            /**Para refrescar la tabla despues de haber eliminado el usuario */
            this.cargarListCuestioanrios();
            Swal.fire(
              'Cuestionario borrado',
              `${cuestionario.nombre} Fue eliminado exitosamente!`,
              'success');
          });
          this.subscriptions.push(searchEliminarC);
      }
    })
  }
  // copyDynamicText() {
  //   this._clipboardService.copyFromContent(this.title)
  // }

  crearLink(cuestionario: Cuestionario) {
    const idCuestionario = cuestionario._id;

    const link = ` ${this.url}/validarIngreso/${idCuestionario}`;
    this._clipboardService.copyFromContent(link);


  }

  ngOnDestroy() {
    this.subscriptions.forEach(res => {
      res.unsubscribe();
    });
  }
}
