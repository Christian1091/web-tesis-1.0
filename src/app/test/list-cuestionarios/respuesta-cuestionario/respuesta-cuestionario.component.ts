import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

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
    this.respuestaUsuarioService.getRespuestaUsuario(this.id).subscribe( res => {
      //console.log(res);
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
