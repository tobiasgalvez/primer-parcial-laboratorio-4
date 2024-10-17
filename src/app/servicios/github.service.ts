import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private apiUrl = 'https://api.github.com/users/octaviovillegas'; // Cambia por tu usuario si es necesario

  constructor(private http: HttpClient) { }

  getUserData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
