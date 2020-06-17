import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Carta } from "../model/Carta";
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ManoService {
  constructor(private http: HttpClient) {}

  public getMano(): Observable<Carta[]> {
    let username = "stefano89";
    let password = "stefanorusso";
    const headers = new HttpHeaders({
      Authorization: "Basic " + btoa(username + ":" + password),
    });
    const observable = this.http.get<Carta[]>(
      "http://localhost:8080/menu-di-gioco",
      { headers }
    );
    return observable;
  }
  public addCartaSuTorre(carta: Carta) {
    let username = "stefano89";
    let password = "stefanorusso";
    const headers = new HttpHeaders({
      Authorization: "Basic " + btoa(username + ":" + password),"Content-Type": "application/json"
    });

    //"Content-Type": "application/json",
    return this.http.post<Carta>("http://localhost:8080/giocaSuTorre",JSON.stringify(carta), {
      headers,
    });
  }
}

@Injectable({
  providedIn: "root",
})
export class MazzoCopertoService {
  constructor(private http: HttpClient) {}

  public getNuovaMano(): Observable<Carta[]> {
    let username = "stefano89";
    let password = "stefanorusso";
    const headers = new HttpHeaders({
      Authorization: "Basic " + btoa(username + ":" + password),
    });
    const observable = this.http.get<Carta[]>(
      "http://localhost:8080/pescaDalMazzoCoperto",
      { headers }
    );
    return observable;
  }
}
