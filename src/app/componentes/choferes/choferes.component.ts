import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { ChoferesService } from '../../servicios/choferes.service';
import { DetalleChoferComponent } from '../detalle-chofer/detalle-chofer.component';
import { DetallePaisComponent } from '../detalle-pais/detalle-pais.component';
import { TablaChoferesComponent } from '../tabla-choferes/tabla-choferes.component';
import * as XLSX from 'xlsx'; // Importación de XLSX
import { CommonModule } from '@angular/common';
import * as Papa from 'papaparse'; // Importa Papaparse

@Component({
  selector: 'app-choferes',
  standalone: true,
  imports: [TablaChoferesComponent, DetalleChoferComponent, DetallePaisComponent, CommonModule],
  templateUrl: './choferes.component.html',
  styleUrls: ['./choferes.component.scss']
})
export class ChoferesComponent implements OnInit {
  choferSeleccionado: any; // Chofer seleccionado
  choferes: any[] = []; // Lista de choferes
  esAdministrador: boolean = false; // Indica si el usuario es administrador

  constructor(private auth: Auth, private choferesService: ChoferesService) {}

  ngOnInit(): void {
    // Verificar si el usuario autenticado es administrador
    this.auth.onAuthStateChanged((user) => {
      if (user && user.email === 'admin@admin.com') {
        this.esAdministrador = true;
      } else {
        this.esAdministrador = false;
      }
    });

    // Obtener choferes desde Firestore
    this.choferesService.getChoferes().subscribe((data) => {
      this.choferes = data; // Asigna los datos obtenidos de Firestore
    });
  }

  generarCSV() {
    if (!this.esAdministrador) {
      console.error('No tienes permisos para generar el CSV');
      return;
    }
  
    // Mapea los datos a un formato adecuado para el CSV
    const datosCSV = this.choferes.map((chofer) => ({
      Nombre: chofer.nombre,
      DNI: chofer.dni,
      Edad: chofer.edad,
      'Licencia Profesional': chofer.licenciaProfesional ? 'Sí' : 'No',
      Nacionalidad: chofer.nacionalidad,
      'Nro de Licencia': chofer.nroLicencia
    }));
  
    // Convertir a CSV usando Papaparse con coma como delimitador
    const csv = Papa.unparse(datosCSV, {
      delimiter: ';', // Asegurar que se utilicen comas como separador
    });
  
    // Agregar BOM al inicio para asegurar codificación UTF-8
    const bom = '\uFEFF';
    const contenidoCSV = bom + csv;
  
    // Crear y descargar el archivo CSV
    const blob = new Blob([contenidoCSV], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'choferes.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  

  mostrarDetalles(chofer: any) {
    this.choferSeleccionado = chofer;
  }
}
