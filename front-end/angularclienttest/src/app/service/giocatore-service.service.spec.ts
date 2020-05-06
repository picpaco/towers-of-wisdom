import { TestBed } from '@angular/core/testing';

import { GiocatoreServiceService } from './giocatore-service.service';

describe('GiocatoreServiceService', () => {
  let service: GiocatoreServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GiocatoreServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
