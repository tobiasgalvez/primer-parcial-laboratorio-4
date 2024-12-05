import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { TerminosCondicionesComponent } from '../componentes/terminos-condiciones/terminos-condiciones.component';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class TerminosGuard implements CanDeactivate<TerminosCondicionesComponent> {
  async canDeactivate(component: TerminosCondicionesComponent): Promise<boolean> {
    if (!component.aceptaTerminos || !component.email || !component.emailValido(component.email)) {
      // Usar SweetAlert para confirmar
      const result = await Swal.fire({
        title: 'Atención',
        text: 'Debes aceptar los términos y condiciones y proporcionar un correo válido para continuar.',
        icon: 'warning',
        confirmButtonText: 'Entendido'
        
      });

      return result.isConfirmed ? false : true;
    }

    return true;
  }
}
