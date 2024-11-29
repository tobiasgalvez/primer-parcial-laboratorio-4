import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(public auth: Auth, private router: Router) {}

  login() {
    if (!this.email || !this.password) {
      this.showAlert('Datos inválidos', 'Por favor, complete todos los campos correctamente.', 'error');
      return;
    }

    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then(() => {
        this.showAlert('Inicio de sesión exitoso', 'Redirigiendo al inicio...', 'success');
        setTimeout(() => {
          this.router.navigate(['/']); // Redirige al home después de 2 segundos
        }, 2000);
      })
      .catch(() => {
        this.showAlert('Error en el inicio de sesión', 'Los datos ingresados son incorrectos.', 'error');
      });
  }

  accesoRapidoLogin(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  private showAlert(title: string, text: string, icon: 'success' | 'error') {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      timer: 2000,
      showConfirmButton: false,
      backdrop: false,
     
    
    });
  }


}
