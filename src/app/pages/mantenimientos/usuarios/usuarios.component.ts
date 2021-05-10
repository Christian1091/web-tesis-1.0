import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { Usuario } from 'src/app/models/usuario.model';

import { UsuarioService } from 'src/app/services/usuario.service';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  /**Vamos a extraer dos propiedades */
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];

  public imgSubs: Subscription;
  /**Creamos una variable para saber cuale es la pagina actual */
  public desde: number = 0;

  public cargando: boolean =true;

  constructor( private usuarioService: UsuarioService,
                private busquedasServicio: BusquedasService,
                private modalImagenService: ModalImagenService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();

    /**Aqui va cargar la vista actual de la imagen */
    this.imgSubs = this.modalImagenService.nuevaImagen
        .pipe( delay(100) )
        .subscribe( img => {
          this.cargarUsuarios()
      });
  }

  cargarUsuarios(){
    this.cargando = true;
    this.usuarioService.cargarUsuarios( this.desde )
    /**Destructuramos y extraemos */
        .subscribe( ({ total, usuarios }) => {
          this.totalUsuarios = total;
          this.usuarios = usuarios;
          this.usuariosTemp = usuarios;
          this.cargando = false;
        })
  }

  cambiarPagina( valor: number ) {
    this.desde += valor;

    if ( this.desde < 0 ) {
      this.desde = 0;

    } else if ( this.desde >= this.totalUsuarios ) {
      this.desde -= valor;
    }

    this.cargarUsuarios();
  }

  buscar( termino: string ) {

    if ( termino.length === 0 ) {
      return this.usuarios = this.usuariosTemp;

    }
    //console.log(termino);
    this.busquedasServicio.buscar( 'usuarios', termino )
        .subscribe( resultado => {
          this.usuarios = resultado;
        });

  }

  eliminarUsuario( usuario: Usuario){

    /**Validacion par no eliminarnos nosotros mismos */
    if ( usuario.uid === this.usuarioService.uid ) {
      return Swal.fire('Error', 'Este usuario no pueder ser eliminado', 'error');
    }
    //console.log('ID del usuario: => ' + usuario.uid);
    //console.log('ID del usuario: => ' + this.usuarioService.uid);
    //console.log(usuario);
    //console.log('Usuario Service: => ' + this.usuarioService.eliminarUsuario( usuario ));
    Swal.fire({
      title: '¿Eliminar usuario?',
      text: `Esta a punto de eliminar a ${ usuario.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario( usuario )
            .subscribe( resp => {
              /**Para refrescar la tabla despues de haber eliminado el usuario */
              this.cargarUsuarios();
              Swal.fire(
              'Usuario borrado',
              `${ usuario.nombre } Fue eliminado exitosamente!`,
              'success');
            });
          }
    })
  }

  cambiarRole( usuario: Usuario ) {
    //console.log(usuario);
    this.usuarioService.guardarUsuario( usuario )
        .subscribe( resp => {
          console.log(resp);

        });

  }

  abrirModal( usuario: Usuario ) {
    console.log(usuario);
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
  }

}
