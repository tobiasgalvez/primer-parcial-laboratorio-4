import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-baja-vehiculo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './baja-vehiculo.component.html',
  styleUrls: ['./baja-vehiculo.component.scss'],
})
export class BajaVehiculoComponent {
  @Input() vehiculo: any; // Recibe el vehículo a eliminar
  @Output() vehiculoEliminado = new EventEmitter<any>(); // Emite el vehículo eliminado

  eliminarVehiculo() {
    if (this.vehiculo) {
      this.vehiculoEliminado.emit(this.vehiculo); // Emite el evento con el vehículo seleccionado
    }
  }
}
