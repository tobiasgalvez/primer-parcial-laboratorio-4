import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { VehiculosService } from '../../servicios/vehiculos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modificacion-vehiculo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modificacion-vehiculo.component.html',
  styleUrl: './modificacion-vehiculo.component.scss'
})
export class ModificacionVehiculoComponent {

  @Input() vehiculo: any; // Recibe el vehículo seleccionado
  vehiculoForm: FormGroup;
  mensajeExito: string = ''; // Para mostrar mensajes de éxito

  constructor(private fb: FormBuilder, private vehiculosService: VehiculosService) {
    this.vehiculoForm = this.fb.group({
      tipo: ['', Validators.required],
      ruedas: ['', [Validators.required, Validators.max(6)]],
      capacidad: ['', [Validators.required, Validators.min(2), Validators.max(100)]],
    });
  }

  ngOnChanges(): void {
    if (this.vehiculo) {
      this.vehiculoForm.patchValue(this.vehiculo); // Cargar los datos del vehículo
    }
  }

  modificarVehiculo() {
    if (this.vehiculoForm.valid && this.vehiculo?.id) {
      this.vehiculosService
        .modificarVehiculo(this.vehiculo.id, this.vehiculoForm.value)
        .then(() => {
          this.mostrarMensajeExito('Vehículo modificado con éxito');
        });
    }
  }

  mostrarMensajeExito(mensaje: string) {
    this.mensajeExito = mensaje;
    setTimeout(() => {
      this.mensajeExito = ''; // Limpia el mensaje después de 3 segundos
    }, 3000);
  }

}
