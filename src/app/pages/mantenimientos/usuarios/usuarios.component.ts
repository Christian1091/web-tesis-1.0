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
  styleUrls: [
    './usuarios.component.css'
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  /**Vamos a extraer dos propiedades */
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;
  subscriptions: Subscription[] = [];

  constructor(private usuarioService: UsuarioService,
    private busquedasServicio: BusquedasService,
    private modalImagenService: ModalImagenService) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(e => {
      e.unsubscribe();
    });
  }

  ngOnInit(): void {
    this.cargarUsuarios();

    /**Aqui va cargar la vista actual de la imagen */
    const searchNuevaImagen = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe(img => {
        this.cargarUsuarios()
      });
    this.subscriptions.push(searchNuevaImagen);
  }

  cargarUsuarios() {
    this.cargando = true;
    const searchCargarUsuarios = this.usuarioService.cargarUsuarios(this.desde)
      .subscribe(({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      });
    this.subscriptions.push(searchCargarUsuarios);
  }

  cambiarPagina(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;

    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }

    this.cargarUsuarios();
  }

  buscar(termino: string) {

    if (termino.length === 0) {
      return this.usuarios = this.usuariosTemp;

    }
    const searchBuscar = this.busquedasServicio.buscar('usuarios', termino)
      .subscribe(resultado => {
        this.usuarios = resultado;
      });
    this.subscriptions.push(searchBuscar);
  }

  eliminarUsuario(usuario: Usuario) {

    /**Validacion par no eliminarnos nosotros mismos */
    if (usuario.uid === this.usuarioService.uid) {
      return Swal.fire('Error', 'Este usuario no pueder ser eliminado', 'error');
    }
    Swal.fire({
      title: '¿Eliminar usuario?',
      text: `Esta a punto de eliminar a ${usuario.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
       const searchEliminarUsuario = this.usuarioService.eliminarUsuario(usuario)
          .subscribe(resp => {
            /**Para refrescar la tabla despues de haber eliminado el usuario */
            this.cargarUsuarios();
            Swal.fire(
              'Usuario borrado',
              `${usuario.nombre} Fue eliminado exitosamente!`,
              'success');
          });
          this.subscriptions.push(searchEliminarUsuario);
      }
    })
  }

  cambiarRole(usuario: Usuario) {

    const searchGuardarUsuario = this.usuarioService.guardarUsuario(usuario)
      .subscribe(resp => {
      });
      this.subscriptions.push(searchGuardarUsuario);
  }

  abrirModal(usuario: Usuario) {
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
  }
}
