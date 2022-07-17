import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: [
    './perfil.component.css'
  ]
})
export class PerfilComponent implements OnInit {

  /**Nos creamos un pequeno formulario */
  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;
  public subscriptions: Subscription [] = [];

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
    const searchActualizarPerfil = this.usuarioService.actulizarPerfil( this.perfilForm.value)
        .subscribe( resp => {
          const { email, nombre } =  this.perfilForm.value;
          this.usuario.nombre = nombre;
          this.usuario.email = email;

          Swal.fire('Guardado', 'Cambios realizados', 'success')
        }, (err) => {
          Swal.fire('Error', err.error.msg, 'error')
        });
        this.subscriptions.push(searchActualizarPerfil);
  }

  cambiarImagen( file: File ) {
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
    }
  }

  subirImagen() {
    this.fileUploadService
        .actualizarFoto( this.imagenSubir, 'usuarios', this.usuario.uid )
        .then( img => {
          this.usuario.img = img; // En este punto tengo la imagen si lo hace correctamente
          Swal.fire('Guardado', 'Imagen actualizada', 'success');
        }).catch ( err => {
          Swal.fire('Error', 'No s epudo subir la imagen', 'error');
        })
  }

  ngOnDestroy() {
    this.subscriptions.forEach(res => {
      res.unsubscribe();
    });
  }
}
