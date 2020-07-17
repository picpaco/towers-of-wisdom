import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/model/user';

//Implementazione metodi user service
@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>("http://localhost:8080/utenti");
    }

    register(user: User) {
        return this.http.post("http://localhost:8080/utenti/users/register", user);
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
