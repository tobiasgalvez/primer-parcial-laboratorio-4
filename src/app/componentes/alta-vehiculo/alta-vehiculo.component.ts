import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { VehiculosService } from '../../servicios/vehiculos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alta-vehiculo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './alta-vehiculo.component.html',
  styleUrls: ['./alta-vehiculo.component.scss']
})
export class AltaVehiculoComponent {
  vehiculoForm: FormGroup;
  mensajeExito: string = ''; // Para mostrar mensajes de éxito

  constructor(private fb: FormBuilder, private vehiculosService: VehiculosService) {
    this.vehiculoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      tipo: ['', Validators.required],
      ruedas: ['', [Validators.required, Validators.max(6)]],
      capacidad: ['', [Validators.required, Validators.min(2), Validators.max(100)]],
    });
  }

  crearVehiculo() {
    if (this.vehiculoForm.valid) {
      this.vehiculosService.agregarVehiculo(this.vehiculoForm.value).then(() => {
        this.vehiculoForm.reset(); // Limpiar el formulario después de agregar
        this.mostrarMensajeExito('Vehículo agregado con éxito');
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
