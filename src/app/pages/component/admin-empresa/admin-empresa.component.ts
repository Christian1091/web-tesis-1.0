import { Component, OnInit } from '@angular/core';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';
import { CuestionariosComponent } from '../../cuestionario/cuestionarios/cuestionarios.component';

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

  constructor(private cuestionarioService: CuestionarioService, private matDialogRef: MatDialogRef<CuestionariosComponent>) {
    cuestionarioService.obtenerEmpresas().subscribe(res => {
      this.empresas = res['empresas'] as Empresa[];
    }
    );
  }

  ngOnInit(): void {
  }

  eliminar(emp: string) {
    this.cuestionarioService.eliminarEmpresa(emp).subscribe(res => {
      const ok: boolean = res["ok"];
      if (ok) {
        this.mostrarAlerta("Correcto", "Empresa eliminada correctamente", true);
        this.matDialogRef.close(true);
      }
      else {
        this.mostrarAlerta("Error", "Error al eliminar", false);
      }
    });
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
    this.cuestionarioService.guardarEmpresa(this.nombre, this.nombre).subscribe(res => {
      const ok: boolean = res['ok'];
      if(ok) {
        this.mostrarAlerta("Correcto", "Empresa agregada correctamente", true);
        this.matDialogRef.close(true);
      } else {
        this.mostrarAlerta("Error", "Ocurrió un error", false);
      }
    });
  }

  mostrarAlerta(title: string, body: string, ok: boolean) {
    Swal.fire(
      title,
      body,
      ok ? 'success' : 'error');
  }

}


