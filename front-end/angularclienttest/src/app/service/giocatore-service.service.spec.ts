import { TestBed } from '@angular/core/testing';

import { GiocatoreService } from './giocatore-service.service';

describe('GiocatoreServiceService', () => {
  let service: GiocatoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GiocatoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
