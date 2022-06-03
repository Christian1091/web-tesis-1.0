import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SectionsComponent } from './sections/sections.component';
import {MatMenuModule} from '@angular/material/menu';
import { ReactiveFormsModule } from '@angular/forms';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import {CarouselModule} from 'primeng/carousel';



@NgModule({
  declarations: [
    MainComponent,
    NavbarComponent,
    SectionsComponent
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
    CarouselModule
  ]
})
export class WebModule { }
