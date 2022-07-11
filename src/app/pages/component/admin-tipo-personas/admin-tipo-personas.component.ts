import { Component, OnInit } from '@angular/core';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';
import { CuestionariosComponent } from '../../cuestionario/cuestionarios/cuestionarios.component';

export class TipoPersona {
  descripcion: string;
  tipo: string;
  _id: string;
}

@Component({
  selector: 'app-admin-tipo-personas',
  templateUrl: './admin-tipo-personas.component.html',
  styleUrls: ['./admin-tipo-personas.component.css']
})
export class AdminTipoPersonasComponent implements OnInit {

  public tiposPersona: TipoPersona[] = [];
  public tipo: string = "";


  constructor(private cuestionarioService: CuestionarioService, private matDialogRef: MatDialogRef<CuestionariosComponent>) {
    cuestionarioService.obtenerTipoPersonas().subscribe(res => {
      this.tiposPersona = res['tiposPersonas'] as TipoPersona[];
      console.log(res);
    }
    );
  }
  ngOnInit(): void {
  }

  eliminar(emp: string) {
    this.cuestionarioService.eliminarTipoPersona(emp).subscribe(res => {
      const ok: boolean = res["ok"];
      if (ok) {
        this.mostrarAlerta("Correcto", "Tipo persona eliminado correctamente", true);
        this.matDialogRef.close(true);
      }
      else {
        this.mostrarAlerta("Error", "Error al eliminar", false);
      }
    });
  }

  agregarDirigido() {
    if (this.tipo.length < 3) {
      this.mostrarAlerta("Error", "El tipo de persona debe tener al menos 3 caracteres", false);
      return;
    }
    if (this.tiposPersona.find(e => e.tipo.toLocaleLowerCase() === this.tipo.trim().toLowerCase())) {
      this.mostrarAlerta("Error", "El tipo de persona ya existe", false);
      return;
    }
    this.cuestionarioService.guardarTipoPersonas(this.tipo, this.tipo).subscribe(res => {
      const ok: boolean = res['ok'];
      if(ok) {
        this.mostrarAlerta("Correcto", "Tipo de persona agregado correctamente", true);
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

