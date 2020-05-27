import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private utentiUrl: string;

  constructor(private http: HttpClient) {
    this.utentiUrl = 'http://localhost:8080/utenti';
  }


  public findAll(): Observable<User[]> {
    let username = "stefano89";
    let password = "stefanorusso";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.get<User[]>(this.utentiUrl, { headers });
  }
  
  public save(utente: User) {
    let username = "stefano89";
    let password = "stefanorusso";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.post<User>(this.utentiUrl, utente, {headers});
  }
}
