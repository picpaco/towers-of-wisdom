import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Giocatore } from "../model/giocatore";
import { Observable } from "rxjs";
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
    let username ;
    let password ;
    const headers = new HttpHeaders({Authorization: "Basic " + btoa(username + ":" + password)});
    return this.http.get<Giocatore[]>('http://localhost:8080/menu-di-gioco',{headers});
  }

  public save(giocatore: Giocatore) {
    return this.http.post<Giocatore>(this.giocatoriUrl, giocatore);
  }

  public risultatiPartite() {
    return this.http.get<any>('http://localhost:8080/classifica');
  }
}
