import { TestBed } from '@angular/core/testing';

import { InfoTransportService } from './info-transport.service';

describe('InfoTransportService', () => {
  let service: InfoTransportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoTransportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
