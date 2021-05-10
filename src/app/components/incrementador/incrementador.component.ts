import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  /* Para que haga efecto el incrementador agregamos el @Input es decir
   enviar informacion desde el padre hacia el hijo, el componente padre
   en este caso es el progress.component*/
  // Renombrar el Argumento
   @Input('valor') progreso: number = 40;
  //@Input() progreso: number = 40;

  /**Para cambiar el color del boton  */
  @Input() btnClass: string = 'btn-primary';

  /** Para escuchar los cambios que le componente va a emitir utilizamos el output */
  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.btnClass = `btn ${ this.btnClass }`;
  }

  cambiarValor( valor: number) {

    if(this.progreso >= 100 && valor >=0){
      this.valorSalida.emit(100);
      return this.progreso = 100;
    }

    if(this.progreso <= 0 && valor <=0){
      this.valorSalida.emit(100);
      return this.progreso = 0;
    }

    this.progreso = this.progreso + valor;
    this.valorSalida.emit(this.progreso);
  }

  onChange( nuevoValor: number ){

    if( nuevoValor >= 100) {
      this.progreso = 100;
    } else if( nuevoValor <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = nuevoValor;
    }

    this.valorSalida.emit( this.progreso );

  }
}
