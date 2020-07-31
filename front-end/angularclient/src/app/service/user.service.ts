import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/model/user';
import { ɵangular_packages_platform_browser_platform_browser_d } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

//Implementazione metodi user service
@Injectable({ providedIn: 'root' })
export class UserService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  constructor(
    private router: Router,
    private http: HttpClient
) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
}

public get userValue(): User {
  return this.userSubject.value;
}

    getAll() {
        return this.http.get<User[]>("http://localhost:8080/utenti");
    }

    register(user: User) {
      console.log("Dentro il metodo register c'è: " + user.username + " " + user.password);
      return this.http.post<User>("http://localhost:8080/register", user)
    }

    delete(id: number) {
        return this.http.delete(`http://localhost:8080/utenti/users/${id}`);
    }
}

//Vecchio codice antecedente alla prova di connessione con back end
/*import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs/internal/Observable';
import { Giocatore } from '../model/giocatore';

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
}*/
