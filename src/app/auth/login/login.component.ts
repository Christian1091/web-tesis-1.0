import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

/**Importamos el gapi que esta en el script en el index */
declare const gapi: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;
  public auth2: any;

  // Definimos el formulario
  public loginForm = this.fb.group({

    /**Si es que queremos una sola validacion podemos quitar los corchetes, si son mas van dentro de ellos */
    /**Con el localStorage.getItem('email') || '' hacemos que nuestro email aparezca en la etiqueta de nuestro
     * front y las '' es para cuando no haya un email salga vacio
     */
    email: [localStorage.getItem('email') || '', [ Validators.required, Validators.email ] ],
    password: ['', Validators.required ],
    remember: [false]

  })

  constructor( private router: Router,
               private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private ngZone: NgZone) { }

  ngOnInit(): void {
    /**Aqui llamamos el render del boton */
    this.renderButton();
  }

  login() {

    this.usuarioService.login( this.loginForm.value )
      .subscribe( resp => {
        // Aqui tenemos un login exitoso
      

        // Para recordar el email
        if ( this.loginForm.get('remember').value ){
          localStorage.setItem('email', this.loginForm.get('email').value);

        } else {
          localStorage.removeItem('email');
        }

        // Navegar al dashboard
        // Este es en el login normal
        this.router.navigateByUrl('/');

      }, (err) => {
        // Si sucede un error
        Swal.fire('Error', err.error.msg, 'error');
        
      });

  
    // this.router.navigateByUrl('/');
  }


  
  // Sign-in con el boton de google
  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });

    this.startApp();
  }

  async startApp () {

    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;

    this.attachSignin( document.getElementById('my-signin2') );
  };

  attachSignin(element) {
   
    this.auth2.attachClickHandler( element, {},
        (googleUser) => {
           const id_token = googleUser.getAuthResponse().id_token;
         
          this.usuarioService.loginGoogle( id_token).subscribe( resp => {
            // Navegar al dashboard
            // Este es en el login de google
            this.ngZone.run( () => {
              this.router.navigateByUrl('/');

            })
          });
        }, (error) => {
          alert(JSON.stringify(error, undefined, 2));
    });
  }

}
