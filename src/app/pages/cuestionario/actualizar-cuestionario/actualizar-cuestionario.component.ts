import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pregunta } from '../../../models/pregunta.model';
import { Cuestionario } from '../../../models/cuestionario.model';
import { CuestionarioService } from '../../../services/cuestionario.service';

@Component({
  selector: 'app-actualizar-cuestionario',
  templateUrl: './actualizar-cuestionario.component.html',
  styleUrls: ['./actualizar-cuestionario.component.css']
})
export class ActualizarCuestionarioComponent implements OnInit {
  public posicion: number;
  public cuestionario: Cuestionario;

  public pregunta: Pregunta;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Cuestionario, private cuestionarioService: CuestionarioService) {
  
    this.cuestionario = data;
   }

  ngOnInit(): void {
    console.log(this.cuestionario.listPreguntas[this.posicion]);
  }

  actualizar() {
    this.pregunta = new Pregunta("esta es una actualizacion", 
      this.cuestionario.listPreguntas[this.posicion].puntajePregunta, 
      this.cuestionario.listPreguntas[this.posicion].listRespuesta, 
      this.cuestionario.listPreguntas[this.posicion].otraRespuesta
    );
    
    this.cuestionario.listPreguntas[this.posicion] = this.pregunta;

    console.log(this.cuestionario);
    
    this.cuestionarioService.actualizarCuestionario(this.cuestionario).subscribe(res => {
      console.log(res);
      
    })
  }

}
