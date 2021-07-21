
import { Component, OnInit, Pipe } from '@angular/core';
import { Router } from '@angular/router';

import { Provincias, Cantones } from '../../../interfaces/provincias.interfaces';
import { ProvinciasService } from '../../../services/provincias.service';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

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

  //public selectedProvincia: Provincias ={ id: 0, nombreProvincia: '' };
  public provincias: Provincias[] ;
  public cantones: Cantones[];

  public nombrePro: any;

  constructor( private respuestaCuestionarioService: RespuestaCuestionarioService,
               private router: Router,
               private provinciaService: ProvinciasService ) {}

  ngOnInit(): void {
    if (this.respuestaCuestionarioService.idCuestionario == null ) {
      this.router.navigateByUrl('/');
    }

    //this.provincias = this.provinciaService.getProvincias();
    this.provinciaService.getProvincias().subscribe( (res: any) => {
      this.provincias = res;
      //console.log(res);
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

  onSelect( id ) {
    //console.log(this.provinciaService.getCantones());
    this.cantones = this.provinciaService.getCantones(id).filter( item => item.provinciaId == id );
    //console.log(this.cantones);
  }

}
