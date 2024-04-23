import { TestBed } from '@angular/core/testing';

import { SuperviseurGuard } from './superviseur.guard';

describe('SuperviseurGuard', () => {
  let guard: SuperviseurGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SuperviseurGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
