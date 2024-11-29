import { Component, OnInit } from '@angular/core';
import { GithubService } from '../../servicios/github.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenido',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.scss']
})
export class BienvenidoComponent implements OnInit {
  userData: any;
  githubUsername: string = '';
  isUserLoaded: boolean = false; // Controla si ya se cargó un usuario
  user: any;

  constructor(private githubService: GithubService, private auth: Auth, private router: Router) {}

  ngOnInit(): void {
    // Recuperar datos almacenados al recargar o volver al componente
    const savedUserData = localStorage.getItem('githubUserData');
    const savedUsername = localStorage.getItem('githubUsername');

    if (savedUserData && savedUsername) {
      this.userData = JSON.parse(savedUserData);
      this.githubUsername = savedUsername;
      this.isUserLoaded = true;
    }
  }

  loadGithubUserData(username: string): void {
    if (username.trim() === '') {
      console.error('El nombre de usuario no puede estar vacío');
      return;
    }
  
    this.githubService.getUserData(username).subscribe(
      (data) => {
        this.userData = data;
        this.githubUsername = username;
        this.isUserLoaded = true;
  
        // Guardar datos en localStorage
        localStorage.setItem('githubUserData', JSON.stringify(data));
        localStorage.setItem('githubUsername', username);
      },
      (error) => {
        console.error('Error fetching data from GitHub:', error);
      }
    );
  }
  

  IrAOtraRuta(ruta: string): void {
    this.router.navigate([ruta]);
  }

  CerrarSesion(): void {
    signOut(this.auth).then(() => {
      this.router.navigate(['/']);
    });
  }
}
