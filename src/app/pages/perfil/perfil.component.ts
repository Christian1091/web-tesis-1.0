import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';

import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  /**Nos creamos un pequeno formulario */
  public perfilForm: FormGroup;

  /**Para obtener nuestros datos en las etiquetas
   * del fomrulario de editar perfil
   */
  public usuario: Usuario;

  /**Creamos una propiedad para subir la imagen */
  public imagenSubir: File;

  public imgTemp: any = null;

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private fileUploadService: FileUploadService) {

    this.usuario = usuarioService.usuario;

  }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [ this.usuario.nombre, Validators.required ],
      email: [ this.usuario.email, [ Validators.required, Validators.email ] ],
    });
  }

  actualizarPerfil() {
    console.log(this.perfilForm.value);
    this.usuarioService.actulizarPerfil( this.perfilForm.value)
        .subscribe( resp => {
          //console.log(resp);
          /**Para que se me refresquen los cambios al actualizar
           * los datos
           */
          const { email, nombre } =  this.perfilForm.value;
          this.usuario.nombre = nombre;
          this.usuario.email = email;

          Swal.fire('Guardado', 'Cambios realizados', 'success')
        }, (err) => {
          Swal.fire('Error', err.error.msg, 'error')
          //console.log(err.error.msg)
        })

  }

  cambiarImagen( file: File ) {
    //console.log(file);
    this.imagenSubir = file;

    if ( !file ) {
      /*Aqui hace que la imagen muestre la que estaba anteriormnete
       *elejida si es que cancelamos al elegir la nueva imagen
      */
       return this.imgTemp = null;
     }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
      //console.log(reader.result);
    }
  }

  subirImagen() {
    this.fileUploadService
        .actualizarFoto( this.imagenSubir, 'usuarios', this.usuario.uid )
        .then( img => {
          this.usuario.img = img; // En este punto tengo la imagen si lo hace correctamente
          Swal.fire('Guardado', 'Imagen actualizada', 'success');
        }).catch ( err => {
          console.log(err);
          Swal.fire('Error', 'No s epudo subir la imagen', 'error');
        })
  }
}
