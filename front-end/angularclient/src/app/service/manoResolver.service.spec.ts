/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ManoResolverService } from './manoResolver.service';

describe('Service: ManoResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManoResolverService]
    });
  });

  it('should ...', inject([ManoResolverService], (service: ManoResolverService) => {
    expect(service).toBeTruthy();
  }));
});
