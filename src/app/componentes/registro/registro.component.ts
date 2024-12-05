import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {

  nuevoMail: string = ""; // Email ingresado por el usuario
  nuevoPassword: string = ""; // Contraseña ingresada por el usuario

  flagError: boolean = false; // Flag para manejar errores
  msjError: string = ""; // Mensaje de error

  constructor(public auth: Auth, private router: Router) {}

  Register() {
    if (!this.nuevoMail || !this.nuevoPassword) {
      this.mostrarError('El correo y la contraseña son obligatorios.');
      return;
    }
  
    if (!this.esEmailValido(this.nuevoMail)) {
      this.mostrarError('El formato del correo electrónico es inválido.');
      return;
    }
  
    createUserWithEmailAndPassword(this.auth, this.nuevoMail, this.nuevoPassword)
      .then((res) => {
        this.flagError = false;

        // Cerrar sesión después del registro
        signOut(this.auth).then(() => {
          // Redirigir a términos y condiciones
          this.router.navigate(['/terminos-condiciones']);
        });
      })
      .catch((e) => {
        this.mostrarError(this.obtenerMensajeError(e.code));
      });
  }
  
  private esEmailValido(email: string): boolean {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }
  
  private mostrarError(mensaje: string): void {
    this.flagError = true;
    this.msjError = mensaje;
  }
  
  private obtenerMensajeError(codigo: string): string {
    const errores: { [key: string]: string } = {
      'auth/invalid-email': 'El correo electrónico es inválido.',
      'auth/email-already-in-use': 'El correo ya está registrado.',
      'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
    };
    return errores[codigo] || 'Ocurrió un error inesperado.';
  }
}
