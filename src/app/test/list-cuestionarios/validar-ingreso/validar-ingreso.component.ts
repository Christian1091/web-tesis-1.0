
import { Component, OnInit, Pipe } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Provincias, Cantones } from '../../../interfaces/provincias.interfaces';
import { ProvinciasService } from '../../../services/provincias.service';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';
import { Validators, FormControl } from '@angular/forms';
import { CuestionarioService } from '../../../services/cuestionario.service';

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

  //public nombrePro: any;

  public id: string;
  public  ok: boolean = false; 
  public email = new FormControl('',[Validators.required, Validators.email]); 

  constructor( private respuestaCuestionarioService: RespuestaCuestionarioService,
                private cuestionarioService: CuestionarioService,
               private activatedRoute: ActivatedRoute,
               private router: Router,
               private provinciaService: ProvinciasService ) {
                this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
                console.log(this.id);
               }
               activar ()
               {
                 this.ok = !this.ok; 
               }

  ngOnInit(): void {
    // if (this.respuestaCuestionarioService.idCuestionario === undefined ) {
    //   this.router.navigateByUrl('/');
    // }
    this.cuestionarioService.getVerCuestionario(this.id).subscribe(response => {
      
      this.institucionParticipante =response.cuestionarios[0].empresa ?? "UPS"
    })
    //this.provincias = this.provinciaService.getProvincias();
    this.provinciaService.getProvincias().subscribe( (res: any) => {
      this.provincias = res;
    });


  }

  siguiente() {
     this.respuestaCuestionarioService.nombreParticipante = this.nombreParticipante;
     this.respuestaCuestionarioService.correoParticipante = this.email.value;
     this.respuestaCuestionarioService.institucionParticipante = this.institucionParticipante;
     this.respuestaCuestionarioService.provinciaParticipante = this.provinciaParticipante;
     this.respuestaCuestionarioService.ciudadParticipante = this.ciudadParticipante;
      console.log(this.provinciaParticipante);
      console.log(this.ciudadParticipante);
      
     this.router.navigateByUrl(`/pregunta/${this.id}`);
  }

  onSelect( id ) {
    this.cantones = this.provinciaService.getCantones(id).filter( item => item.provinciaId == id );
    this.ciudadParticipante = this.cantones[0].nombreCanton;
    this.ok = false;
  }

  getCuidad(value) {
    console.log(value);
    this.ciudadParticipante = value;
    this.ok = true;
  }
  getProvincia(value) {
    console.log(value);
    this.provinciaParticipante = value;
  }

}
