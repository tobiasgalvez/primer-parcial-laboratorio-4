import { Component, Input } from '@angular/core';
import { PaisesService } from '../../servicios/paises.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-pais',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-pais.component.html',
  styleUrl: './detalle-pais.component.scss'
})
export class DetallePaisComponent {
  @Input() paisNombre: string = '';
  pais: any;

  constructor(private paisesService: PaisesService) {}

  ngOnInit(): void {
    if (this.paisNombre) {
      this.paisesService.getPaises().subscribe((data: any) => {
        // Busca el país por nombre en la lista obtenida
        this.pais = data.find((p: any) => p.name.common.toLowerCase() === this.paisNombre.toLowerCase());
      });
    }
  }

}
