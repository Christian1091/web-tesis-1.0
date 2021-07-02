import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { respuestaUsuario } from 'src/app/models/respuestaUsuario.model';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';
import Swal from 'sweetalert2';

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

  constructor( private activatedRoute: ActivatedRoute,
               private respuestaCuestionarioService: RespuestaCuestionarioService ) {
                this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
             }

  ngOnInit(): void {
    this.getRespuestaByIdCuestionario();
  }

  ngOnDestroy(): void {
    this.respuestaCuestionario.unsubscribe();
  }

  getRespuestaByIdCuestionario() {

    this.respuestaCuestionario = this.respuestaCuestionarioService.getRespuestaByIdCuestionario( this.id )
        .subscribe( (res: any) => {
          //console.log(res);
          //console.log('************************************');
          //Vaciamos para que no hay duplicidad de datos
          this.listRespuestasUsuario = [];
          //Iteramos lo que tenemos dentro de res
          res.forEach(( element: any ) => {
            //console.log(element.nombreParticipante)
              this.listRespuestasUsuario.push({
                id: element._id,
                nombreParticipante: element.nombreParticipante,
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

  eliminarRespuestaUsuario( id: string) {
    //console.log();
    Swal.fire({
      title: '¿Eliminar post?',
      text: `Esta a punto de eliminar a`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.respuestaCuestionarioService.borrarRespuestaUsuario( id )
            .subscribe( resp => {
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

}
