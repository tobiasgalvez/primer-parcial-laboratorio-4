import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleChoferComponent } from './detalle-chofer.component';

describe('DetalleChoferComponent', () => {
  let component: DetalleChoferComponent;
  let fixture: ComponentFixture<DetalleChoferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleChoferComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleChoferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
