import { Component, OnInit } from '@angular/core';
import { VehiculosService } from '../../servicios/vehiculos.service';
import { TablaVehiculosComponent } from '../tabla-vehiculos/tabla-vehiculos.component';
import { AltaVehiculoComponent } from '../alta-vehiculo/alta-vehiculo.component';
import { ModificacionVehiculoComponent } from '../modificacion-vehiculo/modificacion-vehiculo.component';
import { BajaVehiculoComponent } from '../baja-vehiculo/baja-vehiculo.component';
import { Auth } from '@angular/fire/auth'; // Importación para Firebase Authentication
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vehiculos',
  standalone: true,
  imports: [TablaVehiculosComponent, AltaVehiculoComponent, ModificacionVehiculoComponent, BajaVehiculoComponent, CommonModule],
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.scss']
})
export class VehiculosComponent implements OnInit {
  vehiculos: any[] = []; // Almacena el listado de vehículos
  vehiculoSeleccionado: any = null; // Almacena el vehículo seleccionado para modificar o borrar
  esAdministrador: boolean = false; // Indica si el usuario es administrador

  constructor(private vehiculosService: VehiculosService, private auth: Auth) {}

  ngOnInit(): void {
    // Verificar si el usuario es administrador basándose en el email
    this.auth.onAuthStateChanged((user) => {
      if (user && user.email === 'admin@admin.com') {
        this.esAdministrador = true; // Es administrador
      } else {
        this.esAdministrador = false; // No es administrador
      }
    });

    // Obtener los vehículos desde Firestore al cargar el componente
    this.vehiculosService.getVehiculos().subscribe((data) => {
      this.vehiculos = data; // Asigna los datos obtenidos de Firestore a la lista local
    });
  }

  generarPDF() {
    if (!this.esAdministrador) {
      console.error('No tienes permisos para generar el PDF');
      return;
    }
  
    const doc = new jsPDF();
  
    // Obtener fecha y hora actual
    const fecha = new Date();
    const fechaFormateada = fecha.toLocaleDateString(); // Formato de fecha (dd/mm/yyyy)
    const horaFormateada = fecha.toLocaleTimeString(); // Formato de hora (hh:mm:ss)
  
    // Título del documento con fecha y hora
    doc.setFontSize(18);
    doc.text(`Listado de Vehículos al ${fechaFormateada} ${horaFormateada}`, 14, 22);
  
    // Definir las columnas y filas
    const columnas = ['Nombre', 'Ruedas', 'Tipo', 'Capacidad'];
    const filas = this.vehiculos.map((vehiculo) => [
      vehiculo.nombre,
      vehiculo.ruedas,
      vehiculo.tipo,
      vehiculo.capacidad,
    ]);
  
    // Agregar tabla al PDF
    autoTable(doc, {
      head: [columnas],
      body: filas,
      startY: 30,
      styles: {
        fontSize: 10,
        cellPadding: 5,
        halign: 'center',
      },
      headStyles: { fillColor: [41, 128, 185] }, // Azul para encabezado
      bodyStyles: { fillColor: [255, 255, 255] }, // Blanco para celdas
    });
  
    // Descargar el PDF
    doc.save('vehiculos.pdf');
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
