import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cuestionario } from 'src/app/models/cuestionario.model';
import { CuestionarioService } from 'src/app/services/cuestionario.service';

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

  public cuestionario?: Cuestionario;
  esMultiple: boolean = false;
  public posicion: number;

  /**variable pregunta donde almacena la pregunta con las respuestas */
  pregunta: Pregunta;
  /**Incremento puntos */
  puntosRespuesta: number = 0;
  public title = "Agregar";
  /**Enviar pregunta al listado de preguntas */


  @Output() enviarPregunta = new EventEmitter<Pregunta>();
  /**Form Pregunta 2 Paso */
  public opcionRespuestas: FormGroup;
  public habilitar: boolean = false;
  public pos = 0;

  cargarFormulario() {
    this.opcionRespuestas = this.fb.group({

      titulo: ['', Validators.required],
      puntaje: [''],
      respuestas: this.fb.array([]),
      respuestaOtros: [false]

    });
  }

  habilitarOtros() {
    this.habilitar = (this.habilitar) ? false : true;
    this.opcionRespuestas.get("respuestaOtros").setValue(this.habilitar)
  }
constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private cuestionarioService: CuestionarioService) {

    this.cuestionario=data["cuestionario"];
    this.pos = data["pos"]
    
    //this.opcionRespuestas.get("respuestaOtros").setValue(this.)

   }

  cargarCuestionario() {
    //this.opcionRespuestas.get("titulo").setValue(this.cuestionario.titulo);
  }

  ngOnInit(): void {
    this.cargarFormulario();
    if (this.cuestionario == null || this.cuestionario == undefined) {
      this.agregarRespuestasPorDefecto();
      this.title = "Agregar";
    } else {

      this.title = "Actualizar";
      this.opcionRespuestas.get("titulo").setValue(this.cuestionario.listPreguntas[this.pos].descripcion);
      this.opcionRespuestas.get("puntaje").setValue(this.cuestionario.listPreguntas[this.pos].puntajePregunta);
      //this.opcionRespuestas.get("respuestas").setValue(this.cuestionario.listPreguntas[this.pos].listRespuesta);
  
      this.cuestionario.listPreguntas[this.pos].listRespuesta.forEach(r => {
        this.getRespuestasMultiples.push(this.fb.group({
          descripcion: [r.descripcion, Validators.required],
          puntosRespuesta: [r.puntosRespuesta, Validators.required]
        }));
      })
      this.habilitar = this.cuestionario.listPreguntas[this.pos].otraRespuesta;
    }
    
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
    this.getRespuestasMultiples.push(this.fb.group({
      descripcion: ['', Validators.required],
      puntosRespuesta: ['', Validators.required]
    }));
  }

  agregarRespuestaMultiples() {
    this.esMultiple = true;
    this.getRespuestasMultiples.push(this.fb.group({
      descripcion: ['', Validators.required],
      puntosRespuesta: ['', Validators.required]
    }));
  }

  eliminarRespuestaMultiples(index: number) {
    this.getRespuestasMultiples.removeAt(index);
  }

  eliminarRespuestasUnicas(index: number) {
    this.getRespuestasUnicas.removeAt(index);
  }

  agregarPregunta() {
    if (this.cuestionario != null || this.cuestionario != undefined) {
      
      this.actualizar();
    } else {
      console.log(2222);
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
     * objetos respuestas y lo vamos a ir insertando en el arrayRta*/
    arrayRespuestas.forEach((element, index) => {
      /**Por cada respuesta creamo un objeto de tipo respuesta en donde setiamos
       * la respuesta element.descripcion*/
      const respuesta: Respuesta = new Respuesta(element.descripcion, element.puntosRespuesta);
      /**Para verificar si al respuesta es correcta */
      /*if( index === element.esCorrecta ) {
        respuesta.esCorrecta = true;
      }*/
      arrayRta.push(respuesta);
    });
    /**Creamos un nuevo objeto pregunta en donde vamos almacenar*/
    const pregunta: Pregunta = new Pregunta(descripcionPregunta, puntajePregunta, arrayRta, otraRespuesta);
    console.log(pregunta);
    this.enviarPregunta.emit(pregunta);
    this.resetFormulario();
    this.habilitar = false;

    }
   
  }

  
  resetFormulario() {
    this.opcionRespuestas.reset();
    this.getRespuestasUnicas.clear();
    this.puntosRespuesta = 0;
  }

  agregarPuntos() {
    this.puntosRespuesta++
  }

  actualizar() {
    
    const descripcionPregunta = this.opcionRespuestas.get('titulo').value;
      const puntajePregunta = this.opcionRespuestas.get('puntaje').value;
      const otraRespuesta = this.opcionRespuestas.get('respuestaOtros').value;
      
      
      this.cuestionario.listPreguntas[this.pos].descripcion = descripcionPregunta;
      this.cuestionario.listPreguntas[this.pos].puntajePregunta = puntajePregunta;
      this.cuestionario.listPreguntas[this.pos].otraRespuesta = this.habilitar;
    console.log(this.cuestionario);
    console.log("xdxdxd");
    
    this.cuestionarioService.actualizarCuestionario(this.cuestionario).subscribe(res => {
      console.log(res);
      
    })
  }

}


