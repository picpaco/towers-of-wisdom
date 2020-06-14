/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MazzoResolverService } from './manoResolver.service';

describe('Service: MazzoResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MazzoResolverService]
    });
  });

  it('should ...', inject([MazzoResolverService], (service: MazzoResolverService) => {
    expect(service).toBeTruthy();
  }));
});
