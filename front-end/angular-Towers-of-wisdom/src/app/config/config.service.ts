import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private urlApplication :String;

  constructor(private http: HttpClient) {
this.urlApplication='http://localhost:8080/giocatori';

  }
}
