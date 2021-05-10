import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

import { SidebarService } from '../../services/sidebar.service'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  /**
   * Instanciamos nuestro modelo para llamar a nuestros atributos
   * en este caso la imagen y el nombre en el html
   */
  public usuario: Usuario;

  constructor( public sidebarService: SidebarService,
               private usuarioService: UsuarioService) {
    //console.log(this.menuItems);

    this.usuario = usuarioService.usuario;

   }

}
