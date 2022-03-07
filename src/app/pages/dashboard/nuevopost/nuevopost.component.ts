import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevopost',
  templateUrl: './nuevopost.component.html',
  styleUrls: ['./nuevopost.component.css']
})
export class NuevopostComponent implements OnInit {

  public fileName = '';
  public formData = new FormData();
  public file: File;
  //Id del post, string cuando sea de actualizar y null cuando sea de crear
  //public id: string | null;

  public postSeleccionado: Post;

  public cabeceraTitulo = 'Nuevo Post';

  // Definimos el formulario
  public postForm: FormGroup;

  constructor(private fb: FormBuilder,
    private postService: PostService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    //this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({ id }) => this.cargarPost(id));

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
        this.postService.uploadPdf(this.file).subscribe(response => {
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
          console.log(response);
        });
      } else {
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
      }

    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Post guardado',
        showConfirmButton: false,
        timer: 1500
      })
      //console.log(this.postForm.value);
      if (this.file) {
        this.postService.uploadPdf(this.file).subscribe(response => {
          const estado = response['ok'] as boolean;
          if (estado) {
            this.postForm.get('nombrePdf').setValue(response['nombreArchivo']);
            console.log(this.postForm.value);
            this.postService.crearPost(this.postForm.value)
              .subscribe((res: any) => {
                console.log(res);
                this.router.navigateByUrl('/');
              }, err => {
                Swal.fire('Error', err.error.msg, 'error');
                console.log(err);
              });
          }
          console.log(response);
        });
      }


    }
    //this.resetPostFormulario();

  }

  cargarPost(id: string) {
    this.cabeceraTitulo = "Editar Post";
    this.postService.getVerContenidoPost(id)
      .subscribe(post => {
        //console.log(post);
        const { titulo, descripcion, texto, nombrePdf } = post;
        //console.log(titulo, descripcion, texto);
        this.postSeleccionado = post;
        this.postForm.setValue({ titulo, descripcion, texto, nombrePdf });
      })
  }

  resetPostFormulario() {
    this.postForm.reset();
    //this.getRespuestasUnicas.clear();
  }

  onFileSelected(event) {
    this.file = event.target.files[0];
  }


}
