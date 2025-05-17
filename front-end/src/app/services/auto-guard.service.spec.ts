import { TestBed } from '@angular/core/testing';

import { AutoGuardService } from './auto-guard.service';

describe('AutoGuardService', () => {
  let service: AutoGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
