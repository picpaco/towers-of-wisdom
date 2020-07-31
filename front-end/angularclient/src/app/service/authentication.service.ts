import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { BehaviorSubject, Observable, config } from 'rxjs';
import { User } from 'src/app/model/user'
import { Router } from '@angular/router';



@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
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

  login(username,password): Observable<any> {
      return this.http.post<User>("http://localhost:8080/authenticate",{
          username,
          password
      })
          .pipe(map(user => {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('user', JSON.stringify(user));
              this.userSubject.next(user);
              console.log("nello user c'è: " + user.username + " " + user.token);
              return user;
          }));
  }

  public getNomeGiocatore() {
    return sessionStorage.getItem("username");
  }

  
  /*isUserLoggedIn() {
    let user = sessionStorage.getItem("user");
    console.log("è autenticato l'utente? "+!(user === null));
    return !(user === null);
  }*/

  logOut() {
    sessionStorage.removeItem("user");
    this.userSubject.next(null);
    this.router.navigate(['/']);
  }
}



/*authenticate(username, password) {
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
  }*/
