import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule} from './auth/auth.module';
import { WebModule } from './web/web.module';
import { TestModule } from './test/test.module';
import {MatTabsModule} from '@angular/material/tabs';
import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ComponentsModule } from './components/components.module';
import { VerpostComponent } from './post/verpost/verpost.component';
import { ClipboardModule} from 'ngx-clipboard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatSidenavModule } from '@angular/material/sidenav';
import { InformeComponent } from './informe/informe.component';
import {MatIconModule} from '@angular/material/icon';
import { NuevaNoticiaComponent } from './noticia/nueva-noticia/nueva-noticia.component';
import { GeneralComponent } from './general/general.component';
import {MatSelectModule} from '@angular/material/select';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
    Grafica1Component,
    VerpostComponent,
    InformeComponent,
    NuevaNoticiaComponent,
    GeneralComponent,
    
    

  ],
  imports: [
    BackButtonDisableModule.forRoot({
      preserveScrollPosition: true,
      
    }),
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
    WebModule,
    ComponentsModule,
    TestModule,
    ClipboardModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule,
    MatSidenavModule,
    MatIconModule,
    MatTabsModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
