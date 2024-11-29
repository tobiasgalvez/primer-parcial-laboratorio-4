import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private apiUrl = 'https://api.github.com/users'; // URL base de la API de GitHub

  constructor(private http: HttpClient) { }

  getUserData(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${username}`);
  }
}

