import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BajaVehiculoComponent } from './baja-vehiculo.component';

describe('BajaVehiculoComponent', () => {
  let component: BajaVehiculoComponent;
  let fixture: ComponentFixture<BajaVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BajaVehiculoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BajaVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
