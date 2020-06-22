/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BasicAuthInterceptorService } from './basic-auth-interceptor.service';

describe('Service: BasicAuthInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BasicAuthInterceptorService]
    });
  });

  it('should ...', inject([BasicAuthInterceptorService], (service: BasicAuthInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
