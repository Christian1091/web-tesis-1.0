import { createUrlResolverWithoutPackagePrefix } from '@angular/compiler';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [],
})
export class PromesasComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {

    this.getUsuarios().then( usuarios => {
      console.log(usuarios);
    });

    // const promesa = new Promise(( resolve, reject ) => {

    //   if(false){
    //     resolve('Hola Mundo');

    //   }else {
    //     reject('Algo salio mal');
    //   }

    // });

    // promesa.then( ( mensaje )=>{
    //   console.log(mensaje);
    // })
    // .catch( error => console.log('Error en mi promesa', error ));

    // console.log('Fin del init');
  }

  getUsuarios() {

    const promesa =  new Promise( resolv => {

      //Promesa
      fetch('https://reqres.in/api/users')
        .then( resp => resp.json())
        .then( body => resolv( body.data ));
    });
    return promesa;
  }
}
