import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-cuestionarios',
  templateUrl: './cuestionarios.component.html',
  styles: [
  ]
})
export class CuestionariosComponent implements OnInit {


  public cuestionarioForm = this.fb.group({
    titulo: ['',Validators.required],
    descripcion: ['', Validators.required]
  })

  constructor(private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
  }

  crearPreguntas() {
    console.log("Nos vamos a las preguntas");
    this.router.navigateByUrl('/dashboard/preguntas');
  }

}
