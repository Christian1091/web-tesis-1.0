import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [
    './navbar.component.css'
  ]
})
export class NavbarComponent implements OnInit {

  public isLoggedIn: boolean = false;

  constructor(private usuarioService: UsuarioService) {
    this.isLoggedIn = usuarioService.existeToken();
   }

  ngOnInit(): void {
  }
  regresar() {
    window.location.href = "/web#team";
    
  }

}
