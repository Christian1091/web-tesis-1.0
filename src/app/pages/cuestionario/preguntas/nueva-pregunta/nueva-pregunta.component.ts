import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';

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

  esMultiple: boolean = false;

  /**Aqui creamos una variable pregunta de tipo pregunta donde vamos almacenar
   * la pregunta con las respuestas */
  pregunta: Pregunta;

  /**Incremento puntos */
  puntosRespuesta: number = 0;
 
  /**Para almacenar la respuesta del radio button */
  //rtaCorrecta;

   /**Enviar pregunta al listado de preguntas */
   @Output() enviarPregunta = new EventEmitter<Pregunta>();

  /**Form Pregunta Unica 2 Paso */
 // public nuevaPreguntaUnica : FormGroup;

   /**Form Pregunta Multiple */
   public opcionRespuestas : FormGroup;
   public habilitar: boolean = false;

  cargarFormulario() 
  {
    this.opcionRespuestas = this.fb.group({

      titulo: ['', Validators.required],
      puntaje: [''],
      respuestas: this.fb.array([]),
      respuestaOtros: [false]
  
    });
  }

  habilitarOtros() {
    this.habilitar = (this.habilitar) ? false: true;
    this.opcionRespuestas.get("respuestaOtros").setValue(this.habilitar)
  }
  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.cargarFormulario();
    this.agregarRespuestasPorDefecto();

    
    
  }

 
  /**Metodo para devolver el array de las respuestas - 3 paso*/
  get getRespuestasUnicas(): FormArray {
    return this.opcionRespuestas.get('respuestas') as FormArray;
  }

   /**Respuestas Multiples*/
   get getRespuestasMultiples(): FormArray {
    return this.opcionRespuestas.get('respuestas') as FormArray;
  }

  agregarRespuestasPorDefecto() {
    this.agregarRespuestaMultiples();
  }

  /**Metodo para agregar mas respuestas al array - 4 paso*/
  agregarRespuestasUnicas() {
    this.esMultiple = false;
    this.getRespuestasMultiples.push( this.fb.group({
      descripcion:['', Validators.required],
      puntosRespuesta:['',Validators.required]
    }));
  }

  agregarRespuestaMultiples() {
    this.esMultiple = true;
    this.getRespuestasMultiples.push( this.fb.group({
      descripcion:['', Validators.required],
      puntosRespuesta:['',Validators.required]
    }));
  }

  eliminarRespuestaMultiples( index: number ) {
    this.getRespuestasMultiples.removeAt( index );
  }

  eliminarRespuestasUnicas( index: number ) {
    this.getRespuestasUnicas.removeAt( index );
  }

  // setRespuestasUnicasValidas( index: any) {
  //   this.rtaCorrecta = index;
  // }

  agregarPregunta() {
    /**Obtenemos el titulo de la pregunta */
    const descripcionPregunta = this.opcionRespuestas.get('titulo').value;
    const puntajePregunta = this.opcionRespuestas.get('puntaje').value;
    const otraRespuesta = this.opcionRespuestas.get('respuestaOtros').value;

    /**Obtenemos puntos de la pregunta */
    //const puntosPregunta = this.nuevaPreguntaUnica.get('puntos').value;

    /**Obtenemos el array de respuestas que puso el usuario */
    const arrayRespuestas = this.opcionRespuestas.get('respuestas').value;

    
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
    const pregunta: Pregunta = new Pregunta( descripcionPregunta, puntajePregunta, arrayRta, otraRespuesta );
    console.log(pregunta);
    this.enviarPregunta.emit(pregunta);
    this.resetFormulario();
    this.habilitar = false;
  }

  resetFormulario() {
    this.opcionRespuestas.reset();
    this.getRespuestasUnicas.clear();
    this.puntosRespuesta = 0;
  }

  agregarPuntos() {
    this.puntosRespuesta++
  }

}
