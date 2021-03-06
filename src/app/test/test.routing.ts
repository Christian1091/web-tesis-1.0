import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { RespuestaCuestionarioComponent } from '../test/list-cuestionarios/respuesta-cuestionario/respuesta-cuestionario.component';
import { ValidarIngresoComponent } from '../test/list-cuestionarios/validar-ingreso/validar-ingreso.component';
import { ListCuestionariosComponent } from './list-cuestionarios/list-cuestionarios.component';
import { PreguntaComponent } from '../test/list-cuestionarios/pregunta/pregunta.component';

const routes: Routes = [
  { path: 'listCuestionarios', component: ListCuestionariosComponent },
  { path: 'pregunta/:id', component: PreguntaComponent },
  { path: 'validarIngreso/:id', component: ValidarIngresoComponent },
  { path: 'respuestaCuestionario/:id', component: RespuestaCuestionarioComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule {}
