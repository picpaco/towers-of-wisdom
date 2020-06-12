import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Giocatore } from "../model/giocatore";
import { Observable, observable } from "rxjs";
import { Carta, CartaAdapter } from "../model/Carta";
import { map } from "rxjs/operators";

@Injectable()
export class GiocatoreService {
  private giocatoriUrl: string;

  constructor(private http: HttpClient, private CartaAdapter: CartaAdapter) {
    this.giocatoriUrl = "http://localhost:8080/giocatori";
  }

  getCarte(): Observable<Carta[]> {
    
    return this.http.get<Carta[]>("http://localhost:8080/match").pipe(
      // Adapt each item in the raw data array
      map((data: any[]) => data.map((item) => this.CartaAdapter.adapt(item)))
    );
  }

  public findAll(): Observable<Giocatore[]> {
    let username = "stefano89";
    let password = "stefanorusso";
    const headers = new HttpHeaders({Authorization: "Basic " + btoa(username + ":" + password)});
    return this.http.get<Giocatore[]>('http://localhost:8080/menu-di-gioco',{headers});
  }

  public inviaDatiGiocatore(nomeGiocatore: string):  Observable<string> {
    let username = "stefano89";
    let password = "stefanorusso";
    const headers = new HttpHeaders({Authorization: "Basic " + btoa(username + ":" + password)});
    return this.http.post<string>('http://localhost:8080/nome',  nomeGiocatore);
  }

  public save(giocatore: Giocatore) {
    return this.http.post<Giocatore>(this.giocatoriUrl, giocatore);
  }
}
