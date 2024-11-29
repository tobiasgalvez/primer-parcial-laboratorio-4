import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PaisesService } from '../../servicios/paises.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-pais',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-pais.component.html',
  styleUrls: ['./detalle-pais.component.scss']
})
export class DetallePaisComponent implements OnChanges {
  @Input() paisNombre: string = ''; // Recibe el nombre del país
  pais: any = null; // Almacena los detalles del país

  constructor(private paisesService: PaisesService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['paisNombre'] && this.paisNombre) {
      // Llama al servicio solo si cambia el nombre del país
      this.obtenerDetallePais(this.paisNombre);
    }
  }

  obtenerDetallePais(nombre: string): void {
    this.paisesService.getPaises().subscribe((data: any[]) => {
      // Busca el país en los datos obtenidos
      this.pais = data.find(
        (p: any) => p.translations.spa.common.toLowerCase() === nombre.toLowerCase()
      );

      if (!this.pais) {
        console.error(`País no encontrado: ${nombre}`);
      }
    });
  }

  regionEnEspanol(region: string): string {
    const traduccionesRegiones: { [key: string]: string } = {
      Africa: 'África',
      Americas: 'América',
      Asia: 'Asia',
      Europe: 'Europa',
      Oceania: 'Oceanía',
      Antarctic: 'Antártida'
    };
    return traduccionesRegiones[region] || region; // Devuelve la traducción o el nombre original si no hay traducción
  }
  
}
