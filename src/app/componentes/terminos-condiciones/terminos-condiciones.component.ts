import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-terminos-condiciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './terminos-condiciones.component.html',
  styleUrls: ['./terminos-condiciones.component.scss']
})
export class TerminosCondicionesComponent {
  aceptaTerminos: boolean = false; // Estado del checkbox
  email: string = ''; // Email del usuario
  mensajeError: string = ''; // Mensaje de error dinámico

  constructor(private router: Router) {}

  aceptar() {
    if (!this.aceptaTerminos) {
      this.mostrarError('Debes aceptar los términos y condiciones.');
      return;
    }

    if (!this.email || !this.emailValido(this.email)) {
      this.mostrarError('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    // Si todo está correcto, redirige
    Swal.fire({
      icon: 'success',
      title: '¡Gracias!',
      text: 'Has aceptado los términos y condiciones correctamente.',
      confirmButtonText: 'Continuar'
    }).then(() => {
      this.router.navigate(['/bienvenido']);
    });
  }

  emailValido(email: string): boolean {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  mostrarError(mensaje: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: mensaje,
      confirmButtonText: 'Entendido'
    });
  }
}
