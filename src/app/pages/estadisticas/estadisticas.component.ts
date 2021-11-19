import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class EstadisticasComponent implements OnInit, OnDestroy {

  public id: string;
  public listRespuestasUsuario: any[] = [];
  public respuestaCuestionario: Subscription = new Subscription();
  public obtenerPuntosCuestionario: Cuestionario[];
  public puntosTotalCuestionarios = 0;

  constructor(private activatedRoute: ActivatedRoute,
    private respuestaCuestionarioService: RespuestaCuestionarioService,
    private cuestionarioService: CuestionarioService) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    this.getRespuestaByIdCuestionario();
    this.obtenerPuntajeCuestionario();
  }

  ngOnDestroy(): void {
    this.respuestaCuestionario.unsubscribe();
  }

  getRespuestaByIdCuestionario() {
    //console.log("id: " + this.id);

    this.respuestaCuestionario = this.respuestaCuestionarioService.getRespuestaByIdCuestionario(this.id)
      .subscribe((res: any) => {
        //console.log(res);
        //console.log('************************************');
        //Vaciamos para que no hay duplicidad de datos
        this.listRespuestasUsuario = [];
        //Iteramos lo que tenemos dentro de res
        res.forEach((element: any) => {
          //console.log(element.nombreParticipante)
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
        console.log(this.listRespuestasUsuario);

      }, error => {
        console.log(error);
      });
  }

  verPuntosRespuestaUsuario() {

    for (let i = 0; i < this.listRespuestasUsuario.length; i++) {
      const puntosTotales = this.listRespuestasUsuario[i].puntosTotales;
      this.puntosTotalCuestionarios = Number(this.puntosTotalCuestionarios) + Number(puntosTotales);
    }
    console.log(this.puntosTotalCuestionarios)
  }

  eliminarRespuestaUsuario(id: string) {
    //console.log();
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
        //console.log("Puntos: ");
        //console.log(res);
      });

  }

  /**Sacar puntos por preguntas */
  verRespuestaCuestionario() {
    for (let i = 0; i < this.listRespuestasUsuario.length; i++) {
      //for( let j= 0; j < this.listRespuestasUsuario[i].listRespuestaUsuario.length; j++){
      //const cuestionarios =  this.listRespuestasUsuario[i].listRespuestaUsuario[j].tituloPregunta;
      const cuestionarios = this.listRespuestasUsuario[i].listRespuestaUsuario[0].tituloPregunta;
      const puntos = this.listRespuestasUsuario[i].listRespuestaUsuario[0].puntosObtenidos;
      console.log(cuestionarios);
      console.log(puntos);
    }
    //}
  }

}
