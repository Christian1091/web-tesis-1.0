import { Component, OnInit } from '@angular/core';
import { Noticia } from '../../models/noticia.model';
import { NoticiasService } from '../../services/noticias.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-nueva-noticia',
  templateUrl: './nueva-noticia.component.html',
  styleUrls: ['./nueva-noticia.component.css']
})
export class NuevaNoticiaComponent implements OnInit {

  public noticia: Noticia = new Noticia();

  public fileName = '';
  public formData = new FormData();
  public file: File;

  constructor(private noticiaService: PostService) { }

  ngOnInit(): void {
  }


  guardar() {
    let nombreImagen: string = "";
    this.noticia.titulo.trim();
    this.noticia.descripcion.trim();
    this.noticia.texto.trim();
    if (this.file) {
      console.log(this.file);
      this.noticiaService.uploadImage(this.file).subscribe(response => {
        const estado = response['ok'] as boolean;
        if (estado) {
          nombreImagen = response['nombreArchivo'];
          if (this.noticia.titulo.length > 0 && this.noticia.descripcion.length > 0 && this.noticia.texto.length > 0) {
            this.noticiaService.crearNoticia({ titulo: this.noticia.titulo, descripcion: this.noticia.descripcion, texto: this.noticia.texto, nombreImagen: nombreImagen }).subscribe(response => {
              console.log(response);
            });
          }
        }
      });
    }
  }

  onFileSelected(event) {
    this.file = event.target.files[0];


  }

}
