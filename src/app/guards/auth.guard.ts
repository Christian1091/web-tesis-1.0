import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  /**Si el token no es valido entonces debemos sacarlo al usuario de esa
   * pantalla, para ello vamos a ocupar el Router
   */
  constructor( private usuarioService: UsuarioService,
               private router: Router){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    return this.usuarioService.validarToken()
      .pipe(
        tap( estaAutenticado => {
          // Si no esta autenticado
          if ( !estaAutenticado ) {
            this.router.navigateByUrl('/web');
          }

        })
      );
  }

}
