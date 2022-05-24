import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cuestionario } from 'src/app/models/cuestionario.model';

import { Pregunta } from 'src/app/models/pregunta.model';
import { Respuesta } from 'src/app/models/respuesta.model';

import { CuestionarioService } from 'src/app/services/cuestionario.service';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
	selector: 'app-pregunta',
	templateUrl: './pregunta.component.html',
	styleUrls: [
		'./pregunta.component.css',
	]
})
export class PreguntaComponent implements OnInit {

	public id: string;
	respuestaTexto = new FormControl();
	cuestionario!: Cuestionario;

	idCuestionario: string;
	listPreguntas: Pregunta[] = [];
	listRespuesta: Respuesta[] = [];
	rtaConfirmada = false;
	indexPregunta = 0;
	cargoPregunta = false;

	//Agrego un contador: Para tener el index de pregunta
	contador = 0;

	// Respuesta Usuario
	opcionSeleccionada: any; // Nos ayuda a pintar la respuesta seleccionada
	indexSeleccionado: any; // Almacenar cual es la opcion seleccionada
	//indexPuntosSeleccionado: any;
	puntosTotales = 0;
	//puntosPregunta = 0;
	listRespuestaUsuario: any[] = [];
	nombreParticipante = '';
	correoParticipante = '';
	institucionParticipante = '';
	provinciaParticipante = '';
	ciudadParticipante = '';
	opcionOtros: boolean[] = [];
	indices: number[] = [];
	tipoPersona: string = "";

	public descripcion: string = "";
	public titulo: string = "";

	constructor(private respuestaCuestionarioService: RespuestaCuestionarioService,
		private cuestionarioService: CuestionarioService,
		private activatedRoute: ActivatedRoute,
		private router: Router) {
		this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
		this.getCuestionario();
	}

	ngOnInit(): void {

		this.idCuestionario = this.id;
		this.nombreParticipante = this.respuestaCuestionarioService.nombreParticipante;
		this.correoParticipante = this.respuestaCuestionarioService.correoParticipante;
		this.institucionParticipante = this.respuestaCuestionarioService.institucionParticipante;
		this.provinciaParticipante = this.respuestaCuestionarioService.provinciaParticipante;
		this.ciudadParticipante = this.respuestaCuestionarioService.ciudadParticipante;

		// this.idCuestionario = this.respuestaCuestionarioService.idCuestionario;
		// if (this.idCuestionario == null ){
		//   this.router.navigateByUrl('/');
		//   return;
		// }

	}

	getCuestionario() {
		this.cuestionarioService.getVerCuestionario(this.id)
			.subscribe(res => {
				this.descripcion = res.cuestionarios[0].descripcion;
				this.titulo = res.cuestionarios[0].nombre;
				this.listPreguntas = res.cuestionarios[0].listPreguntas;
				this.tipoPersona = res.cuestionarios[0].tipoPersona ?? "";
				//this.listRespuesta = this.listPreguntas[1].listRespuesta;
				this.listPreguntas.forEach(p => {
					this.opcionOtros.push(p.otraRespuesta);
				})
				this.cargoPregunta = true;
			});
	}

	obtenerPregunta(): string {
		return this.listPreguntas[this.indexPregunta]?.descripcion;
	}

	obtenerArea(): string {
		return this.listPreguntas[this.indexPregunta]?.area ?? " ";
	}

	// obtenerpuntosRespuesta(): string {
	//   return this.listPreguntas[this.indexPregunta]?.;
	// }

	getIndex(): number {
		return this.indexPregunta;
	}

	respuestaSeleccionada(respuesta: Respuesta, index: number, esMultiple: boolean) {
		this.opcionSeleccionada = respuesta;
		this.rtaConfirmada = true;
		this.indexSeleccionado = index;
		if (respuesta.texto && this.respuestaTexto.value?.length > 0) {
			respuesta.descripcion = this.respuestaTexto.value;
			respuesta.descripcion = respuesta.descripcion.trim().toUpperCase()
		}
		if (esMultiple) {
			let existe = false;
			if (this.indices.length == 0) {
				this.indices.push(index)
				existe = true;
			} else {
				this.indices.map((value, i) => {

					if (value == index) {
						existe = true;
						this.indices.splice(i, 1);
					}

				})
			}
			if (!existe) {
				this.indices.push(index)
			}
		}
		else {
			this.indices = []
			this.indices.push(index);
		}
	}

