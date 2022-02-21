import { VerCuestionarioComponent } from './../../ver-cuestionario/ver-cuestionario.component';
import { Component, OnInit, Output, EventEmitter, Inject, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cuestionario } from 'src/app/models/cuestionario.model';
import { CuestionarioService } from 'src/app/services/cuestionario.service';

import { Pregunta } from '../../../../models/pregunta.model';
import { Respuesta } from '../../../../models/respuesta.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Area } from '../../../../models/area.model';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-nueva-pregunta',
  templateUrl: './nueva-pregunta.component.html',
  styleUrls: [
    './nueva-pregunta.component.css'
  ]
})


export class NuevaPreguntaComponent implements OnInit {

  @ViewChild('monedaSelect') public monedaSelect: MatSelect;
  public tituloCuestionario = new FormControl();
  public descripcionCuestionario = new FormControl();
  public puntajeCuestionario = new FormControl();
  public cuestionario?: Cuestionario;
  esMultiple: boolean = false;
  public posicion: number;
  public bandera = false;
  public anterior: boolean = false;
  public area: string = "";
  public valorArea: number = -1;
  checked = false;
  /**variable pregunta donde almacena la pregunta con las respuestas */
  pregunta: Pregunta;
  /**Incremento puntos */
  puntosRespuesta: number = 0;
  public tittle = "Agregar";
  /**Enviar pregunta al listado de preguntas */


  @Output() enviarPregunta = new EventEmitter<Pregunta>();
  /**Form Pregunta 2 Paso */
  public opcionRespuestas: FormGroup;
  public habilitar: boolean = false;
  public pos = 0;
  public areas: Area[] = [];

