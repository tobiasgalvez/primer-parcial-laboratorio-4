import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VehiculosService } from '../../servicios/vehiculos.service';

@Component({
  selector: 'app-tabla-vehiculos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-vehiculos.component.html',
  styleUrl: './tabla-vehiculos.component.scss'
})
export class TablaVehiculosComponent {

  //vehiculos: any[] = []; // Listado de vehículos
  @Input() vehiculos: any[] = []; // Recibe el listado de vehículos
  @Output() vehiculoSeleccionado = new EventEmitter<any>(); // Emite el vehículo seleccionado

  constructor(private vehiculosService: VehiculosService) {}

  ngOnInit(): void {
    // Obtener los vehículos de Firestore
    this.vehiculosService.getVehiculos().subscribe((data) => {
      this.vehiculos = data; // Asigna los datos obtenidos a la lista
    });
  }

  seleccionarVehiculo(vehiculo: any) {
    this.vehiculoSeleccionado.emit(vehiculo); // Emitir el vehículo seleccionado
  }

}
