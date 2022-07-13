import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  public usuarios: Usuario[] = [];
  subscriptions: Subscription[] = [];

  constructor( private activatedRoute: ActivatedRoute,
               private busquedasService: BusquedasService) { }

  ngOnInit(): void {
    const searchActivatedR = this.activatedRoute.params
      .subscribe( ({ termino }) => this.busquedaGlobal( termino ))
  
      this.subscriptions.push(searchActivatedR);
    }

  
  busquedaGlobal( termino: string ) {
    const searchBusquedaS = this.busquedasService.busquedaGlobal( termino )
        .subscribe( (resp: any) => {
         
          this.usuarios = resp.usuarios;
        });
        this.subscriptions.push(searchBusquedaS);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(res => {
      res.unsubscribe();
    });
  }
}
