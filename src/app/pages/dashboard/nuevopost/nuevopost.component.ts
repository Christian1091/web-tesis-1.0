import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nuevopost',
  templateUrl: './nuevopost.component.html',
  styleUrls: ['./nuevopost.component.css']
})
export class NuevopostComponent implements OnInit {

  public fileName = '';
  public formData = new FormData();
  public file: File;
  public postSeleccionado: Post;
  public cabeceraTitulo = 'Nuevo Post';
  public postForm: FormGroup;
  subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder,
    private postService: PostService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    //this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {

    const searchActivatedR = this.activatedRoute.params.subscribe(({ id }) => {
      if (id != undefined) {
        this.cargarPost(id)
      }
    });
    this.subscriptions.push(searchActivatedR);

    this.postForm = this.fb.group({
      /**Si es que queremos una sola validacion podemos quitar los corchetes, si son mas van dentro de ellos */
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      texto: ['', Validators.required],
      nombrePdf: ['']
    })

  }

  crearPost() {

    if (this.postSeleccionado) {

      const data = {
        ...this.postForm.value, //desestructuramos
        _id: this.postSeleccionado._id
      }

      if (this.file) {
        const searchUploadPdf = this.postService.uploadPdf(this.file).subscribe(response => {
          data["nombrePdf"] = response['nombreArchivo'];
          //this.postForm.get('nombrePdf').setValue(response['nombreArchivo']);
          this.postService.actulizarPost(data)
            .subscribe(resp => {
              this.router.navigateByUrl('/');
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Post Actualizado',
                showConfirmButton: false,
                timer: 1500
              })
            })
        });
        this.subscriptions.push(searchUploadPdf);
      } else {
        const searchActualizarP = this.postService.actulizarPost(data)
          .subscribe(resp => {
            this.router.navigateByUrl('/');
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Post Actualizado',
              showConfirmButton: false,
              timer: 1500
            })
          });
        this.subscriptions.push(searchActualizarP);
      }

    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Post guardado',
        showConfirmButton: false,
        timer: 1500
      })

      if (this.file) {
        const searchUploadPdf = this.postService.uploadPdf(this.file).subscribe(response => {
          const estado = response['ok'] as boolean;
          if (estado) {
            this.postForm.get('nombrePdf').setValue(response['nombreArchivo']);
            this.postService.crearPost(this.postForm.value)
              .subscribe((res: any) => {

                this.router.navigateByUrl('/');
              }, err => {
                Swal.fire('Error', err.error.msg, 'error');
              });
          }
        });
        this.subscriptions.push(searchUploadPdf);
      }
    }
  }

  cargarPost(id: string) {
    this.cabeceraTitulo = "Editar Post";
    const searchVerContenidoPost = this.postService.getVerContenidoPost(id)
      .subscribe(post => {

        const { titulo, descripcion, texto, nombrePdf } = post;

        this.postSeleccionado = post;
        this.postForm.setValue({ titulo, descripcion, texto, nombrePdf });
      });
    this.subscriptions.push(searchVerContenidoPost);
  }

  resetPostFormulario() {
    this.postForm.reset();  //this.getRespuestasUnicas.clear();
  }

  onFileSelected(event) {
    this.file = event.target.files[0];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(res => {
      res.unsubscribe();
    });
  }
}
