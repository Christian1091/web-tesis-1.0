import { Component,  ElementRef, AfterViewInit, ViewChild,
  ViewChildren, QueryList, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Cuestionario } from 'src/app/models/cuestionario.model';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';


@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: [
    './estadisticas.component.css'
  ]
})
export class EstadisticasComponent implements OnInit, AfterViewInit, OnDestroy {

  public id: string;
  public listRespuestasUsuario: any[] = [];
  public respuestaCuestionario: Subscription = new Subscription();
  public obtenerPuntosCuestionario: Cuestionario[];
  public puntosTotalCuestionarios = 0;
  public totalRespuestas: number = 0;

  title = "Animated Count";

  nums: Array<number> = [25, 76, 48];

  @ViewChild("oneItem") oneItem: any;
  @ViewChildren("count") count: QueryList<any>;

  constructor(
    private elRef: ElementRef,
    private activatedRoute: ActivatedRoute,
    private respuestaCuestionarioService: RespuestaCuestionarioService,
    private cuestionarioService: CuestionarioService) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    this.getRespuestaByIdCuestionario();
    this.obtenerPuntajeCuestionario();
  }

  ngAfterViewInit() {
    this.animateCount();
  }

  animateCount() {
    let _this = this;

     let single = this.oneItem.nativeElement.innerHTML;
    
    //let single = this.totalRespuestas;

    this.counterFunc(single, this.oneItem, 7000);

    this.count.forEach(item => {
      _this.counterFunc(item.nativeElement.innerHTML, item, 2000);
    });
  }

  counterFunc(end: number, element: any, duration: number) {
    let range, current: number, step, timer;

    range = end - 0;
    current = 0;
    step = Math.abs(Math.floor(duration / range));

    timer = setInterval(() => {
      current += 1;
      element.nativeElement.textContent = current;
      if (current == end) {
        clearInterval(timer);
      }
    }, step);
  }

  ngOnDestroy(): void {
    this.respuestaCuestionario.unsubscribe();
  }

  getRespuestaByIdCuestionario() {

    this.respuestaCuestionario = this.respuestaCuestionarioService.getRespuestaByIdCuestionario(this.id)
      .subscribe((res: any) => {
        //Vaciamos para que no hay duplicidad de datos
        this.listRespuestasUsuario = [];
        //Iteramos lo que tenemos dentro de res
        
        this.totalRespuestas = res.length;
        res.forEach((element: any) => {
          this.listRespuestasUsuario.push({
            id: element._id,
            nombreParticipante: element.nombreParticipante,
            correoParticipante: element.correoParticipante,
            institucionParticipante: element.institucionParticipante,
            provinciaParticipante: element.provinciaParticipante,
            ciudadParticipante: element.ciudadParticipante,
            fechaCreacion: element.fechaCreacion,
            puntosTotales: element.puntosTotales,
            listRespuestaUsuario: element.listRespuestasUsuario
          })
        });
      }, error => {
      });
  }

  verPuntosRespuestaUsuario() {

    for (let i = 0; i < this.listRespuestasUsuario.length; i++) {
      const puntosTotales = this.listRespuestasUsuario[i].puntosTotales;
      this.puntosTotalCuestionarios = Number(this.puntosTotalCuestionarios) + Number(puntosTotales);
    }
  }

  eliminarRespuestaUsuario(id: string) {

    Swal.fire({
      title: '¿Eliminar post?',
      text: `Esta a punto de eliminar a`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.respuestaCuestionarioService.borrarRespuestaUsuario(id)
          .subscribe(resp => {
            this.getRespuestaByIdCuestionario();
            /**Para refrescar la tabla despues de haber eliminado el usuario */
            //this.cargarListPostByIdUser();
            Swal.fire(
              'Cuestionario borrado',
              `Fue eliminado exitosamente!`,
              'success');
          });
      }
    })
  }

  obtenerPuntajeCuestionario() {
    this.cuestionarioService.getVerCuestionario(this.id)
      .subscribe(res => {
        this.obtenerPuntosCuestionario = res;
      });

  }

  /**Sacar puntos por preguntas */
  verRespuestaCuestionario() {
    for (let i = 0; i < this.listRespuestasUsuario.length; i++) {
      //for( let j= 0; j < this.listRespuestasUsuario[i].listRespuestaUsuario.length; j++){
      //const cuestionarios =  this.listRespuestasUsuario[i].listRespuestaUsuario[j].tituloPregunta;
      const cuestionarios = this.listRespuestasUsuario[i].listRespuestaUsuario[0].tituloPregunta;
      const puntos = this.listRespuestasUsuario[i].listRespuestaUsuario[0].puntosObtenidos;
    }
    //}
  }
  

}
