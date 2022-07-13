import { Component, OnInit } from '@angular/core';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';
import { CuestionariosComponent } from '../../cuestionario/cuestionarios/cuestionarios.component';
import { Subscription } from 'rxjs';

export class Empresa {
  nombre: string;
  id: string;
}
@Component({
  selector: 'app-admin-empresa',
  templateUrl: './admin-empresa.component.html',
  styleUrls: ['./admin-empresa.component.css']
})
export class AdminEmpresaComponent implements OnInit {

  public empresas: Empresa[] = [];
  public nombre: string = "";
  subscriptions: Subscription [] = []; 

 constructor(private cuestionarioService: CuestionarioService, private matDialogRef: MatDialogRef<CuestionariosComponent>) {
   const searchObtenerEmpresa = cuestionarioService.obtenerEmpresas().subscribe(res => {
      this.empresas = res['empresas'] as Empresa[];
    }); 
    this.subscriptions.push(searchObtenerEmpresa);
  }

  ngOnInit(): void {
  }

  eliminar(emp: string) {
    const searchEliminarE = this.cuestionarioService.eliminarEmpresa(emp).subscribe(res => {
      const ok: boolean = res["ok"];
      if (ok) {
        this.mostrarAlerta("Correcto", "Empresa eliminada correctamente", true);
        this.matDialogRef.close(true);
      }
      else {
        this.mostrarAlerta("Error", "Error al eliminar", false);
      }
    });
    this.subscriptions.push(searchEliminarE);
  }

  agregarEmpresa() {
    if (this.nombre.length < 3) {
      this.mostrarAlerta("Error", "El nombre de la empresa debe tener al menos 3 caracteres", false);
      return;
    }
    if (this.empresas.find(e => e.nombre.toLocaleLowerCase() === this.nombre.trim().toLowerCase())) {
      this.mostrarAlerta("Error", "Empresa ya existe", false);
      return;
    }
    const searchGuardarE = this.cuestionarioService.guardarEmpresa(this.nombre, this.nombre).subscribe(res => {
      const ok: boolean = res['ok'];
      console.log(ok);
      
      if(ok) {
        this.mostrarAlerta("Correcto", "Empresa agregada correctamente", true);
        this.matDialogRef.close(true);
      } else {
        this.mostrarAlerta("Error", "Ocurrió un error", false);
      }
    });
    this.subscriptions.push(searchGuardarE);
  }

  mostrarAlerta(title: string, body: string, ok: boolean) {
    Swal.fire(
      title,
      body,
      ok ? 'success' : 'error');
  }

  ngOnDestroy() {
    this.subscriptions.forEach(res => {
      res.unsubscribe();
    });
  }
}


