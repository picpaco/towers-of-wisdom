import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { BehaviorSubject, Observable, config } from 'rxjs';
import { User } from 'src/app/model/user'



@Injectable({
  providedIn: "root",
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private httpClient: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }
  
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
}


  public getNomeGiocatore() {
    return sessionStorage.getItem("username");
  }

  authenticate(username, password) {
    console.log("in authenticate(): " + username + " " + password);
    return this.httpClient
      .post<any>("http://localhost:8080/authenticate", { username, password })
      .pipe(
        map((user) => {
          sessionStorage.setItem('currentUser', JSON.stringify(user)); 
          console.log(sessionStorage);     
          let tokenStr = user.token;
          console.log(tokenStr);
          sessionStorage.setItem("token", tokenStr);
          return user;
        })
      );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("currentUser");
    console.log("è autenticato l'utente? "+!(user === null));
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }
}
