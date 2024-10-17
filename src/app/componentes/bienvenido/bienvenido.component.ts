import { Component, OnInit } from '@angular/core';
import { GithubService } from '../../servicios/github.service';
import { CommonModule } from '@angular/common';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenido',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bienvenido.component.html',
  styleUrl: './bienvenido.component.scss'
})
export class BienvenidoComponent implements OnInit {

  userData: any;
  user: any; // Variable para almacenar el usuario logueado

  constructor(private githubService: GithubService, private auth: Auth, private router: Router) { }

  ngOnInit(): void {
    // Obtener datos del usuario de GitHub
    this.githubService.getUserData().subscribe(
      (data) => {
        this.userData = data;
      },
      (error) => {
        console.error('Error fetching data from GitHub', error);
      }
    );

    // Comprobar el estado de autenticación
    this.auth.onAuthStateChanged((user) => {
      this.user = user; // Actualiza la información del usuario
    });
  }

  IrAOtraRuta(ruta: string) {
    this.router.navigate([ruta]); // Navega a la ruta especificada
  }

  CerrarSesion() {
    signOut(this.auth).then(() => {
      this.router.navigate(['/']); // Redirigir al home al cerrar sesión
    });
  }

}
