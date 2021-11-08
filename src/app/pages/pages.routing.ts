/** Va a tener  la definicion de las rutas que estan internas al directorio page*/
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';

import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from '../grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { PagesComponent } from './pages.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

// Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { PreguntasComponent } from './cuestionario/preguntas/preguntas.component';

// Cuestionario
import { CuestionariosComponent } from './cuestionario/cuestionarios/cuestionarios.component';
import { VerCuestionarioComponent } from './cuestionario/ver-cuestionario/ver-cuestionario.component';
import { BuzonComponent } from './correo/buzon/buzon.component';
import { BuzonDetalleComponent } from './correo/buzon-detalle/buzon-detalle.component';
import { RedactarCorreoComponent } from './correo/redactar-correo/redactar-correo.component';
import { EnviadosComponent } from './correo/enviados/enviados.component';

// Post
import { DashboardComponent } from './dashboard/dashboard.component';
import { NuevopostComponent } from './dashboard/nuevopost/nuevopost.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { RespuestaCuestionarioComponent } from '../test/list-cuestionarios/respuesta-cuestionario/respuesta-cuestionario.component';


const routes: Routes = [
  // Rutas hijas
  {
    //Ruta a partir de un path especifico
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [ AuthGuard ],
    children: [
      { path: '', component: DashboardComponent, data: { titulo: 'Mi Perfil'} },
      { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Tema'} },
      { path: 'buscar/:termino', component: BusquedaComponent, data: { titulo: 'Busquedas'} },
      //{ path: 'grafica1', component: Grafica1Component, data: { titulo: 'Grafica'} },
      { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de Usuario'} },
      { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress'} },
      { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'} },
      { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs'} },

      // Post
      { path: 'nuevopost', component: NuevopostComponent },
      { path: 'editarPost/:id', component: NuevopostComponent },

      // Correo
      { path: 'buzon', component: BuzonComponent, data: { titulo: 'Buzon de entrada'} },
      { path: 'buzondetalle', component: BuzonDetalleComponent, data: { titulo: 'Correos'} },
      { path: 'nuevomensaje', component: RedactarCorreoComponent, data: { titulo: 'Nuevo mensaje'} },
      { path: 'enviados', component: EnviadosComponent, data: { titulo: 'Enviados'} },
      // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      /**Mantenimientos - con el canActivate implementamos nuestro Guard*/
      { path: 'usuarios', canActivate: [ AdminGuard ], component: UsuariosComponent , data: { titulo: 'Usuario de aplicacion'} },

      // Cuestionarios
      { path: 'cuestionarios', canActivate: [ AdminGuard ], component: CuestionariosComponent , data: { titulo: 'Cuestionarios'} },
      { path: 'preguntas', canActivate: [ AdminGuard ], component: PreguntasComponent  , data: { titulo: 'Crear Preguntas'} },
      { path: 'ver-cuestionario/:id', canActivate: [ AdminGuard ], component: VerCuestionarioComponent , data: { titulo: 'Ver Cuestionario'} },
      { path: 'estadisticas/:id', canActivate: [ AdminGuard ], component: EstadisticasComponent , data: { titulo: 'Listado de Respuestas'} },
      { path: 'respuestaUsuarioAdmin/:id', canActivate: [ AdminGuard ], component: RespuestaCuestionarioComponent, data: { titulo: 'Estadisticas Usuarios'} },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
