import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) {}

  canActivate(): Observable<boolean> {
    return new Observable((observer) => {
      this.auth.onAuthStateChanged((user) => {
        if (user && user.email === 'admin@admin.com') {
          observer.next(true);
        } else {
          this.router.navigate(['/bienvenido']); // Redirigir al home si no es admin
          observer.next(false);
        }
        observer.complete();
      });
    });
  }
}