	respSelect(value, index) {
		console.log(value, index);
	}

	AddClassOption(respuesta: any): string {
		if (respuesta === this.opcionSeleccionada) {
			return 'active text-light';
		}
	}

	siguiente(i) {
		this.agregarRespuesta(i);
		this.contador = this.contador + 1;
		this.respuestaTexto.setValue('');

	}

	agregarRespuesta(i) {
		let indexAux;
		//let respuestaUsuario;


		// Creamos un objeto respuesta y lo agregamos al array
		//for (let i = 0; i < this.listPreguntas.length; i++) {
		indexAux = this.obtenemosIndexSeleccionado();
		//this.puntosPregunta = this.listPreguntas[i].listRespuesta[indexAux].puntosRespuesta;

		const respuestaUsuario: any = {
			idPregunta: this.listPreguntas[this.indexPregunta]._id,
			tituloPregunta: this.listPreguntas[this.indexPregunta].descripcion,
			puntajePregunta: this.listPreguntas[this.indexPregunta].puntajePregunta,
			indexRespuestaSeleccionada: this.indices,
			puntosObtenidos: this.listPreguntas[i].listRespuesta[indexAux].puntosRespuesta,
			//puntos: this.obtenemosPuntosPregunta(),
			// Hacemos una copia del listado respuestas
			listRespuesta: this.listPreguntas[this.indexPregunta].listRespuesta,
			area: this.listPreguntas[this.indexPregunta].area,
			areaValor: this.listPreguntas[this.indexPregunta].valorArea,

		}
		this.listRespuestaUsuario.push(respuestaUsuario);
		this.opcionSeleccionada = undefined;
		this.indexSeleccionado = undefined;
		// const respuestaUsuario: any = {
		//   titulo: this.listPreguntas[this.indexPregunta].descripcion
		// }
		this.rtaConfirmada = false;
		this.indexPregunta++;

		if (this.indexPregunta === this.listPreguntas.length) {
			// Guardamos las respuestas en mongo
			// Creamos un nuevo objeto para almacenar en la BD
			this.guardamosRespuestaCuestionario();
			// Redireccionamos al proximo componente
		}
		this.indices = [];
	}

	obtenemosIndexSeleccionado(): any {
		if (this.opcionSeleccionada === undefined) {
			return '';
		} else {
			return this.indexSeleccionado;
		}
	}

	obtenemosPuntosTotales(): number {

		for (let i = 0; i < this.listRespuestaUsuario.length; i++) {
			const puntosAux = this.listRespuestaUsuario[i].puntosObtenidos
			this.puntosTotales = Number(this.puntosTotales) + Number(puntosAux);

		}

		return this.puntosTotales;
	}

	guardamosRespuestaCuestionario() {
		const respuestaCuestionario: any = {
			idCuestionario: this.idCuestionario,
			nombreParticipante: this.nombreParticipante,
			correoParticipante: this.correoParticipante,
			institucionParticipante: this.institucionParticipante,
			provinciaParticipante: this.provinciaParticipante,
			ciudadParticipante: this.ciudadParticipante,
			fecha: new Date(),
			puntosTotales: this.obtenemosPuntosTotales(),
			listRespuestaUsuario: this.listRespuestaUsuario,
			tipoPersona: this.tipoPersona
		}
		
		// Almacenamos la respuesta en mongoDB
		this.respuestaCuestionarioService.guardarRespuestaUsuario(respuestaCuestionario).subscribe(res => {
			//console.log(res.respuestaCuestionario._id);
		this.router.navigateByUrl(`/respuestaCuestionario/${res.respuestaCuestionario._id}`);
		}, err => {
			//Swal.fire('Error', err.error.msg, 'error');
			this.router.navigateByUrl('/');
		});
	}

}
