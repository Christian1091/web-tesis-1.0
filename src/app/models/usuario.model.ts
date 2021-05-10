// Importamos nuestro enviroments
import { environment } from "src/environments/environment";

const base_url = environment.base_url;

export class Usuario {

  /** El ?: significa que va hacer opcional */
  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: 'ADMIN_ROLE' | 'USER_ROLE',
    public uid?: string,
  ) {  }

  // Obtener la imagen del usuario
  get imagenUrl() {
    // Para que nos muestre la immagen cuando nos logeamos con google
    if ( !this.img ){
      return `${ base_url }/upload/usuarios/no-imge`;
    } else if ( this.img.includes('https') ) {
      return this.img;
    } else if ( this.img ) {// Vemos si existe imagen el usuario
      /**Nos va a retornar un string, este string va a estar
        *basado en el url que tenemos que construir
        */
      // /upload/usuario/no-image
      return `${ base_url }/upload/usuarios/${ this.img }`;

    } else {
      return `${ base_url }/upload/usuarios/no-imge`;
    }

  }
}
