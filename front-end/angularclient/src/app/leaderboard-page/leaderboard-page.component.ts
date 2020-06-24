import { Component, OnInit } from "@angular/core";
import { Giocatore } from "../model/giocatore";
import { GiocatoreService } from "../service/giocatore-service.service";
import { EmailValidator } from "@angular/forms";
import { getMaxListeners } from "process";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-leaderboard-page",
  templateUrl: "./leaderboard-page.component.html",
  styleUrls: ["./leaderboard-page.component.css"],
})
export class LeaderboardPageComponent implements OnInit {
  public giocatori: Giocatore[];

  public classifica: Giocatore[];

  public show :Boolean;

  constructor(private giocatoreService: GiocatoreService, private activatedRoute: ActivatedRoute,) {

  }

  ngOnInit(): void {
    this.giocatoreService.findAll().subscribe((data) => {
      this.giocatori = data;
    });
    
  }

  public ordinaClassifica(): void {
    //funzione per ordinare i giocatori in ordine decrescente in base al punteggioTotale

  /*  this.classifica = this.giocatori.sort((a: Giocatore, b: Giocatore) => {
      if (a.punteggioTotale > b.punteggioTotale) {
        return -1;
      } else {
        return 1;
      }
    });*/
  }

  public mostraTabella() {
    
    if (
      this.giocatori.length > 0 &&
      this.giocatori[0]!==null
    ) {
      this.show = true;
      this.percentualeVittorie();
      this.ordinaClassifica();
    } else {
      this.show = false;
    }
  }

  public percentualeVittorie(){
    //funzione che ricava la percentuale di Vittorie,per poi impostarle a tutti i giocatori
    /*this.giocatori.forEach( giocatore  => {
      giocatore.percentualeVittorie=((giocatore.partiteVinte/giocatore.partiteGiocate)*100).toFixed()+"%";
    });
    */
  //}
  
}
}
