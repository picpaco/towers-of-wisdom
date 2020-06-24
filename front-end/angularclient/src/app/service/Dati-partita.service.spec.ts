/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DatiPartitaService } from './Dati-partita.service';

describe('Service: DatiPartita', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatiPartitaService]
    });
  });

  it('should ...', inject([DatiPartitaService], (service: DatiPartitaService) => {
    expect(service).toBeTruthy();
  }));
});
