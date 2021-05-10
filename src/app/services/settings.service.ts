import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');

  constructor() {

    const url = localStorage.getItem('theme') || './assets/css/colors/purple-dark.css';
    this.linkTheme.setAttribute('href', url);

   }

   changeTheme(theme: string) {

    const url = `./assets/css/colors/${ theme }.css`;

    this.linkTheme.setAttribute('href', url);

    /**Guardar el tema para cuando actualice la pagina se quede con el tema elejido
     * aqui instanciamos el localStorage y en el pages.components.ts hacemos el
     * siguinete procedimiento
    */
    localStorage.setItem('theme', url);

    this.checkCurrentTheme();

  }

  checkCurrentTheme() {

      /**Forma para hacer eleccion del elemento para cambiar de color el tema*/
      const links = document.querySelectorAll('.selector');

    links.forEach( elem => {
      elem.classList.remove('working');
       const btnTheme = elem.getAttribute('data-theme');
       const btnThemeUrl = `./assets/css/colors/${ btnTheme }.css`;
       const currentTheme = this.linkTheme.getAttribute('href');

       if( btnThemeUrl === currentTheme ) {
         elem.classList.add('working');
       }
    });
  }

}
