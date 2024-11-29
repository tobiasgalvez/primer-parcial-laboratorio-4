import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificacionVehiculoComponent } from './modificacion-vehiculo.component';

describe('ModificacionVehiculoComponent', () => {
  let component: ModificacionVehiculoComponent;
  let fixture: ComponentFixture<ModificacionVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificacionVehiculoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificacionVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
