import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, updateDoc, deleteDoc, doc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehiculosService {
  private vehiculosCollection;

  constructor(private firestore: Firestore) {
    this.vehiculosCollection = collection(this.firestore, 'vehiculos');
  }

  getVehiculos(): Observable<any[]> {
    return collectionData(this.vehiculosCollection, { idField: 'id' });
  }

  agregarVehiculo(vehiculo: any): Promise<any> {
    return addDoc(this.vehiculosCollection, vehiculo);
  }

  modificarVehiculo(id: string, vehiculo: any): Promise<void> {
    const vehiculoDoc = doc(this.firestore, `vehiculos/${id}`);
    return updateDoc(vehiculoDoc, vehiculo);
  }

  borrarVehiculo(id: string): Promise<void> {
    const vehiculoDoc = doc(this.firestore, `vehiculos/${id}`);
    return deleteDoc(vehiculoDoc);
  }
}
