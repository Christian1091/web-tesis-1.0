import { Component, OnInit, Inject } from '@angular/core';
import { Noticia } from '../../models/noticia.model';
import { NoticiasService } from '../../services/noticias.service';
import { PostService } from '../../services/post.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nueva-noticia',
  templateUrl: './nueva-noticia.component.html',
  styleUrls: ['./nueva-noticia.component.css']
})
export class NuevaNoticiaComponent implements OnInit {

  public noticia: Noticia = new Noticia();
  public actualizar: boolean = false;
  public fileName = '';
  public formData = new FormData();
  public file: File;
  subscriptions: Subscription[] = [];

  constructor(private noticiaService: PostService, @Inject(MAT_DIALOG_DATA) public data: Noticia, public dialogRef: MatDialogRef<DashboardComponent>) {
    if (data != null || data != undefined) {
      this.noticia = data;
      this.actualizar = true;
    }
    console.log(this.noticia);
    
  }

  ngOnInit(): void {
  }


  guardar() {
    let nombreImagen: string = "";
    this.noticia.titulo.trim();
    this.noticia.descripcion.trim();
    this.noticia.texto.trim();
    if (this.actualizar) {
      console.log("actualizando la noticia");
      if (this.file) {
        const searchUploadI = this.noticiaService.uploadImage(this.file).subscribe(response => {
          const estado = response['ok'] as boolean;
          if (estado) {
            nombreImagen = response['nombreArchivo'];
            console.log(response);
            if (this.noticia.titulo.length > 0 && this.noticia.descripcion.length > 0 && this.noticia.texto.length > 0) {
              this.noticia.nombreImagen = nombreImagen;
              const searchActualizarN = this.noticiaService.actualizarNoticia(this.noticia).subscribe(response => {
                this.dialogRef.close(true);
              });
              this.subscriptions.push(searchActualizarN);
            }
          }
        });
        this.subscriptions.push(searchUploadI);
      } else {
        if (this.noticia.titulo.length > 0 && this.noticia.descripcion.length > 0 && this.noticia.texto.length > 0) {
          const searchActualizarN = this.noticiaService.actualizarNoticia(this.noticia).subscribe(response => {
            this.dialogRef.close(true);
          });
          this.subscriptions.push(searchActualizarN);
        }
      }
    } else {
      console.log("creandoo una nueva noticia");
      if (this.file) {
        const searchUploadI = this.noticiaService.uploadImage(this.file).subscribe(response => {
          const estado = response['ok'] as boolean;
          if (estado) {
            nombreImagen = response['nombreArchivo'];
            if (this.noticia.titulo.length > 0 && this.noticia.descripcion.length > 0 && this.noticia.texto.length > 0) {
              const searchCrearN = this.noticiaService.crearNoticia({ titulo: this.noticia.titulo, descripcion: this.noticia.descripcion, texto: this.noticia.texto, nombreImagen: nombreImagen }).subscribe(response => {
                this.dialogRef.close(true);
              });
              this.subscriptions.push(searchCrearN);
            }
          }
          this.subscriptions.push(searchUploadI);
        });
      }
    }
  }

  onFileSelected(event) {
    this.file = event.target.files[0];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(res => {
      res.unsubscribe();
    });
  }
}
