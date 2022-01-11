import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

export interface Pre 
{
  listRespuesta: [],
  tituloPregunta:string,
  puntosObtenidos: number,
  indexRespuestaSeleccionada: [],
  puntajePregunta: number
}

@Component({
  selector: 'app-respuesta-cuestionario',
  templateUrl: './respuesta-cuestionario.component.html',
  styleUrls: [
    './respuesta-cuestionario.component.css'
  ]
})
export class RespuestaCuestionarioComponent implements OnInit {

  public id: string;
  public respuestaCuestionario: any;
  public rutaAnterior = '';

  public nombre: string = "";
  public puntos: string = "";

  public rs = [];

  constructor( private respuestaUsuarioService: RespuestaCuestionarioService,
               private activatedRoute: ActivatedRoute,
               private router: Router ) {
    this.rutaAnterior = this.activatedRoute.snapshot.url[0].path;
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    this.obtenerRespuestaUsuario();
  }

  obtenerRespuestaUsuario() {

    this.rs = [];
    this.respuestaUsuarioService.getRespuestaUsuario(this.id).subscribe( res => {

      const r = res['listRespuestasUsuario'];
      r.forEach(res => {
        let pre: Pre = {
          tituloPregunta: res["tituloPregunta"],
          listRespuesta: res["listRespuesta"] as [],
          indexRespuestaSeleccionada: res["indexRespuestaSeleccionada"],
          puntosObtenidos: res["puntosObtenidos"],
          puntajePregunta: res["puntajePregunta"]
        };
        this.rs.push(pre);
      });
      this.nombre = res["nombreParticipante"];
      this.puntos = res["puntosTotales"].toString();
      this.respuestaCuestionario = res;
      //console.log(this.respuestaCuestionario)
    });
  }

  volver() {

    if ( this.rutaAnterior === 'respuestaUsuarioAdmin') {
      console.log(this.respuestaCuestionario.cuestionarioId)
      this.router.navigateByUrl(`/dashboard/estadisticas/${this.respuestaCuestionario.cuestionarioId}`);
    } else {
      this.router.navigateByUrl('/');

    }
  }

}
