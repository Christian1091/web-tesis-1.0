import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChartType } from 'chart.js';
import Chart from 'chart.js';
import { CuestionarioService } from '../services/cuestionario.service';
import { ProvinciasService } from '../services/provincias.service';
import { Provincias } from '../interfaces/provincias.interfaces';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

  @ViewChild('grafico') grafico?: ElementRef;
  public chart: any;
  public provinciaParticipante = '';
  public provincias: Provincias[];
  public empresas: string[] = [];
  public parametros: string[] = [];
  public parametro: string = "";
  public tipos: string[] = [];
  public empresa: string = "";
  public empresat: string = "";
  public tipo: string = "";
  public total: number = 0;
  public resultados: number[] = [];
  public n1: number = 0;
  public n2: number = 0;
  public n3: number = 0;
  public n4: number = 0;
  public n5: number = 0;
  constructor(private service: CuestionarioService, private provinciaService: ProvinciasService) {
    
  }

  initParametros() {
    this.empresas = [];
    this.parametros = [];
    this.tipos = [];
    this.provincias = [];
    this.empresas = [];
    this.parametros = ["General"];
    this.tipos = [];
    this.provinciaService.getProvincias().subscribe((res: any) => {
      this.provincias = res;
    });
    this.service.obtenerEmpresas().subscribe(res => {
      const emp: string[] = res['empresas'];
      emp.map(e => this.empresas.push(e['nombre']));
    });
    this.service.obtenerTipoPersonas().subscribe(res => {
      const tip: string[] = res['tiposPersonas'];
      tip.map(e => this.tipos.push(e['tipo']));

    });
  }

  limpiar() {
    this.n1 = 0;
    this.n2 = 0;
    this.n3 = 0;
    this.n4 = 0;
    this.n5 = 0;
    this.resultados = [];
  }

  cambiarTab() {
    this.provinciaParticipante = "";
    this.empresa = "";
    this.tipo = "";
    this.empresat = "";
    this.parametro = "";
    if (this.chart != null || this.chart != undefined) {
      this.chart.destroy();
    }
    
  }

  obtenerEmpresa(value: string) {
    this.limpiar();
    this.empresa = value;
    if (this.chart != null || this.chart != undefined) {
      this.chart.destroy();
    }
    this.service.getListEstadisticaGeneralInstitucion(this.empresa).subscribe(res => {
      this.resultados = res["datos"]["resultados"];
      if (this.resultados.length > 0) {
        this.calculosMm();
        
        this.graficarInfo();
      }
    });
  }

  obtenerGeneral(value: string) {
    this.limpiar();
    this.parametro = value;
    if (this.chart != null || this.chart != undefined) {
      this.chart.destroy();
    }
    this.service.getListEstadisticaGeneralGeneral().subscribe(res => {

      this.resultados = res["datos"]["resultados"];
      console.log(this.resultados);
      
      if (this.resultados.length > 0) {
        this.calculosMm();
        
        this.graficarInfo();
      }
    });
  }

  obtenerEmpresaTipo(estado: boolean) {
    this.limpiar();
    if (estado) {
      this.tipo = "";
    }
    if (this.empresat !== "" && this.tipo !== "") {
      if (this.chart != null || this.chart != undefined) {
        this.chart.destroy();
      }
      this.service.getListEstadisticaGeneralInstitucionTipo(this.empresat, this.tipo).subscribe(res => {
        this.resultados = res["datos"]["resultados"];
        if (this.resultados.length > 0) {
          this.calculosMm();
          this.graficarInfo();
        }
      });
    }
  }

  ngOnInit(): void {
    this.initParametros();
  }

  graficarInfo(tipo: ChartType = 'polarArea') {
    
    const x = [this.n1, this.n2, this.n3, this.n4 ,this.n5];
    const y = ["Nivel 1", "Nivel 2", "Nivel 3", "Nivel 4", "Nivel 5"];
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
          backgroundColor: ['#2ecc71', '#E1755D', '#ECE20F', '#200FEC', '#D50FEC'],
          data: x,
          label: y,
        }]
      }
    });
  }

  onSelect(id) {
    this.limpiar();
    if (this.chart != null || this.chart != undefined) {
      this.chart.destroy();
    }
    this.provinciaParticipante = id;
    this.service.getListEstadisticaGeneralProvinvia(this.provinciaParticipante).subscribe(res => {
      this.resultados = res["datos"]["resultados"];
      if (this.resultados.length > 0) {
        this.calculosMm();
        
        this.graficarInfo();
      }
    });
  }

  calculosMm() {
    this.resultados.forEach(res => {
      if (res >= 0 && res <= 12) {
        this.n1++;
			} else if (res >= 13 && res <= 30) {
        this.n2++;
        
			} else if (res >= 31 && res <= 55) {
        this.n3++;
        
			} else if (res >= 56 && res <= 75) {
        this.n4++;
        
			} else if (res >= 76 && res <= 100) {
        this.n5++;
			}
    }); 
  }

}

type tipoGeneral = {
  "ok": boolean,
  "datos": {
    "provincia": string,
    "total": number
  }
};