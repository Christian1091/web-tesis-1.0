import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cuestionario } from '../models/cuestionario.model';
import { CuestionarioService } from '../services/cuestionario.service';
import { RespuestaCuestionarioService } from '../services/respuesta-cuestionario.service';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  public id: string;
  public listCuestionarios: Cuestionario [] = [];

  constructor( private cuestioanrioService: CuestionarioService,
               private respuestaCuestionarioService: RespuestaCuestionarioService,
               private activatedRoute: ActivatedRoute,
               private router: Router) {
                this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
               }

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

  getListCuestionarioById( idC: string) {
    console.log(idC);
  }

  public labels1: string[] = ['Pan','Refresco','Tacos'];
  public data1 = [
    [10, 15, 40],
  ];

}
