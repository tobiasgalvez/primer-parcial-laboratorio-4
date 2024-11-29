import { Component, EventEmitter, Output } from '@angular/core';
import { PaisesService } from '../../servicios/paises.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-paises',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-paises.component.html',
  styleUrl: './lista-paises.component.scss'
})
export class ListaPaisesComponent {

  paisesFiltrados: any[] = [];
  @Output() paisSeleccionado = new EventEmitter<string>(); // Emisor para el país seleccionado

  constructor(private paisesService: PaisesService) { }

  ngOnInit(): void {
    this.paisesService.getPaises().subscribe((data: any[]) => {
      // Filtra países de América y Europa
      this.paisesFiltrados = data.filter(pais => 
        pais.region === 'Americas' || pais.region === 'Europe'
      ).slice(0, 10); // Limita a 3 países
    });
  }

  seleccionarPais(pais: any) {
    const nombreEnEspanol = pais.translations?.spa?.common || pais.name.common; // Prioriza el nombre en español
    this.paisSeleccionado.emit(nombreEnEspanol); // Emitir el nombre en español o común
  }
  

}
