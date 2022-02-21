import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'

import { ClipboardModule } from 'ngx-clipboard';

//Modulos
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { CuestionariosComponent } from './cuestionario/cuestionarios/cuestionarios.component';
import { PreguntasComponent } from './cuestionario/preguntas/preguntas.component';
import { NuevaPreguntaComponent } from './cuestionario/preguntas/nueva-pregunta/nueva-pregunta.component';
import { VerCuestionarioComponent } from './cuestionario/ver-cuestionario/ver-cuestionario.component';
import { BuzonComponent } from './correo/buzon/buzon.component';
import { RedactarCorreoComponent } from './correo/redactar-correo/redactar-correo.component';
import { BuzonDetalleComponent } from './correo/buzon-detalle/buzon-detalle.component';
import { EnviadosComponent } from './correo/enviados/enviados.component';
import { NuevopostComponent } from './dashboard/nuevopost/nuevopost.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActualizarCuestionarioComponent } from './cuestionario/actualizar-cuestionario/actualizar-cuestionario.component';
import { VerPostComponent } from './dashboard/ver-post/ver-post.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatSelectModule } from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    // Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    PerfilComponent,
    UsuariosComponent,
    BusquedaComponent,
    CuestionariosComponent,
    PreguntasComponent,
    NuevaPreguntaComponent,
    VerCuestionarioComponent,
    BuzonComponent,
    RedactarCorreoComponent,
    BuzonDetalleComponent,
    EnviadosComponent,
    NuevopostComponent,
    EstadisticasComponent,
    ActualizarCuestionarioComponent,
    VerPostComponent
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    // Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    ClipboardModule,
    MatDialogModule,
    PdfViewerModule,
    MatSelectModule,
    MatSlideToggleModule
  ],
  providers: [{
    provide: MatDialogRef,
    useValue: {}
 }, {
    provide: MAT_DIALOG_DATA,
    useValue: {} // Add any data you wish to test if it is passed/used correctly
 }]
})
export class PagesModule { }
