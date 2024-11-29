import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Auth, onAuthStateChanged, signOut } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'primer-parcial';
  user: any = null; // Variable para almacenar el usuario autenticado

  constructor(private router: Router, private auth: Auth) {}

  ngOnInit(): void {
    // Verificar si el usuario está autenticado
    onAuthStateChanged(this.auth, (user) => {
      this.user = user; // Actualizar el estado del usuario
    });
  }

  IrAOtraRuta(path: string): void {
    this.router.navigate([path]);
  }


  CerrarSesion(): void {
    signOut(this.auth).then(() => {
      this.user = null; // Limpia el estado del usuario
      this.router.navigate(['/bienvenido']); // Redirigir al home
    });
  }
}
