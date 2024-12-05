import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  constructor(private http: HttpClient) {}

  getPaises(): Observable<any> {
    // API de RestCountries para obtener todos los países
    return this.http.get('https://restcountries.com/v3.1/all');
  }

  // Mapeo de capitales en español para los 10 países
  private capitalesEnEspanol: { [key: string]: string } = {
    Grenada: 'Saint George',
    Suiza: 'Berna',
    Hungría: 'Budapest',
    Barbados: 'Bridgetown',
    Italia: 'Roma',
    'San Cristóbal y Nieves': 'Basseterre',
    'Caribe Neerlandés': 'Kralendijk',
    Andorra: 'Andorra la Vieja',
    Francia: 'París',
    México: 'Ciudad de México'
  };

  // Método para obtener la capital en español
  getCapitalEnEspanol(nombrePais: string, capitalOriginal: string): string {
    return this.capitalesEnEspanol[nombrePais] || capitalOriginal || 'Sin capital';
  }
}
