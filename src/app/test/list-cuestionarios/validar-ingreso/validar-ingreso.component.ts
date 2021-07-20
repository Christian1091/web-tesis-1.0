
import { Component, OnInit, Pipe } from '@angular/core';
import { Router } from '@angular/router';

//import { filter } from 'rxjs/operators';

//import 'rxjs/add/operator/filter'

import { Provincias, Cantones } from '../../../interfaces/provincias.interfaces';
import { ProvinciasService } from '../../../services/provincias.service';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-validar-ingreso',
  templateUrl: './validar-ingreso.component.html',
  styleUrls: [
    './validar-ingreso.component.css',
  ],
  providers: [ProvinciasService]
})

export class ValidarIngresoComponent implements OnInit {

  public nombreParticipante = '';
  public correoParticipante = '';
  public institucionParticipante = '';
  public provinciaParticipante = '';
  public ciudadParticipante = '';

  public selectedProvincia: Provincias ={ id: 0, nombreProvincia: '' };
  public provincias: Provincias [] ;
  public cantones: Cantones[];


  constructor( private respuestaCuestionarioService: RespuestaCuestionarioService,
               private router: Router,
               private provinciaService: ProvinciasService ) {}

  ngOnInit(): void {
    if (this.respuestaCuestionarioService.idCuestionario == null ) {
      this.router.navigateByUrl('/');
    }

    this.provinciaService.getProvincias().subscribe( res => {
      this.provincias = res;
    });

  }

  siguiente() {
     this.respuestaCuestionarioService.nombreParticipante = this.nombreParticipante;
     this.respuestaCuestionarioService.correoParticipante = this.correoParticipante;
     this.respuestaCuestionarioService.institucionParticipante = this.institucionParticipante;
     this.respuestaCuestionarioService.provinciaParticipante = this.provinciaParticipante;
     this.respuestaCuestionarioService.ciudadParticipante = this.ciudadParticipante;

     this.router.navigateByUrl('/pregunta');
  }

  onSelect( id: number) {

    this.provinciaService.getCantones().subscribe( (res: Cantones[]) => {
      res.filter(item => item.provinciaId === id);
      this.cantones = res;
      console.log(res)
    })

    // this.cantones.filter((item) => item.provinciaId === id);
    // console.log(this.cantones);

 }

}
