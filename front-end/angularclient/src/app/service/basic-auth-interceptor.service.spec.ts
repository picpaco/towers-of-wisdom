/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BasicAuthHtppInterceptorService } from './basic-auth-interceptor.service';

describe('Service: BasicAuthInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BasicAuthHtppInterceptorService]
    });
  });

  it('should ...', inject([BasicAuthHtppInterceptorService], (service: BasicAuthHtppInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
