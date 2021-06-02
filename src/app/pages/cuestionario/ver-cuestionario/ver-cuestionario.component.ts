import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cuestionario } from 'src/app/models/cuestionario.model';
import { CuestionarioService } from 'src/app/services/cuestionario.service';

@Component({
  selector: 'app-ver-cuestionario',
  templateUrl: './ver-cuestionario.component.html',
  styles: [],
})
export class VerCuestionarioComponent implements OnInit {

  id: string;

  cuestionario: any = {};

  constructor(
    private cuestionarioService: CuestionarioService,
    private activatedRoute: ActivatedRoute
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    this.obtenerCuestionario();
  }

  obtenerCuestionario() {
    this.cuestionarioService.getVerCuestionario( this.id )
                            .subscribe ( data => {
                                console.log(data);
                                this.cuestionario = data;
                                //console.log(Object.values(data));
                                //this.cuestionario = Object.values(data);
                              }, error => {
                                console.log(error);
                              }
                            )
  }
}
