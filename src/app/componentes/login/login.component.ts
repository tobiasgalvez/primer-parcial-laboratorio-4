import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email: string = "";
  password: string = "";
  loggedUser: string = "";
  errorMessage: string = ""; // Propiedad para el mensaje de error
  showError: boolean = false; // Indicador para mostrar el mensaje de error

  constructor(public auth: Auth, private router: Router, private firestore: Firestore) { }

  login() {
    if (!this.email || !this.password) {
      console.log('Email o contraseña vacíos');
      this.errorMessage = "Email o contraseña vacíos"; // Mensaje de error
        this.showError = true; // Mostrar el mensaje de error
      return;
    }
    console.log("Intentando iniciar sesión...");
    
    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then((res) => {
        console.log('Inicio de sesión exitoso', res);
        this.showError = false; // Ocultar el mensaje de error

        // Registrar log en Firestore
        //this.registrarLogUsuario(res.user.email);

        this.router.navigate(['/']); // Redirigir al home
      })
      .catch((e) => {
        console.log('Error en el inicio de sesión:', e.code, e.message);
        this.errorMessage = "Datos incorrectos"; // Mensaje de error
        this.showError = true; // Mostrar el mensaje de error
      });
  }

  accesoRapidoLogin(email: string, password: string) {
    this.email = email;
    this.password = password;
  }


}
