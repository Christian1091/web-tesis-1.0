import { FormControl } from '@angular/forms';
import { DatosCuestionario, ListRespuestasUsuario } from './datosCuestionario.model';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cuestionario } from '../models/cuestionario.model';
import { CuestionarioService } from '../services/cuestionario.service';
import { RespuestaCuestionarioService } from '../services/respuesta-cuestionario.service';
import Chart from 'chart.js';
import { ChartType } from 'chart.js'

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  public chart: any;
  public id: string;
  public listCuestionarios: Cuestionario[] = [];
  public pregunta: string = "";

  @ViewChild('grafico') grafico?: ElementRef;
  public datosCuestionario: DatosCuestionario[] = [];
  public preguntas: ListRespuestasUsuario[] = [];
  public respuestas: string[] = [];
  public texto: string[] = [];
  public labels = [];
  public data = [];
  public colores: string[] = ['#2ecc71', '#3498db', '#95a5a6', '#9b59b6', '#f1c40f', '#e74c3c'];
  public firts = true;
  public tipo = new FormControl();

  constructor(private cuestioanrioService: CuestionarioService,
    private respuestaCuestionarioService: RespuestaCuestionarioService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    this.getListCuestionarios();
    this.tipo.valueChanges.subscribe(res => {
      const value: string = res;
      this.chart.destroy();
      if (value.localeCompare("0")) {
        this.graficar(res);
      } else {
        this.graficar();
      }
    });
  }

  mostrar() {
    if (this.chart != null || this.chart != undefined) {
      this.chart.destroy();
      console.log('destruido');
    }
    this.labels = [];
    this.data = [];
    let res = {};
    this.preguntas.forEach((pre, index) => {
      if (pre.tituloPregunta === this.pregunta) {
        let sele = this.preguntas[index].listRespuesta[this.preguntas[index].indexRespuestaSeleccionada].descripcion;
        this.preguntas[index].listRespuesta.forEach(p => {
          const existe = this.labels.indexOf(p.descripcion);
          if (existe == -1) {
            this.labels.push(p.descripcion);
            this.data.push(0);
          }
        });
        const pos = this.labels.indexOf(sele);
        this.data[pos] += 1;
        
      }
    });

    console.log(this.labels);
    console.log(this.data);

    this.graficar()
  }

  getListCuestionarios() {
    this.cuestioanrioService.getListCuestionarios()
      .subscribe(({ cuestionarios }) => {
        //console.log(cuestionarios);
        this.listCuestionarios = cuestionarios;
        console.log(this.listCuestionarios);
      })
  }

  getListCuestionarioById(idC: string) {
    this.respuestaCuestionarioService.getRespuestaByIdCuestionario(idC).subscribe(response => {
      this.preguntas = [];
      this.texto = [];
      this.datosCuestionario = [];
      this.datosCuestionario = response as DatosCuestionario[];
      this.datosCuestionario.map(dc => {
        dc.listRespuestasUsuario.map(pre => {
          const posi = this.texto.indexOf(pre.tituloPregunta);
          if (posi == -1) {
            this.texto.push(pre.tituloPregunta);
          }
          this.preguntas.push(pre);
        });
      });
    });
  }

  graficar(tipo: ChartType = 'bar') {
    let porcentajes: number[] = [];
    let suma = 0;
    this.data.forEach(d => {
      suma += d
    });
    for (let i = 0; i < this.data.length; i++) {
      porcentajes.push(parseInt(((this.data[i] * 100) / suma) + "", 10));
    }

    let colors: string[] = [];
    for (let i = 0; i < this.labels.length; i++) {
      if (colors.length != this.labels.length) {
        const random = Math.floor(Math.random() * this.colores.length);
        colors.push(this.colores[random]);
      }
    }
    this.chart = new Chart(this.grafico?.nativeElement, {
      options: {
        title: {
          display: true,
          text: this.pregunta,
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              var dataset = data.datasets[tooltipItem.datasetIndex];
              var meta = dataset._meta[Object.keys(dataset._meta)[0]];
              var total = meta.total;
              var currentValue = dataset.data[tooltipItem.index];
              return currentValue + '%';
            }
          }
        }, 
      },
      type: tipo,
      data: {
        labels: this.labels,
        datasets: [{
          backgroundColor: colors,
          data: porcentajes
        }]
      }
    });
    this.pregunta = "";
  }
  
}
