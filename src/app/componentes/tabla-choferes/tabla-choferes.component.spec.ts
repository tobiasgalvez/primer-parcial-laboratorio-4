import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaChoferesComponent } from './tabla-choferes.component';

describe('TablaChoferesComponent', () => {
  let component: TablaChoferesComponent;
  let fixture: ComponentFixture<TablaChoferesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaChoferesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaChoferesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
