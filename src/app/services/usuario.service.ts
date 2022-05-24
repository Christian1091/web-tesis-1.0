import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { catchError, map, tap } from 'rxjs/operators'; // Operador que nos permite disparar un efecto secundario
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

import { Usuario } from '../models/usuario.model';

// Aqui llamamos al url que creamos en el envairoment
const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;

  // Creamos una propiedad para almacenar la informacion del usuario
  public usuario: Usuario;

  constructor( private http: HttpClient,
               private router: Router,
               private ngZone: NgZone ) {

    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.usuario.role;
  }

  //Creamos un get para el uid del usuario
  get uid(): string {
    return this.usuario.uid || '';
  }

  /** Como ya estamo copiando mucho este codigo o utilizando
   * nos creamos un get
   */
  get headers() {
    return {
       // Ahora necesito los headers
       headers: {
        'x-token': this.token
      }
    }
  }

  googleInit() {

    return new Promise<void>( resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '170424484649-8jo680p9d6ptticv8a5tkd9ef9o6jfpi.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });

    })

  }

  /**Creamos metodo del localstorage para no estar copiando y pegando */
  guardarLocalStorage( token: string, menu: any ) {
    localStorage.setItem('token', token );
    //Menu - el menu pasamos por JSON.stringify para pasarlo a string
    localStorage.setItem('menu', JSON.stringify( menu ) );
  }

  logout() {
    // Primero vamos a borrar el token
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    
    this.auth2.signOut().then(() => {

      this.ngZone.run(() => {
        this.router.navigateByUrl('/web');
       
      })
    });
    this.router.navigateByUrl('/web');

  }

  /**Para proteger las rutas */
  validarToken(): Observable<boolean> {

    /**Ahora hacemos la petincion a nuestro backend */
    return this.http.get(`${ base_url }/login/renew`, {
      // Ahora necesito los headers
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( ( resp: any) => {
        

        // Destructuramos o extraemos las propiedades del objeto usuario
        const { email, google, nombre, role, img = '', uid } = resp.usuario;

        // Creamos neustra intancia del usuario e inicializamos
        this.usuario = new Usuario( nombre, email, '', img, google, role, uid);

        this.guardarLocalStorage( resp.token, resp.menu );
        return true;

      }),

      /**El catchError atrapa el error que sucede en todo el flujo
       * del return this.http.get(`${ base_url }/login/renew`
       */
      catchError( error => of( false ))
    );
  }

  crearUsuario( formData: RegisterForm) {

    return this.http.post(`${ base_url }/usuarios`, formData)
                //todo esto nos va a devolver un observable
                .pipe(
                  /**El tap va a recibir lo que responda la funcion
                   * this.http.post(`${ base_url }/login`, formData) */
                  tap( ( resp: any ) => {
                    // Guardar en el localstorage
                    this.guardarLocalStorage( resp.token, resp.menu );
                  })
                );

  }

  /**Aqui vamos a actualizar el perfil del usuario.
   * Se puede hacer de esta manera o tambien creando
   * una interfaz
  */
  actulizarPerfil( data: { email: string, nombre: string, role: string }) {

     data = {
       ...data,
       role: this.usuario.role
     };

    return this.http.put(`${ base_url }/usuarios/${ this.uid }`, data, this.headers); // Ahora necesito los headers
  }

  login( formData: LoginForm) {

    return this.http.post(`${ base_url }/login`, formData)
                //todo esto nos va a devolver un observable
                .pipe(
                  /**El tap va a recibir lo que responda la funcion
                   * this.http.post(`${ base_url }/login`, formData) */
                  tap( ( resp: any ) => {
                    // Guardar en el localstorage
                    this.guardarLocalStorage( resp.token, resp.menu );

                  })
                );

  }

  loginGoogle( token ) {

    return this.http.post(`${ base_url }/login/google`, { token })
                //todo esto nos va a devolver un observable
                .pipe(
                  /**El tap va a recibir lo que responda la funcion
                   * this.http.post(`${ base_url }/login`, formData) */
                  tap( ( resp: any ) => {
                    // Guardar en el localstorage
                    this.guardarLocalStorage( resp.token, resp.menu );

                  })
                );

  }

  /** Cargar usuarios en la tabla */
  cargarUsuarios( desde: number = 0) {

    // localhost:3000/api/usuarios?desde=0
    const url = `${ base_url }/usuarios?desde=${ desde }`;

    // El CargarUsuario lo importamos del interface ya que ahi creamos
    return this.http.get<CargarUsuario>(url, this.headers)
              /**Para mostrar la imagen */
                .pipe(
                  map( resp => {
                    /**Vamos a cambiar un arreglo de objetos por uno de usuarios
                     * el map nos permite transformar el arreglo y transformar a
                     * uno diferente
                     */
                    const usuarios = resp.usuarios.map(
                        user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
                      );

                      return {
                        total: resp.total,
                        usuarios
                      };
                  })
                )

  }

  /**Puedo recibir el usuario o el uid depende de como
   * nosotros deseemos realizar */
  eliminarUsuario( usuario: Usuario) {
   
     // http://localhost:3000/api/usuarios/607cbcf1b55f3f2788a34450
     const url = `${ base_url }/usuarios/${ usuario.uid }`;

     console.log('URL => ' + url);
     // El CargarUsuario lo importamos del interface ya que ahi creamos
     return this.http.delete( url, this.headers );
  }

  /**Para cambiar el rol */
  guardarUsuario( usuario: Usuario ) {
    return this.http.put(`${ base_url }/usuarios/${ usuario.uid }`, usuario, this.headers); // Ahora necesito los headers
  }

  existeToken() {
    const token = localStorage.getItem("token") ?? "";
    return (token != "")? true: false; 
  }

}
