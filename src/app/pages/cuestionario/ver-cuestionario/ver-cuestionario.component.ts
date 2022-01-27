import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Cuestionario } from 'src/app/models/cuestionario.model';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import { ActualizarCuestionarioComponent } from '../actualizar-cuestionario/actualizar-cuestionario.component';
import { NuevaPreguntaComponent } from '../preguntas/nueva-pregunta/nueva-pregunta.component';
import { Overlay } from '@angular/cdk/overlay';


@Component({
  selector: 'app-ver-cuestionario',
  templateUrl: './ver-cuestionario.component.html',
  styles: [],
})
export class VerCuestionarioComponent implements OnInit {
  //Id del cuestioanrio
  
  id: string;

  cuestionario: any = {};

  constructor(private cuestionarioService: CuestionarioService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private overlay: Overlay) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
    
    //console.log('----- ' + this.id);
  }

  ngOnInit(): void {
    this.obtenerCuestionario();
  }

  obtenerCuestionario() {
    this.cuestionarioService.getVerCuestionario(this.id)
      .subscribe(data => {
        //console.log(data);
        this.cuestionario = data;
        //console.log(Object.values(data));
        //this.cuestionario = Object.values(data);
      }, error => {
        console.log(error);
      }
      )
  }

  cargarCuestionario(r, i) {
    const scrollStrategy = this.overlay.scrollStrategies.block();
    let cuestionario: Cuestionario = r;
    console.log(cuestionario.listPreguntas[i]);
    const modal = this.dialog.open(NuevaPreguntaComponent, {
      data: {
        "pos": i,
        "cuestionario": cuestionario
      },
      disableClose: false,
      scrollStrategy: scrollStrategy,
      width: '800px',
			height: '600px',
			autoFocus: false,
			panelClass: 'custom-modalbox',
			hasBackdrop: true,
			backdropClass: 'backdrop',
    });

  }
}