  changeState() {
    this.checked = !this.checked;
  }
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
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private cuestionarioService: CuestionarioService, private dialogRef: MatDialogRef<VerCuestionarioComponent>) {
    this.cuestionario = data["cuestionario"];
    this.pos = data["pos"]


    //this.opcionRespuestas.get("respuestaOtros").setValue(this.)
    if (this.cuestionario != null || this.cuestionario != undefined) {
      this.tituloCuestionario.setValue(this.cuestionario.nombre ?? '');
      this.descripcionCuestionario.setValue(this.cuestionario.descripcion ?? '');
      this.puntajeCuestionario.setValue(this.cuestionario.puntajeCuestionario ?? 0);

    }
  }

  cargarAreas() {
    this.cuestionarioService.getListAreas().subscribe(response => {
      this.areas = response.areas;
    });
  }
  cargarCuestionario() {
    //this.opcionRespuestas.get("titulo").setValue(this.cuestionario.titulo);
  }

  ngOnInit(): void {
    
    this.cargarAreas();
    this.cargarFormulario();
    if (this.cuestionario == null || this.cuestionario == undefined) {
      //this.agregarRespuestasPorDefecto();
      this.tittle = "Agregar Pregunta";
      this.bandera = true;
    } else {
      this.area =  this.cuestionario.listPreguntas[this.pos].area ?? "";
      this.tittle = "Actualizar";
      this.bandera = false;
      
      this.opcionRespuestas.get("titulo").setValue(this.cuestionario.listPreguntas[this.pos].descripcion);
      this.opcionRespuestas.get("puntaje").setValue(this.cuestionario.listPreguntas[this.pos].puntajePregunta);
      //this.opcionRespuestas.get("respuestas").setValue(this.cuestionario.listPreguntas[this.pos].listRespuesta);

      this.cuestionario.listPreguntas[this.pos].listRespuesta.forEach(r => {
        //const valor = Math.round((r.puntosRespuesta+Number.EPSILON)*100)/100
        //console.log("mi valor ", valor)
        this.getRespuestasMultiples.push(this.fb.group({
          descripcion: [r.descripcion, Validators.required],
          puntosRespuesta: [r.puntosRespuesta, Validators.required],
          texto: [r.texto],
          tipoRespuesta: [r.tipoRespuesta]
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
    this.agregarRespuesta(true, false);
  }

  /**Metodo para agregar mas respuestas al array - 4 paso*/

  agregarRespuesta(opcion: boolean, texto: boolean) {
    this.esMultiple = opcion;

    this.getRespuestasMultiples.push(this.fb.group({
      descripcion: ['', Validators.required],
      puntosRespuesta: ['', Validators.required],
      texto: [texto],
      tipoRespuesta: [this.esMultiple]
    }));
    // this.getRespuestasMultiples.get("respuestas").get("tipoRespuesta").setValue(this.esMultiple);
    let size = this.getRespuestasMultiples.length;
    let p = (size == 0) ? 1 : (1 / size);

    if (texto) {
      for (let i = 0; i < this.getRespuestasMultiples.length; i++) {
        this.getRespuestasMultiples.at(i).get('puntosRespuesta').setValue(p.toFixed(2))
        this.getRespuestasMultiples.at(i).get('area').setValue(this.area)
        if (this.anterior == opcion) {
          this.getRespuestasMultiples.at(i).get('tipoRespuesta').setValue(this.esMultiple)
        } else {
          this.getRespuestasMultiples.at(i).get('tipoRespuesta').setValue(!this.esMultiple)
        }
        console.log(this.getRespuestasMultiples.at(i).get('puntosRespuesta').value);
      }
    }
    else {
      for (let i = 0; i < this.getRespuestasMultiples.length; i++) {
        this.getRespuestasMultiples.at(i).get('puntosRespuesta').setValue(p.toFixed(2))
        this.getRespuestasMultiples.at(i).get('tipoRespuesta').setValue(this.esMultiple)
        this.getRespuestasMultiples.at(i).get('area').setValue(this.area)
        console.log(this.getRespuestasMultiples.at(i).get('puntosRespuesta').value);
      }
    }

  }

  eliminarRespuestaMultiples(index: number) {
    this.getRespuestasMultiples.removeAt(index);
    console.log(this.getRespuestasMultiples.length);

    let size = this.getRespuestasMultiples.length;
    let p = (size == 0) ? 1 : (1 / size);
    for (let i = 0; i < this.getRespuestasMultiples.length; i++) {
      this.getRespuestasMultiples.at(i).get('puntosRespuesta').setValue(p.toFixed(2))
      console.log(this.getRespuestasMultiples.at(i).get('puntosRespuesta').value);
    }

  }

  eliminarRespuestasUnicas(index: number) {
    this.getRespuestasUnicas.removeAt(index);
    let size = this.getRespuestasMultiples.length;
    let p = (size == 0) ? 1 : (1 / size);
    for (let i = 0; i < this.getRespuestasMultiples.length; i++) {
      this.getRespuestasMultiples.at(i).get('puntosRespuesta').setValue(p.toFixed(2))
      console.log(this.getRespuestasMultiples.at(i).get('puntosRespuesta').value);
    }
  }

  getArea(event: Area) {
    console.log(event);
    this.area = event.area;
    this.valorArea = event.valor;

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
        element.esMultiple;
        const respuesta: Respuesta = new Respuesta(element.descripcion, element.puntosRespuesta, element.texto, element.tipoRespuesta);
        /**Para verificar si al respuesta es correcta */
        /*if( index === element.esCorrecta ) {
          respuesta.esCorrecta = true;
        }*/
        arrayRta.push(respuesta);
      });
      /**Creamos un nuevo objeto pregunta en donde vamos almacenar*/
      const pregunta: Pregunta = new Pregunta(descripcionPregunta, puntajePregunta, arrayRta, otraRespuesta, this.area ?? "", this.valorArea ?? 0);
      console.log(pregunta);
      this.enviarPregunta.emit(pregunta);
      this.resetFormulario();
      this.habilitar = false;

    }
  }

  resetFormulario() {
    this.opcionRespuestas.reset();
    this.getRespuestasUnicas.clear();
  }

  actualizar() {

    const descripcionPregunta = this.opcionRespuestas.get('titulo').value;
    const puntajePregunta = this.opcionRespuestas.get('puntaje').value;
    const otraRespuesta = this.opcionRespuestas.get('respuestaOtros').value;

    this.cuestionario.listPreguntas[this.pos].descripcion = descripcionPregunta;
    this.cuestionario.listPreguntas[this.pos].puntajePregunta = puntajePregunta;
    this.cuestionario.listPreguntas[this.pos].area = this.area ?? "";
    this.cuestionario.listPreguntas[this.pos].valorArea = this.valorArea ?? 0;
    this.cuestionario.listPreguntas[this.pos].otraRespuesta = this.habilitar;
    this.cuestionario.listPreguntas[this.pos].listRespuesta = this.opcionRespuestas.get('respuestas').value;
    console.log(this.cuestionario);
    console.log("xdxdxd");

    this.cuestionario.nombre = this.tituloCuestionario.value;
    this.cuestionario.descripcion = this.descripcionCuestionario.value;
    this.cuestionario.puntajeCuestionario = this.puntajeCuestionario.value;


    this.cuestionarioService.actualizarCuestionario(this.cuestionario).subscribe(res => {
      console.log(res);
      this.dialogRef.close();

    })
  }

}


