export class Post {

 /** El ?: significa que va hacer opcional */
 constructor(
    public _id: string,
    public titulo: string,
    public descripcion: string,
    public texto: string,
    //public img?: string,
    public uid?: string,

) {  }
}
