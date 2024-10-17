import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  constructor(private http: HttpClient) { }

  getPaises(): Observable<any> {
    // API de RestCountries para obtener países del continente americano o europeo
    return this.http.get('https://restcountries.com/v3.1/all');
  }
}
