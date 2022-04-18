import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SectionsComponent } from './sections/sections.component';
import {MatMenuModule} from '@angular/material/menu';



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
    MatMenuModule
  ]
})
export class WebModule { }
