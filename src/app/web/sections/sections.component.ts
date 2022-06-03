import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
import { Noticia } from '../../models/noticia.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CuestionarioService } from '../../services/cuestionario.service';
import { Correo } from '../../models/correo.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: [
    './sections.component.css'
  ]
})
export class SectionsComponent implements OnInit {

  public listPost: Post[] = [];
  public noticias: Noticia[] = [];
  public contPost: any = {};
  public id: string;
  public responsiveOptions;

  fillColor = 'rgb(255, 0, 0)';

  emailForm = new FormGroup({
    nombre: new FormControl("", [Validators.required, Validators.min(3)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    asunto: new FormControl("", [Validators.required]),
    mensaje: new FormControl("", [Validators.required])
  });

  enviarEmail() {
    console.log(this.emailForm.value);
    if (this.emailForm.valid) {
      const correo: Correo = this.emailForm.value;
      this.cuestionarioService.enviarCorreo(correo).subscribe(res => {
        if (res['ok']) {
          this.emailForm.reset();
          this.mostrarMensaje("Se envio el correo.")
        } else {
          console.log("No se envio el correo");
        }
      });
    }
  }

  mostrarMensaje(mensaje: string) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: mensaje,
      showConfirmButton: false,
      timer: 1000
    })
  }
  changeColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    this.fillColor = `rgb(${r}, ${g}, ${b})`;
   
  }

  constructor( private postService: PostService,
                private cuestionarioService: CuestionarioService,
               private activatedRoute: ActivatedRoute) {
                this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
                this.responsiveOptions = [
                  {
                      breakpoint: '1024px',
                      numVisible: 3,
                      numScroll: 3
                  },
                  {
                      breakpoint: '768px',
                      numVisible: 2,
                      numScroll: 2
                  },
                  {
                      breakpoint: '560px',
                      numVisible: 1,
                      numScroll: 1
                  }
              ];
                }
                

                

  ngOnInit(): void {
    this.getListPost();
    this.cargarNoticia();
  }



  getListPost() {
    this.postService.getListPost()
                    .subscribe(({ post }) => {
                              this.listPost = post;
                            });
  }

  cargarNoticia(){
    this.postService.getListNoticias().subscribe(response => {
      this.noticias = response['noticias'];
      //this.noticias = this.noticias.slice(0, 3);
      //this.noticias  = this.noticias.slice(this.noticias.length -4, this.noticias.length);
    });
  }



}
