import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChartType } from 'chart.js';
import Chart from 'chart.js';
import { CuestionarioService } from '../services/cuestionario.service';
import { ProvinciasService } from '../services/provincias.service';
import { Provincias } from '../interfaces/provincias.interfaces';
import { RespuestaCuestionarioService } from '../services/respuesta-cuestionario.service';
import { MatTabChangeEvent } from '@angular/material/tabs';

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
  public isEmpty: boolean = false;
  public cargango: boolean = false;
  constructor(private service: CuestionarioService, private provinciaService: ProvinciasService, private crService: RespuestaCuestionarioService) {
    
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

  cambiarTab(tabChangeEvent: MatTabChangeEvent) {
    this.provinciaParticipante = "";
    this.empresa = "";
    this.tipo = "";
    this.empresat = "";
    this.parametro = "";
    if (this.chart != null || this.chart != undefined) {
      this.chart.destroy();
    }
    if (tabChangeEvent.index == 4) {
      this.estadisticasGeneralesMMtd();
    }
    
  }

  obtenerEmpresa(value: string) {
    this.limpiar();
    this.empresa = value;
    if (this.chart != null || this.chart != undefined) {
      this.chart.destroy();
    }
    this.cargango = true;
    this.service.getListEstadisticaGeneralInstitucion(this.empresa).subscribe(res => {
      this.resultados = res["datos"]["resultados"];
      if (this.resultados.length > 0) {
        this.isEmpty = false;
        this.calculosMm();
        this.graficarInfo();
        this.cargango = false;
      } else {
        this.isEmpty = true;
        this.cargango = false;
      }
    });
  }

  obtenerGeneral(value: string) {
    this.limpiar();
    this.parametro = value;
    if (this.chart != null || this.chart != undefined) {
      this.chart.destroy();
    }
    this.cargango = true;
    this.service.getListEstadisticaGeneralGeneral().subscribe(res => {
      this.resultados = res["datos"]["resultados"];
      if (this.resultados.length > 0) {
        this.isEmpty = false;
        this.calculosMm();
        this.graficarInfo();
        this.cargango = false;
      } else {
        this.isEmpty = true;
        this.cargango = false;
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
      this.cargango = true;
      this.service.getListEstadisticaGeneralInstitucionTipo(this.empresat, this.tipo).subscribe(res => {
        this.resultados = res["datos"]["resultados"];
        if (this.resultados.length > 0) {
          this.isEmpty = false;
          this.calculosMm();
          this.graficarInfo();
          this.cargango = false;
        } else {
          this.isEmpty = true;
          this.cargango = false;
        }
      });
    }
  }

  ngOnInit(): void {
    this.initParametros();
  }

  estadisticasGeneralesMMtd() {
    this.cargango = true;
    const sumas: [] = [];
    this.crService.getRespuestaByIdCuestionario("6282675f33cbba25705fa3d2").subscribe(res => {
      const data: [] = res as [];
      const s = res[0]["listRespuestasUsuario"] as [];
      const size = s.length;
      let contador = 0;
      let suma = 0;
      const resultados = [];
      data.map(res => {
        const respuesta = res["listRespuestasUsuario"][contador];
        const titulo = respuesta["area"];
        suma += Number(respuesta["puntosObtenidos"]);
        const body = {
          "titulo": titulo,
          "total": suma
        }
        // if (resultados.length > 0) {
          
        //   if (resultados[resultados.length-1]["titulo"] == titulo) {
        //       resultados[resultados.length-1]["total"] += suma;
        //   } else {
        //     resultados.push(body);
        //   }
        // } else {
          
        // }
        resultados.push(body);
        contador += 1;
        
        if (contador == 32) {
          contador = 0;
        }
      });
      const p = resultados.length;
      
      const x = ["Ciudad Universitaria", "Infraestructura TIC", "Administración", "Docencia", "Investigación y transferencia ", "Marketing", "Comunicación", "Gobierno de la Transformación Digital"];
      const y = [0, 0, 0, 0, 0, 0, 0, 0]
      resultados.map(v => {
        if (v["titulo"] === "Ciudad Universitaria") {
          if (y[0] < v["total"]) {
            y[0] += v["total"];
          }
        }
        if (v["titulo"] === "Infraestructura TIC") {
          if (y[1] < v["total"]) {
            y[1] += v["total"];
          }
        }
        if (v["titulo"] === "Administración") {
          if (y[2] < v["total"]) {
            y[2] += v["total"];
          }
        }
        if (v["titulo"] === "Docencia") {
          if (y[3] < v["total"]) {
            y[3] += v["total"];
          }
        }
        if (v["titulo"] === "Investigación y transferencia ") {
          if (y[4] < v["total"]) {
            y[4] += v["total"];
          }
        }
        if (v["titulo"] === "Marketing") {
          if (y[5] < v["total"]) {
            y[5] += v["total"];
          }
        }
        if (v["titulo"] === "Comunicación") {
          if (y[6] < v["total"]) {
            y[6] += v["total"];
          }
        }
        if (v["titulo"] === "Gobierno de la Transformación Digital") {
          if (y[7] < v["total"]) {
            y[7] += v["total"];
          }
        }
      });
      console.log(y);
      
      for(let i = 0; i < y.length; i++) {
        y[i] = Number(((y[i] * 100) / p).toFixed(0));
      }
      
      this.graficarInfoMmtd(x, y);
    });
  }

  graficarInfoMmtd(y:string[], x:number[], tipo: ChartType = 'bar') {
    this.cargango = false;
    y.push("");
    y.push("");
    x.push(100);
    x.push(0);
    if (this.chart != null || this.chart != undefined) {
      this.chart.destroy();
    }
    this.chart = new Chart(this.grafico?.nativeElement, {
      options: {
        animations: {
          tension: {
            duration: 0,
            easing: 'linear',
            from: 100,
            to: 0,
            loop: false
          }
        },
        labels: y,
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
          backgroundColor: ['#2ecc71', '#E1755D', '#ECE20F', '#de9e31', '#D50FEC','#2ecc71', '#E1755D', '#ECE20F', "#ffffff00"],
          data: x,
        }]
      }
    });
  }


  graficarInfo(tipo: ChartType = 'pie') {
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
          backgroundColor: ['#2ecc71', '#E1755D', '#ECE20F', '#de9e31', '#D50FEC'],
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
    this.cargango = true;
    this.service.getListEstadisticaGeneralProvinvia(this.provinciaParticipante).subscribe(res => {
      this.resultados = res["datos"]["resultados"];
      if (this.resultados.length > 0) {
        this.cargango = false;
        this.isEmpty = false;
        this.calculosMm();
        this.graficarInfo();
      } else {
        this.cargango = false;
        this.isEmpty = true;
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