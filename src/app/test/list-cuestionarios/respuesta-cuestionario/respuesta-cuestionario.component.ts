import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';

export interface Pre {
  listRespuesta: [],
  tituloPregunta: string,
  puntosObtenidos: number,
  indexRespuestaSeleccionada: [],
  puntajePregunta: number
  

}

@Component({
  selector: 'app-respuesta-cuestionario',
  templateUrl: './respuesta-cuestionario.component.html',
  styleUrls: [
    './respuesta-cuestionario.component.css'
  ]
})
export class RespuestaCuestionarioComponent implements OnInit {
  public puntaje: number = 0 ;
  public id: string;
  public respuestaCuestionario: any;
  public rutaAnterior = '';
  public titulo: string = "";
  public nombre: string = "";
  public puntos: string = "";
  public rs = [];
  public correo: string = "";
  public institucionParticipante: String = "";
  public provinciaParticipante: string = "";
  public ciudadParticipante: string = "";
  public puntajeCuest: string = ""; 


  constructor(private respuestaUsuarioService: RespuestaCuestionarioService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.rutaAnterior = this.activatedRoute.snapshot.url[0].path;
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
  }



  ngOnInit(): void {
    this.obtenerRespuestaUsuario();
  }

  public downloadAsPDF(div_id) {

    let data = document.getElementById(div_id);
    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('l', 'cm', 'a4');
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);

      pdf.save('cuestionario.pdf');
    });
  }

  async downloadAsPDF1() {
    let evaluacion: string = "";
    const puntos = Number.parseInt(this.puntajeCuest);
    console.log(this.puntajeCuest, "puntaje cues");
    
    if (puntos >= 0 && puntos < 12) {
      evaluacion = "1 - TIC Excluido";
    } else if (puntos > 12 && puntos < 31) {
      evaluacion = "2 - TIC Básico";
    } else if (puntos > 30 && puntos < 56) {
      evaluacion = "3 - TIC Desarrollado";
    } else if (puntos > 55 && puntos < 76) {
      evaluacion = "4 - TIC Avanzado";
    } else if (puntos > 75 && puntos < 101) {
      evaluacion = "5 - Hiper TIC";
    }
    const info = {
      content: [
        {
          image: await this.getBase64ImageFromURL(
            "https://upload.wikimedia.org/wikipedia/commons/b/b0/Logo_Universidad_Polit%C3%A9cnica_Salesiana_del_Ecuador.png"

          ),
          width: 300,
          alignment: 'center',
        },
        {
          text: this.titulo,
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          columns: [

            [{
              text: "Usuario: " + this.nombre,
              style: 'name',

            },
            {
              text: "Correo: " + this.correo,
            },
            {
              text: "Institución: " + this.institucionParticipante,
            },
            {
              text: "Provincia: " + this.provinciaParticipante,

              color: 'blue',
            },
            {
              text: "Cantón: " + this.ciudadParticipante,

              color: 'blue',
            },
            {
              text: "Puntos: " + this.puntajeCuest,
              color: 'red',
            },
            {
              text: "Nivel MM: " + evaluacion,
              color: 'red',
            },
            ]
          ]
        },
        {
          text: 'Resultados',
          style: 'header',
          table: {

            widths: ['*', '*'],
            body: [
              [{
                text: 'Pregunta',
                style: 'tableHeader',
                width: '80%',
              },
              {
                text: 'Puntos',
                style: 'tableHeader',
                width: '20%',
              },
              ],
              ...this.rs.map(ed => {
                return [ed.tituloPregunta, Number.parseFloat(ed.puntosObtenidos.toString()).toFixed(2)];
              })
            ]
          },
        }
      ],
      info: {
        title: this.nombre + 'Usuario',
        author: this.nombre,
        subject: 'RESUME',
        keywords: 'RESUME, ONLINE RESUME',
      },
      styles: {
        header: {
          fontSize: 14,
          bold: false,
          margin: [0, 20, 0, 10],
        },

        name: {
          fontSize: 16,
          bold: true
        },
        jobTitle: {
          fontSize: 14,
          bold: true,
          italics: true
        },
        sign: {
          margin: [0, 50, 0, 10],
          alignment: 'right',
          italics: true
        },
        tableHeader: {
          bold: true,
        }
      }
    };


    pdfMake.createPdf(info).open();
  }

  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });
  }


  obtenerRespuestaUsuario() {

    this.rs = [];
    this.respuestaUsuarioService.getRespuestaUsuario(this.id).subscribe(resp => {

      const r = resp[0]['listRespuestasUsuario'];
      this.puntaje = Number.parseInt(resp[1].toString());
      console.log(resp[1])

      r.forEach(res => {
        let suma = 0;
        const indices: [] = res["indexRespuestaSeleccionada"];
        indices.map(indice => {
          suma += Number.parseFloat(res["listRespuesta"][indice].puntosRespuesta.toString())
          console.log(res["listRespuesta"][indice].puntosRespuesta.toString());
        });
        
        let pre: Pre = {
          tituloPregunta: res["tituloPregunta"],
          listRespuesta: res["listRespuesta"] as [],
          indexRespuestaSeleccionada: res["indexRespuestaSeleccionada"],  
          puntosObtenidos: suma,
          puntajePregunta: res["puntajePregunta"]
        };
        
        this.rs.push(pre);
        suma = 0;
      });
      this.nombre = resp[0]["nombreParticipante"];
      this.titulo = resp[0]["nombre"];
      this.correo = resp[0]["correoParticipante"];
      this.puntos = resp[0]["puntosTotales"].toString();
      this.institucionParticipante = resp[0]["institucionParticipante"];
      this.provinciaParticipante = resp[0]["provinciaParticipante"];
      this.ciudadParticipante = resp[0]["ciudadParticipante"];
      this.respuestaCuestionario = resp[0];
      this.puntajeCuest = ((Number.parseInt(this.puntos) * 100 ) / this.puntaje).toString();

      
    });
  }

  volver() {

    if (this.rutaAnterior === 'respuestaUsuarioAdmin') {
      console.log(this.respuestaCuestionario.cuestionarioId)
      this.router.navigateByUrl(`/dashboard/estadisticas/${this.respuestaCuestionario.cuestionarioId}`);
    } else {
      this.router.navigateByUrl('/');

    }
  }

}
