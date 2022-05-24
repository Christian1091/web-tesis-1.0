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

import {ProgressBarModule} from "angular-progress-bar"
import { MatDialogModule } from '@angular/material/dialog';
import { GraficoComponent } from './grafico/grafico.component';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';



@NgModule({
  declarations: [
    ListCuestionariosComponent,
    ValidarIngresoComponent,
    PreguntaComponent,
    RespuestaCuestionarioComponent,
    GraficoComponent,
    
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
    ProgressBarModule,
    HttpClientModule,
    MatDialogModule,
  ]
})
export class TestModule { }
