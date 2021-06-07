import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCuestionariosComponent } from './list-cuestionarios/list-cuestionarios.component';
import { ValidarIngresoComponent } from './list-cuestionarios/validar-ingreso/validar-ingreso.component';
import { PreguntaComponent } from './list-cuestionarios/pregunta/pregunta.component';
import { RespuestaCuestionarioComponent } from './list-cuestionarios/respuesta-cuestionario/respuesta-cuestionario.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebModule } from '../web/web.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ListCuestionariosComponent,
    ValidarIngresoComponent,
    PreguntaComponent,
    RespuestaCuestionarioComponent
  ],
  exports:[
    ListCuestionariosComponent,
    ValidarIngresoComponent,
    PreguntaComponent,
    RespuestaCuestionarioComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    WebModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class TestModule { }
