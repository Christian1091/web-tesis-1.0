import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service'

declare const gapi: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css'  ]
})

export class RegisterComponent implements OnInit {

  public formSubmitted = false;

  public auth2: any;

  // Definimos el formulario
  public registerForm = this.fb.group({

    /**Si es que queremos una sola validacion podemos quitar los corchetes, si son mas van dentro de ellos */
    nombre:['', [ Validators.required, Validators.minLength(3) ]],
    email: ['', [ Validators.required, Validators.email ] ],
    password: ['', Validators.required ],
    password2: ['', Validators.required ],
    terminos: [ false, Validators.required ],
  }, {
    validators: this.passwordsIguales('password', 'password2')
  });


  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private router: Router,
               private ngZone: NgZone) { }


  ngOnInit(): void {
    /**Aqui llamamos el render del boton */
    this.renderButton();
  }

  crearUsuario(){
    this.formSubmitted = true;

    if( this.registerForm.invalid ){
      return;
    }

    // Si el formulario es valido, realizar el posteo
    this.usuarioService.crearUsuario( this.registerForm.value )
        .subscribe( resp =>  {
          // Navegar al dashboard
          this.router.navigateByUrl('/');

    }, (err) => {
      // Si sucede un error
      Swal.fire('Error', err.error.msg, 'error');
    });
  }

  campoNoValido( campo: string ): boolean {

    if( this.registerForm.get(campo).invalid && this.formSubmitted ){
      return true;
    }else{
      return false;
    }
  }

  contrasenasNoValidas(){
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    /**Ponemos this.formSubmitted para que nos aparezca la alerta cuando demos click en el boton*/
    if( (pass1 !== pass2) && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
  }

  aceptaTerminos(){
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

  /**Aqui creamos una funcion para que nos regrese un objeto si nos da un error
   * y nos regrese null si no nos da errores
  */
  passwordsIguales(pass1Name: string, pass2Name: string){

    return ( formGroup: FormGroup ) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if( pass1Control.value === pass2Control.value ) {
        pass2Control.setErrors(null)
      } else {
        pass2Control.setErrors({ noEsIgual: true })
      }
    }

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
