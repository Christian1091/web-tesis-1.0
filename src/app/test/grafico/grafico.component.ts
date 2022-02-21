import { Component, Inject, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChartType } from 'chart.js';
import Chart from 'chart.js';

@Component({
	selector: 'app-grafico',
	templateUrl: './grafico.component.html',
	styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit {
	@ViewChild('grafico') grafico?: ElementRef;
	public chart: any;
	constructor(@Inject(MAT_DIALOG_DATA) public info: {}) {

	}

	ngOnInit(): void {
	}

	ngAfterViewInit(): void {
		const x = [];
		const y = [];
		for (let i in this.info) {
			const prom = [];
			let suma = 0;
			console.log(i);
			x.push(i)

			this.info[i].map((valor: number) => {
				if(valor > 0) {
					prom.push(valor);
					suma += valor;
				}
			});
			const porcentaje = (prom.length*100)/ this.info[i].length;
			y.push(porcentaje)

		}
		y.push(0);
		this.graficarInfo(y, x);
		
	}

	graficarInfo(x: number[], y: string[], tipo: ChartType = 'bar',) {
		this.chart = new Chart(this.grafico?.nativeElement, {
			options: {
				labels: x,
				title: {
					display: true,
					text: "Niveles del modelo de madurez de Transformación Digital",
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

