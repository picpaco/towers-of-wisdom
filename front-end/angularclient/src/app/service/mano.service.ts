import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Carta } from "../model/Carta";
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ManoService {
  constructor(private http: HttpClient) { }

  public getMano(): Observable<Carta[]> {
    let username = "stefano89";
    let password = "stefanorusso";
    const headers = new HttpHeaders({ Authorization: "Basic " + btoa(username + ":" + password) });
    const observable = this.http.get<Carta[]>("http://localhost:8080/inizia-partita", { headers });
    return observable;
  }

  public addCartaSuTorre(carta: Carta) {
    let username = "stefano89";
    let password = "stefanorusso";
    const headers = new HttpHeaders({ Authorization: "Basic " + btoa(username + ":" + password), "Content-Type": "application/json" });
    return this.http.post<Carta>("http://localhost:8080/giocaSuTorre", JSON.stringify(carta), { headers });
  }

  public addCartaMazzoScarti(carta: Carta) {
    let username = "stefano89";
    let password = "stefanorusso";
    const headers = new HttpHeaders({ Authorization: "Basic " + btoa(username + ":" + password), "Content-Type": "application/json" });
    return this.http.post<Carta>("http://localhost:8080/scartaCarta", JSON.stringify(carta), { headers });
  }


}

@Injectable({
  providedIn: "root",
})
export class MazzoCopertoService {
  constructor(private http: HttpClient) { }

  public pescaDalMazzoCoperto(): Observable<Carta[]> {
    let username = "stefano89";
    let password = "stefanorusso";
    const headers = new HttpHeaders({ Authorization: "Basic " + btoa(username + ":" + password), });
    const observable = this.http.get<Carta[]>("http://localhost:8080/pescaDalMazzoCoperto", { headers });
    return observable;
  }
}

@Injectable({
  providedIn: "root",
})
export class MazzoScartiService {
  constructor(private http: HttpClient) { }

  public selezionaLaCartaDaPescareDalMazzoScarti(carta: Carta): Observable<Carta[]> {
    let username = "stefano89";
    let password = "stefanorusso";
    const headers = new HttpHeaders({ Authorization: "Basic " + btoa(username + ":" + password), "Content-Type": "application/json" });
    const observable = this.http.post<Carta[]>("http://localhost:8080/selezionaDalMazzoScarti", JSON.stringify(carta), { headers });
    return observable;
  }


  // public aggiornaManoGiocatore(): Observable<Carta[]> {
  //   let username = "stefano89";
  //   let password = "stefanorusso";
  //   const headers = new HttpHeaders({
  //     Authorization: "Basic " + btoa(username + ":" + password),
  //   });
  //   const observable = this.http.get<Carta[]>(
  //     "http://localhost:8080/pescaDalMazzoScarti",
  //     { headers }
  //   );
  //   return observable;
  // }
}
