import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChartType } from 'chart.js';
import Chart from 'chart.js';

@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.css']
})
export class InformeComponent implements OnInit {

  @ViewChild('grafico') grafico?: ElementRef;
  public chart: any;
  private lista = [];
  public promedio = 0;
  constructor( @Inject(MAT_DIALOG_DATA) public niveles:{
    'niveles': {
      'Tic-Excluido': [],
  'Tic-Basico': [],
  'Tic-Desarrollado': [],
  'Tic-Avanzado': [],
  'HiperTic': []
    },
    'promedio': number
  }) { }

  ngOnInit(): void {
    this.promedio = this.niveles['promedio'];
  }


  ngAfterViewInit(): void {
    const nivel1 = this.niveles['niveles']['Tic-Excluido'].slice(-1);
    const nivel2 = this.niveles['niveles']['Tic-Basico'].slice(-1);
    const nivel3 = this.niveles['niveles']['Tic-Desarrollado'].slice(-1);
    const nivel4 = this.niveles['niveles']['Tic-Avanzado'].slice(-1);
    const nivel5 = this.niveles['niveles']['HiperTic'].slice(-1);
    this.lista = [(nivel1.length == 0) ? 0 : nivel1[0], (nivel2.length == 0) ? 0 : nivel2[0], (nivel3.length == 0) ? 0 : nivel3[0], (nivel4.length == 0) ? 0 : nivel4[0], (nivel5.length == 0) ? 0 : nivel5[0]];
    console.log(this.lista);
    console.log(nivel1);
    console.log(nivel2);
    console.log(nivel3);
    console.log(nivel4);

    this.graficarInfo();
  }

  graficarInfo(tipo: ChartType = 'bar') {
    const x = this.lista;
    const y = ["TIC Excluido", "TIC Básico", "TIC Desarrollado", "TIC Avanzado", "Hiper TIC"];

    
    this.chart = new Chart(this.grafico?.nativeElement, {
      options: {
        labels: x,
        title: {
          display: true,
          text: "Niveles del modelo de madurez de Transformación Digital",
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

}
