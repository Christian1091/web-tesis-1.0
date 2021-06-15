import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PostService } from 'src/app/services/post.service';

import Swal from 'sweetalert2';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './dashboard.component.css',
  ]
})
export class DashboardComponent implements OnInit{

   // Definimos el formulario
   public postForm = this.fb.group({

    /**Si es que queremos una sola validacion podemos quitar los corchetes, si son mas van dentro de ellos */
    titulo:['', [ Validators.required]],
    descripcion: ['', [ Validators.required]],
    texto: ['', Validators.required]
  })


  /**Para obtener nuestros datos en las etiquetas
   * del fomrulario de editar perfil
   */
  public usuario: Usuario;

  public post: Post;

  /**Creamos una propiedad para subir la imagen */
  public imagenSubir: File;

  public imgTemp: any = null;

  public posts: Post[] = [];

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private postService: PostService,
               private fileUploadService: FileUploadService) {

    this.usuario = usuarioService.usuario;

  }

  ngOnInit(): void {

    this.cargarListPostByIdUser();
  }

  cargarListPostByIdUser() {
    //this.cargando = true;
    this.postService.getListPostByIdUser()
                            .subscribe( ({ posts }) => {
                              this.posts = posts;
                              console.log(posts)
                              //this.cargando = false;
                            })

  }

  crearPost() {

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Post guardado',
      showConfirmButton: false,
      timer: 1500
    })
    console.log(this.postForm.value);
    this.postService.crearPost(this.postForm.value)
                      .subscribe( res => {
                        console.log('post creado');
                      },  err => {
                        Swal.fire('Error', err.error.msg, 'error');
                        console.log(err);
    });
    this.resetPostFormulario();
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

  actualizarPost() {
    console.log(this.postForm.value);
    this.postService.actulizarPost( this.postForm.value)
        .subscribe( resp => {
          //console.log(resp);
          /**Para que se me refresquen los cambios al actualizar
           * los datos
           */
          const { titulo, descripcion, texto } =  this.postForm.value;
          this.post.titulo = titulo;
          this.post.descripcion = descripcion;
          this.post.texto = texto;

          Swal.fire('Guardado', 'Cambios realizados', 'success')
        }, (err) => {
          Swal.fire('Error', err.error.msg, 'error')
          //console.log(err.error.msg)
        })

  }

  resetPostFormulario() {
    this.postForm.reset();
    //this.getRespuestasUnicas.clear();
  }

}
