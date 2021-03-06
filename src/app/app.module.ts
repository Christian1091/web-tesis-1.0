import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule} from './auth/auth.module';
import { WebModule } from './web/web.module';
import { TestModule } from './test/test.module';

import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ComponentsModule } from './components/components.module';
import { VerpostComponent } from './post/verpost/verpost.component';


@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
    Grafica1Component,
    VerpostComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
    WebModule,
    ComponentsModule,
    TestModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
