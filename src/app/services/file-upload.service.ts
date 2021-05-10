import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

/**Como necesitamos el url vamos a crear nuestra constante
 * en donde lo vamos a llamar
 */
const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  /**Lo que sigue es recibir los argumentos para actualizar la foto */
  async actualizarFoto( archivo: File,
                        tipo: 'usuarios'|'medicos'|'hospitales',
                        id: string) {

    try {

      const url = `${ base_url }/upload/${ tipo }/${ id }`;
      /**Ahora necesitamos la data */
      const formData = new FormData();
      formData.append('imagen', archivo);

      /**Ahora vamos hacer la petincion, mandamos nuestro url, seguido
       * de las propiedades que queremos que nuestro fecth tenga
      */
      const resp = await fetch( url, {
        // El PUT es como esta definido en nuestro backend, es decir la peticion
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData

      });

      //console.log(resp);
      const data = await resp.json();
      if ( data.ok ) {
        return data.nombreArchivo;
      } else {
        //console.log(data.msg);
        return false;
      }


    } catch (error) {
      console.log(error);
      return false;

    }
  }
}
