import { Component, OnInit } from '@angular/core';
import { VehiculosService } from '../../servicios/vehiculos.service';
import { TablaVehiculosComponent } from '../tabla-vehiculos/tabla-vehiculos.component';
import { AltaVehiculoComponent } from '../alta-vehiculo/alta-vehiculo.component';
import { ModificacionVehiculoComponent } from '../modificacion-vehiculo/modificacion-vehiculo.component';
import { BajaVehiculoComponent } from '../baja-vehiculo/baja-vehiculo.component';

@Component({
  selector: 'app-vehiculos',
  standalone: true,
  imports: [TablaVehiculosComponent, AltaVehiculoComponent, ModificacionVehiculoComponent, BajaVehiculoComponent],
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.scss']
})
export class VehiculosComponent implements OnInit {
  vehiculos: any[] = []; // Almacena el listado de vehículos
  vehiculoSeleccionado: any = null; // Almacena el vehículo seleccionado para modificar o borrar

  constructor(private vehiculosService: VehiculosService) {}

  ngOnInit(): void {
    // Obtener los vehículos desde Firestore al cargar el componente
    this.vehiculosService.getVehiculos().subscribe((data) => {
      this.vehiculos = data; // Asigna los datos obtenidos de Firestore a la lista local
    });
  }

  agregarVehiculo(nuevoVehiculo: any) {
    // Agrega el vehículo en Firestore y actualiza la lista local
    this.vehiculosService.agregarVehiculo(nuevoVehiculo).then(() => {
      console.log('Vehículo agregado con éxito.');
    });
  }

  seleccionarVehiculo(vehiculo: any) {
    this.vehiculoSeleccionado = vehiculo; // Selecciona un vehículo para modificar o eliminar
  }

  actualizarVehiculo(vehiculoModificado: any) {
    // Modifica el vehículo en Firestore y actualiza la lista local
    this.vehiculosService.modificarVehiculo(vehiculoModificado.id, vehiculoModificado).then(() => {
      console.log('Vehículo modificado con éxito.');
    });
  }

  borrarVehiculo(vehiculo: any) {
    // Elimina el vehículo de Firestore y actualiza la lista local
    this.vehiculosService.borrarVehiculo(vehiculo.id).then(() => {
      console.log('Vehículo eliminado con éxito.');
      this.vehiculoSeleccionado = null; // Limpia la selección
    });
  }
}
