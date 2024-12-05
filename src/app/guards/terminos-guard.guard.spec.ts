import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { terminosGuardGuard } from './terminos-guard.guard';

describe('terminosGuardGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => terminosGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
