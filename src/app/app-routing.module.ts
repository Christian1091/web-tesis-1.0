import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Modulos
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';
import { WebRoutingModule } from './web/web.routing';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { Grafica1Component } from './grafica1/grafica1.component';

const routes: Routes = [
  //path: '/dashboard' PagesRouting
  //path: '/auth' AuthRouting

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Grafica'} },
  { path: '**', component: NopagefoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule,
    WebRoutingModule

  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
