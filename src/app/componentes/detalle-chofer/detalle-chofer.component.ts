import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detalle-chofer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-chofer.component.html',
  styleUrl: './detalle-chofer.component.scss'
})
export class DetalleChoferComponent {
  @Input() chofer: any; // Recibe el chofer seleccionado

}
