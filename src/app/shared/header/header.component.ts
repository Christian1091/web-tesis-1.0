import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SidebarService } from '../../services/sidebar.service';
import { Subscription } from 'rxjs';
import {PanelMenuModule} from 'primeng/panelmenu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'
  ]
})
export class HeaderComponent {


 
  display;
  public usuario: Usuario;
  
  constructor(public sidebarService: SidebarService, private usuarioService: UsuarioService,
    private router: Router) {
      
    this.usuario = usuarioService.usuario;
  }

  logout() {
    this.usuarioService.logout();
  }

  buscar(termino: string) {

    if (termino.length === 0) {
      //this.router.navigateByUrl('/dashboard');
      return;
    }
    this.router.navigateByUrl(`/dashboard/buscar/${termino}`);
  }
}
