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
  styleUrls: [
    './grafica1.component.css',
  ]
})
export class Grafica1Component {

  public niveles = {
    1: 'excluido',
    2: 'basico',
    3: 'desarrollado',
    4: 'avanzado',
    5: 'hiper TIC'
  };

  public isActive: boolean = false;
  public chart: any;
  public id: string;
  public listCuestionarios: Cuestionario[] = [];
  public pregunta: string = "";
  public pos: number = 0;

  @ViewChild('grafico') grafico?: ElementRef;
  public datosCuestionario: DatosCuestionario[] = [];
  public preguntas: ListRespuestasUsuario[] = [];
  public respuestas: string[] = [];
  public texto: string[] = [];
  public labels = [];
  public data = [];
  public colores: string[] = ['#FF0000', '#FF8000', '#FFFF00', '#80FF00', '#00FFFF', '#0080FF', '#0000FF', '#BF00FF', '#FE2EC8', '#FF0080', '#FF0040', '#D8D8D8', '#F6CECE', '#610B0B', '#210B61', '#64FE2E', '#0080FF', '#3B0B24', '#8A0808', '#8A4B08', '#5E610B', '#0B6121', '#0B2161', '#220A29', '#A9A9F5', '#81BEF7', '#2E64FE', '#0B173B', '#848484', '#585858', '#585858', '#3B0B17', '#610B21', '#610B4B', '#0A0A2A'];
  public firts = true;
  public tipo = new FormControl();
  public madurez: string = "";
  public promedioMadurez = 0;

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

  ngAfterViewInit(): void {
    this.graficarInfo();
  }

  graficarInfo(tipo: ChartType = 'horizontalBar') {
    const x = [0, 1, 2, 3, 5];
    const y = ["TIC Excluido", "TIC Básico", "TIC Desarrollado", "TIC Avanzado", "Hiper TIC"];
    this.chart = new Chart(this.grafico?.nativeElement, {
      options: {
        labels: x,
        title: {
          display: true,
          text: "Niveles del modelo de madurez de Transformacion Digital",
        },
        tooltips: {
          callbacks: {

          }
        },
      },
      type: tipo,
      data: {
        labels: y,
        datasets: [{
          backgroundColor: ['#2ecc71', '#3498db', '#95a5a6', '#9b59b6', '$f1c40f'],
          data: x,
          label: y,
        }]
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
    let p = [];


    this.preguntas.forEach((pre, index) => {
      if (pre.tituloPregunta === this.pregunta) {

        this.preguntas[index].indexRespuestaSeleccionada.forEach(res => {
          let sele = this.preguntas[index].listRespuesta[res].descripcion ?? "";
          this.preguntas[index].listRespuesta.forEach(p => {
            const existe = this.labels.indexOf(p.descripcion);
            if (existe == -1) {
              this.labels.push(p.descripcion);
              this.data.push(0);
            }
          });
          const pos = this.labels.indexOf(sele);
          this.data[pos] += 1;
         
        });
        // let sele = this.preguntas[index].listRespuesta[this.preguntas[index].indexRespuestaSeleccionada].descripcion?? "";
        // this.preguntas[index].listRespuesta.forEach(p => {
        //   const existe = this.labels.indexOf(p.descripcion);
        //   if (existe == -1) {
        //     this.labels.push(p.descripcion);
        //     this.data.push(0);
        //   }
        // });
        // const pos = this.labels.indexOf(sele);
        // this.data[pos] += 1;

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
  obtenerPromedio() {
    this.promedioMadurez = 0;
    this.listCuestionarios.forEach(cuestionario => {
      this.respuestaCuestionarioService.getRespuestaByIdCuestionario(cuestionario._id).toPromise().then(response => {
        this.datosCuestionario = response as DatosCuestionario[];
        this.calcularNivelMadurez();
        console.log("MMTD", (this.promedioMadurez / this.listCuestionarios.length), `${this.promedioMadurez} ${this.listCuestionarios.length}`);
        this.madurez = "";
      });
    });
  }

  obtenerCuestionario(id) {
    this.respuestaCuestionarioService.getRespuestaByIdCuestionario(id).toPromise().then(response => {
      this.datosCuestionario = [];
      this.datosCuestionario = response as DatosCuestionario[];
    });
  }


  getListCuestionarioById(idC: string, i) {
    this.pos = i;
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
    this.isActive = true;
  }
  calcularNivelMadurez() {
    let temp = 0;
    let respuestas = {
      'respuestas': [],
      'indice': [],
      'total': []
    };
    console.log(this.datosCuestionario);
    this.datosCuestionario.map((res, index) => {
      res.listRespuestasUsuario.map(l => {
        respuestas['indice'].push(index)
        l.indexRespuestaSeleccionada.map(r => {
          respuestas['respuestas'].push(l.tituloPregunta + "/" + l.listRespuesta[r].descripcion + "/" + (1 / l.listRespuesta.length))

        });
        // respuestas['respuestas'].push(l.tituloPregunta+"/"+l.listRespuesta[l.indexRespuestaSeleccionada].descripcion+"/"+(1/l.listRespuesta.length))
        respuestas['total'].push(l.listRespuesta.length)
      })
    });
    console.log(respuestas);
    let porcentajes = {

    };
    let p = {};
    let c = 0;
    respuestas.respuestas.map(r => {
      const rr = r.split("/");
      respuestas.respuestas.map(res => {
        const rrs = res.split("/");
        if (rrs[0] == rr[0]) {
          porcentajes[rrs[1]] += 1;
        } else {
          porcentajes[rrs[1]] = 1;
        }
      })
    });
    console.log(porcentajes);
    let total: number = 0;
    let ps = 0;
    Object.values(porcentajes).map(v => {
      total += Number(v + "");
    });
    let x = [];
    Object.values(porcentajes).map(v => {
      x.push(((Number(v) * 100) / total))
    });
    let zz = 0
    x.map(x => {
      respuestas.respuestas.map(r => {
        const q = r.split("/")
        ps = Number(q[2]);
      })
      zz += x * ps;
    });
    console.log(zz);
    this.madurez = zz + "";
    this.promedioMadurez += zz;
  }
  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  graficar(tipo: ChartType = 'horizontalBar') {
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
        labels: this.labels,
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
          data: porcentajes,
          label: this.labels,
        }]
      }
    });
    this.pregunta = "";
  }

}
