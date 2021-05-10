import { Component, OnInit } from '@angular/core';

import { FileUploadService } from 'src/app/services/file-upload.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  /**Creamos una propiedad para subir la imagen */
  public imagenSubir: File;

  public imgTemp: any = null;


  /**vamos hacerle publico por que lo vamos a utilizar en nuestro html */
  constructor( public modalImagenService: ModalImagenService,
               public fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
  }

  cambiarImagen( file: File ) {
    //console.log(file);
    this.imagenSubir = file;

    if ( !file ) {
      /*Aqui hace que la imagen muestre la que estaba anteriormnete
       *elejida si es que cancelamos al elegir la nueva imagen
      */
       return this.imgTemp = null;
     }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
      //console.log(reader.result);
    }
  }

  subirImagen() {

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService
        .actualizarFoto( this.imagenSubir, tipo, id )
        .then( img => {
          Swal.fire('Guardado', 'Imagen actualizada', 'success');

          // aplicamos el eventemiter que lo realizamos en el modal imagen service
          this.modalImagenService.nuevaImagen.emit(img);

          this.cerrarModal();
        }).catch ( err => {
          console.log(err);
          Swal.fire('Error', 'No se pudo subir la imagen', 'error');
        })
  }

}
