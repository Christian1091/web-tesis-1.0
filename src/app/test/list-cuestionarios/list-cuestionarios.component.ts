import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Cuestionario } from 'src/app/models/cuestionario.model';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-list-cuestionarios',
  templateUrl: './list-cuestionarios.component.html',
  styleUrls: [
    './list-cuestionarios.component.css'
  ]
})
export class ListCuestionariosComponent implements OnInit {

  public listCuestionarios: Cuestionario [] = [];

  constructor( private cuestioanrioService: CuestionarioService,
               private respuestaCuestionarioService: RespuestaCuestionarioService,
               private router: Router) { }

  ngOnInit(): void {
    this.getListCuestionarios();
  }

  getListCuestionarios() {
    this.cuestioanrioService.getListCuestionarios()
                              .subscribe(({ cuestionarios }) => {
                                //console.log(cuestionarios);
                                this.listCuestionarios = cuestionarios;
                                console.log(this.listCuestionarios);
                              })
  }

  ingresarNombre( idCuestionario: string ) {
    this.respuestaCuestionarioService.idCuestionario = idCuestionario;
    console.log(idCuestionario);
    this.router.navigateByUrl(`/validarIngreso/${idCuestionario}`);
  }

}
