import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

export class User {
  constructor(public status: string) {}
}

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {

 private headers = new HttpHeaders({'Access-Control-Allow-Origin' : '*'});

  constructor(private httpClient: HttpClient) {}
  // Provide username and password for authentication, and once authentication is successful,
  //store JWT token in session

  public getNomeGiocatore() {
    return sessionStorage.getItem("username");
  }

  authenticate(username, password) {
    return this.httpClient
      .post<any>("http://localhost:8080/authenticate", { username, password })
      .pipe(
        map((userData) => {
          sessionStorage.setItem("username", username);
          let tokenStr = userData.token;
          console.log(tokenStr);
          sessionStorage.setItem("token", tokenStr);
          return userData;
        })
      );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("username");
    console.log("è autenticato l'utente? "+!(user === null));
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem("username");
  }
}
