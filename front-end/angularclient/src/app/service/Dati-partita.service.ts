import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable, empty } from "rxjs";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Carta } from '../model/Carta';

@Injectable({
  providedIn: 'root'
})
export class DatiPartitaService {

  constructor(private http: HttpClient) { }


  public finePartita(oggettoDTO: any) {
    return this.http.post<Carta>("http://localhost:8080/finePartita", JSON.stringify(oggettoDTO),);
  }

  public iniziaPartitaConBot(){
    return this.http.get<any>("http://localhost:8080/partitaConBot" );
  }

  public giocaBot(){
    return this.http.get<any>("http://localhost:8080/giocaBot" );
  }


  public pescaDalMazzoCoperto(){
    return this.http.get<any>("http://localhost:8080/pescaDalMazzoCopertoUmano");
  }

  public giocatoreGiocaCartaSuTorre(carta: Carta) {
    return this.http.post<Carta>("http://localhost:8080/giocaSuTorre", JSON.stringify(carta),);
  }

  public giocatoreScartaCartaSuScarti(carta: Carta) {
    return this.http.post<Carta>("http://localhost:8080/scartaCarta", JSON.stringify(carta));
  }

  public selezionaLaCartaDaPescareDalMazzoScarti(carta: Carta) {
    return this.http.post<Carta[]>("http://localhost:8080/selezionaDalMazzoScarti", JSON.stringify(carta));
  }

}


@Injectable({
  providedIn: "root",
})
export class DatiPartitaResolverService implements Resolve<any> {

  constructor(private datiPartita:DatiPartitaService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.datiPartita.iniziaPartitaConBot().pipe(
      catchError((error) => {
        return empty();
      })
    );
  }

}
