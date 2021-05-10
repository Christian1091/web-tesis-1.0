import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styles: [
  ]
})
export class PreguntasComponent implements OnInit {

  /**Creamos una pregunta que va hacer de tipo pregunta donde
   * vamos almacenar la pregunta con las respuestas
   */
  //pregunta: Pregunta;
  /**Para almacenar la respuesta del radio button */
  rtaCorrecta = 0;

  /**Form Pregunta Unica */
  public respuestaCorta = this.fb.group({

    titulo: ['', Validators.required],
    respuestas: this.fb.array([])

  });

  /**Form Pregunta Multiple */
  public respuestaMultiple = this.fb.group({

    titulo: ['', Validators.required],
    respuestas: this.fb.array([])

  });

  /**Form Pregunta Corta */
  public respuestasCortas = this.fb.group({

    titulo: ['', Validators.required],
    respuestas: this.fb.array([])

  });

  constructor( private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  /**Metodo para devolver el array de las respuestas */
  get getRespuestas(): FormArray {
    return this.respuestaCorta.get('respuestas') as FormArray;
  }

  /**Metodo para agregar mas respuestas al array*/
  agregarRespuesta() {
    this.getRespuestas.push( this.fb.group({
      descripcion:['', Validators.required],
      esCorrecta: 0
    }));
  }

  eliminarRespuesta( index: number ) {
    this.getRespuestas.removeAt( index );
  }

  /**Respuestas Multiples*/
  get getRespuestasMultiples(): FormArray {
    return this.respuestaMultiple.get('respuestas') as FormArray;
  }

  agregarRespuestaMultiples() {
    this.getRespuestasMultiples.push( this.fb.group({
      descripcion:['', Validators.required],
      esCorrecta: 0
    }));
  }

  eliminarRespuestaMultiples( index: number ) {
    this.getRespuestasMultiples.removeAt( index );
  }

  /**Respuestas Cortas*/
  get getRespuestasCortas(): FormArray {
    return this.respuestasCortas.get('respuestas') as FormArray;
  }

  agregarRespuestaCortas() {
    this.getRespuestasCortas.push( this.fb.group({
      descripcion:['', Validators.required],
      esCorrecta: 0
    }));
  }

  eliminarRespuestaCortas( index: number ) {
    this.getRespuestasCortas.removeAt( index );
  }

}
