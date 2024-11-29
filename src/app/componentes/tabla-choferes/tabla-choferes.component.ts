import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { collection, Firestore, onSnapshot } from '@angular/fire/firestore';

@Component({
  selector: 'app-tabla-choferes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-choferes.component.html',
  styleUrls: ['./tabla-choferes.component.scss'] // Debe ser 'styleUrls', no 'styleUrl'
})
export class TablaChoferesComponent implements OnInit {

  choferes: any[] = [];
  @Output() choferSeleccionado = new EventEmitter<any>();

  // Declaramos 'firestore' como una propiedad privada de la clase
  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    // Crear referencia a la colección
    const choferesRef = collection(this.firestore, 'alta-choferes');

    // Escuchar los cambios en tiempo real
    onSnapshot(choferesRef, (snapshot) => {
      this.choferes = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    });
  }

  seleccionarChofer(chofer: any) {
    this.choferSeleccionado.emit(chofer);  // Emitir el chofer seleccionado
  }
}
