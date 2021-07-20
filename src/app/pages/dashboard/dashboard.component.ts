import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PostService } from 'src/app/services/post.service';

import Swal from 'sweetalert2';
import { Post } from 'src/app/models/post.model';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './dashboard.component.css',
  ]
})
export class DashboardComponent implements OnInit{

   public id: string;

   cont_post: any = {};
  /** Fin Obtener contenido cuestioanrio */

  /**Para obtener nuestros datos en las etiquetas
   * del fomrulario de editar perfil
   */
  public usuario: Usuario;

  //public post: Post;

  /**Creamos una propiedad para subir la imagen */
  public imagenSubir: File;

  public imgTemp: any = null;

  public posts: Post[] = [];

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private postService: PostService,
               private fileUploadService: FileUploadService,
               private router: Router,
               private activatedRoute: ActivatedRoute) {

    this.usuario = usuarioService.usuario;
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {

    this.cargarListPostByIdUser();
  }

  cargarListPostByIdUser() {
    //this.cargando = true;
    this.postService.getListPostByIdUser()
                            .subscribe( ({ post }) => {
                              this.posts = post;
                              //console.log(post)
                              //this.cargando = false;
                            })

  }

  verContenidoPost(post: Post) {
    console.log('ID POST ' + post._id);
    this.postService.getVerContenidoPost( post._id )
                            .subscribe ( data => {
                                //console.log(data);
                                this.cont_post = data;
                                Swal.fire({
                                  //icon: 'error',
                                  title: `${ post.titulo }`,
                                  text: `${ post.texto }`,

                                })
                                //console.log(Object.values(data));
                                //this.cuestionario = Object.values(data);
                              }, error => {
                                console.log(error);
                              }
                            )

  }

  eliminarPost( post: Post ) {
    //console.log(cuestionario)
    Swal.fire({
      title: '¿Eliminar post?',
      text: `Esta a punto de eliminar a ${ post.titulo }`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.postService.eliminarPost( post._id )
            .subscribe( resp => {
              /**Para refrescar la tabla despues de haber eliminado el usuario */
              this.cargarListPostByIdUser();
              Swal.fire(
              'Cuestionario borrado',
              `${ post.titulo } Fue eliminado exitosamente!`,
              'success');
            });
          }
    })
  }

}
