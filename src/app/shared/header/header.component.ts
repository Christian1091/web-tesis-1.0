import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'



  ]
})
export class HeaderComponent {

  /**
   * Instanciamos nuestro modelo para llamar a nuestros atributos
   * en este caso la imagen y el nombre en el html
   */
  public usuario: Usuario;

  // Inyectamos nuestro servicio para llamar al logout
  constructor(private usuarioService: UsuarioService,
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
    //console.log(termino);
    this.router.navigateByUrl(`/dashboard/buscar/${termino}`);
  }
}
