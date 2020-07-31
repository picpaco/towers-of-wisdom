import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable, empty, BehaviorSubject } from "rxjs";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Carta } from '../model/Carta';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class DatiPartitaService {
  
  
  constructor(private http: HttpClient) { }


  public finePartita(oggettoDTO: any) {
    return this.http.post<Carta>("http://localhost:8080/finePartita", JSON.stringify(oggettoDTO));
  }

  public iniziaPartitaConBot(token: String){
    //console.log("siamo dentro inizia partita con bot e nel token c'è: " + );
    return this.http.get<any>("http://localhost:8080/partitaConBot" , );
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
  
  constructor(
    private router: Router,
    private http: HttpClient,
    private datiPartita:DatiPartitaService
) {
  
}




  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let user = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    console.log("nel token c'è: " + token);
    return this.datiPartita.iniziaPartitaConBot(token).pipe(
      catchError((error) => {
        return empty();
      })
    );
  }

}
