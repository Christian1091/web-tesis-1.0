import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SectionsComponent } from './sections/sections.component';
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { CarouselModule } from 'primeng/carousel';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button'
import { GalleriaModule } from 'primeng/galleria';
import { VerNoticiaComponent } from './ver-noticia/ver-noticia.component';

@NgModule({
  declarations: [
    MainComponent,
    NavbarComponent,
    SectionsComponent,
    VerNoticiaComponent
  ],
  exports: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule,
    ReactiveFormsModule,
    IvyCarouselModule,
    CarouselModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    GalleriaModule
  ]
})
export class WebModule { }
