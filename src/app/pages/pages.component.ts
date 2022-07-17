import { Component, OnInit } from '@angular/core';

import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: [
    "./pages.component.css"
  ]
})
export class PagesComponent implements OnInit {

  /**Aqui inyectamos el servicio creado anteriomente
   * ng g s services/settings --skipTests
   */
  display;
  constructor( private SettingsService: SettingsService,
               private sidebarService: SidebarService) { }

  ngOnInit(): void {

    customInitFunctions();
    this.sidebarService.cargarMenu();
  }

}
