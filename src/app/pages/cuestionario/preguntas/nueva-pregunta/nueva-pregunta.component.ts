import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';

import { Pregunta } from '../../../../models/pregunta.model';
import { Respuesta } from '../../../../models/respuesta.model';

@Component({
  selector: 'app-nueva-pregunta',
  templateUrl: './nueva-pregunta.component.html',
  styleUrls: [
    './nueva-pregunta.component.css'
  ]
})
export class NuevaPreguntaComponent implements OnInit {

  /**Aqui creamos una variable pregunta de tipo pregunta donde vamos almacenar
   * la pregunta con las respuestas */
  pregunta: Pregunta;

  /**Icremento puntos */
  puntosRespuesta: number = 0;

  /**Para almacenar la respuesta del radio button */
  //rtaCorrecta;

   /**Enviar pregunta al listado de preguntas */
   @Output() enviarPregunta = new EventEmitter<Pregunta>();

  /**Form Pregunta Unica */
  public nuevaPreguntaUnica = this.fb.group({

    titulo: ['', Validators.required],
    puntaje: [''],
    respuestas: this.fb.array([])

  });

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
  }

  /**Metodo para devolver el array de las respuestas */
  get getRespuestasUnicas(): FormArray {
    return this.nuevaPreguntaUnica.get('respuestas') as FormArray;
  }

   /**Metodo para agregar mas respuestas al array*/
   agregarRespuestasUnicas() {
    this.getRespuestasUnicas.push( this.fb.group({
      descripcion:['', Validators.required],
      puntosRespuesta:['',Validators.required]
    }));
  }

  eliminarRespuestasUnicas( index: number ) {
    this.getRespuestasUnicas.removeAt( index );
  }

  // setRespuestasUnicasValidas( index: any) {
  //   this.rtaCorrecta = index;
  // }

  agregarPregunta() {
    /**Obtenemos el titulo de la pregunta */
    const descripcionPregunta = this.nuevaPreguntaUnica.get('titulo').value;
    const puntajePregunta = this.nuevaPreguntaUnica.get('puntaje').value;

    /**Obtenemos puntos de la pregunta */
    //const puntosPregunta = this.nuevaPreguntaUnica.get('puntos').value;

    /**Obtenemos el array de respuestas que puso el usuario */
    const arrayRespuestas = this.nuevaPreguntaUnica.get('respuestas').value;

    /**Creamos un array de tipo respuestas */
    const arrayRta: Respuesta[] = [];

    /**Vamos a interar el arrayRespuestas y vamos a ir creando nuevos
     * objetos respuestas y lo vamos a ir insertando en el arrayRta
     */
    arrayRespuestas.forEach(( element, index ) => {
      /**Por cada respuesta creamo un objeto de tipo respuesta en donde setiamos
       * la respuesta element.descripcion
      */
      const respuesta: Respuesta = new Respuesta(element.descripcion, element.puntosRespuesta);

      /**Para verificar si al respuesta es correcta */
      /*if( index === element.esCorrecta ) {
        respuesta.esCorrecta = true;
      }*/

      arrayRta.push(respuesta);
    });

    /**Creamos un nuevo objeto pregunta en donde vamos almacenar*/
    const pregunta: Pregunta = new Pregunta( descripcionPregunta, puntajePregunta, arrayRta );
    console.log(pregunta);
    this.enviarPregunta.emit(pregunta);
    this.resetFormulario();
  }

  resetFormulario() {
    this.nuevaPreguntaUnica.reset();
    this.getRespuestasUnicas.clear();
    this.puntosRespuesta = 0;
  }

  agregarPuntos() {
    this.puntosRespuesta++
  }

}
