import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ListaPaisesComponent } from "../lista-paises/lista-paises.component";
import { addDoc, collection, Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-alta',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ListaPaisesComponent],
  templateUrl: './alta.component.html',
  styleUrl: './alta.component.scss'
})
export class AltaComponent {

  choferForm: FormGroup;
  nacionalidadSeleccionada: string = ''; // Variable para almacenar la nacionalidad seleccionada

  constructor(private fb: FormBuilder, private firestore: Firestore) { // Inyecta Firestore en el constructor
    this.choferForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(50)]],
      nroLicencia: ['', [Validators.required, Validators.minLength(7), Validators.pattern('^[0-9]+$')]],
      licenciaProfesional: [false], // Checkbox para licencia profesional
      nacionalidad: ['', Validators.required], // Campo de selección para nacionalidad
    });
  }

  // Getters para facilitar el acceso a los controles en el template
  get nombre() { return this.choferForm.get('nombre'); }
  get dni() { return this.choferForm.get('dni'); }
  get edad() { return this.choferForm.get('edad'); }
  get nroLicencia() { return this.choferForm.get('nroLicencia'); }
  get licenciaProfesional() { return this.choferForm.get('licenciaProfesional'); }
  get nacionalidad() { return this.choferForm.get('nacionalidad'); }

  onPaisSeleccionado(pais: string) {
    this.nacionalidadSeleccionada = pais; // Actualiza la variable con la nacionalidad seleccionada
    this.choferForm.patchValue({ nacionalidad: pais });
  }

  async onSubmit() {
    if (this.choferForm.valid) {
      console.log('Datos del formulario:', this.choferForm.value);

      // Aquí guardamos los datos en Firestore
      try {
        const docRef = await addDoc(collection(this.firestore, 'alta-choferes'), this.choferForm.value);
        console.log('Documento escrito con ID: ', docRef.id);
        // Aquí podrías mostrar un mensaje de éxito o redirigir a otra página
      } catch (e) {
        console.error('Error agregando documento: ', e);
      }
    }
  }
}
