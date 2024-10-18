import { Component } from '@angular/core';
import { TablaChoferesComponent } from "../tabla-choferes/tabla-choferes.component";
import { DetalleChoferComponent } from "../detalle-chofer/detalle-chofer.component";
import { DetallePaisComponent } from "../detalle-pais/detalle-pais.component";

@Component({
  selector: 'app-choferes',
  standalone: true,
  imports: [TablaChoferesComponent, DetalleChoferComponent, DetallePaisComponent],
  templateUrl: './choferes.component.html',
  styleUrl: './choferes.component.scss'
})
export class ChoferesComponent {

  choferSeleccionado: any;

  mostrarDetalles(chofer: any) {
    this.choferSeleccionado = chofer; // Almacena el chofer seleccionado
  }

}
