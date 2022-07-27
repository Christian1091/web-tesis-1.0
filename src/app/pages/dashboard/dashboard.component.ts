import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PostService } from 'src/app/services/post.service';

import Swal from 'sweetalert2';
import { Post } from 'src/app/models/post.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { VerPostComponent } from './ver-post/ver-post.component';
import { NuevaNoticiaComponent } from '../../noticia/nueva-noticia/nueva-noticia.component';
import { Noticia } from '../../models/noticia.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './dashboard.component.css',
  ]
})
export class DashboardComponent implements OnInit {

  public id: string;
  cont_post: any = {};
  public usuario: Usuario;
  public cambiar: boolean = true;
  public opcion: number = 0;
  public imagenSubir: File;
  public imgTemp: any = null;
  public posts: Post[] = [];
  public noticias: Noticia[] = [];
  subscriptions: Subscription [] = [];

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private postService: PostService,
    private fileUploadService: FileUploadService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute) {

    this.usuario = usuarioService.usuario;
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    this.cargarNoticia();
    this.cargarListPostByIdUser();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NuevaNoticiaComponent, {
      width: '450px'
    });
    const searchAfter = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarNoticia();        
      }
    });
    this.subscriptions.push(searchAfter);
  }

  openDialogEditarNoticia(noticia: Noticia) {
    const dialogRef = this.dialog.open(NuevaNoticiaComponent, {
      width: '450px',
      data: noticia
    });
    const searchAfterClosed = dialogRef.afterClosed().subscribe(result => {
    });
    this.subscriptions.push(searchAfterClosed);
  }

  cargarListPostByIdUser() {
    //this.cargando = true;
    const searchListPostBIU = this.postService.getListPostByIdUser()
      .subscribe(({ post }) => {
        this.posts = post;
      //this.cargando = false;
      });
      this.subscriptions.push(searchListPostBIU);
  }

  cargarNoticia() {
    this.noticias = []; 
    const searchListNoticias = this.postService.getListNoticias().subscribe(response => {
      this.noticias = response['noticias'];
    });
    this.subscriptions.push(searchListNoticias);
  }

  verContenidoPost(post: Post) {
    const dialog = this.dialog.open(VerPostComponent, {
      width: '100%',
      height: '95%',
      data: post,
      panelClass: 'my-dialog',
      disableClose: false
    });
  }

  eliminarPost(post: Post) {
    Swal.fire({
      title: '¿Eliminar post?',
      text: `Esta a punto de eliminar a ${post.titulo}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        const searchEliminarPost = this.postService.eliminarPost(post._id)
          .subscribe(resp => {
            /**Para refrescar la tabla despues de haber eliminado el usuario */
            this.cargarListPostByIdUser();
            Swal.fire(
              'Post eliminado',
              `${post.titulo} Fue eliminado exitosamente!`,
              'success');
          });
          this.subscriptions.push(searchEliminarPost);
      }
    })
  }
  opcionTab(event) {
    this.opcion = event.index;
  }
  ngOnDestroy() {
    this.subscriptions.forEach(res => {
      res.unsubscribe();
    });
  }
}
