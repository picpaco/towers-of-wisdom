import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../model/user';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private nomeGiocatore: string;
  constructor(private httpClient:HttpClient) { 
     }

    public getNomeGiocatore(){
      return this.nomeGiocatore;
    }

  authenticate(username, password): Observable<User> {
    let utente: any;
    this.nomeGiocatore = username;
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    //headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    return this.httpClient.get<User>('http://localhost:8080/validateLogin',{headers}).pipe(
     map(
       userData => {
        sessionStorage.setItem('username',username);
        return userData;
       }
     )

    )
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
  }
}