import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChoferesService {
  constructor(private firestore: Firestore) {}

  getChoferes(): Observable<any[]> {
    const choferesRef = collection(this.firestore, 'alta-choferes');
    return collectionData(choferesRef, { idField: 'id' });
  }
}
