/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MazzoService } from './mazzo.service';

describe('Service: Mazzo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MazzoService]
    });
  });

  it('should ...', inject([MazzoService], (service: MazzoService) => {
    expect(service).toBeTruthy();
  }));
});
