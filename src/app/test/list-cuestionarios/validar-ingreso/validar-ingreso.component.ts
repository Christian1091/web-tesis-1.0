import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-validar-ingreso',
  templateUrl: './validar-ingreso.component.html',
  styleUrls: [
    './validar-ingreso.component.css',
  ]
})
export class ValidarIngresoComponent implements OnInit {

  nombreParticipante = '';

  constructor( private respuestaCuestionarioService: RespuestaCuestionarioService,
               private router: Router ) { }

  ngOnInit(): void {
    if (this.respuestaCuestionarioService.idCuestionario == null ) {
      this.router.navigateByUrl('/');
    }
  }

  siguiente() {
     this.respuestaCuestionarioService.nombreParticipante = this.nombreParticipante;
     this.router.navigateByUrl('/pregunta');
  }

}
