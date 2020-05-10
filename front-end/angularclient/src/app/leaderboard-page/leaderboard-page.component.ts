import { Component, OnInit } from "@angular/core";
import { Giocatore } from "../model/giocatore";
import { GiocatoreService } from "../service/giocatore-service.service";
import { EmailValidator } from "@angular/forms";
import { getMaxListeners } from "process";

@Component({
  selector: "app-leaderboard-page",
  templateUrl: "./leaderboard-page.component.html",
  styleUrls: ["./leaderboard-page.component.css"],
})
export class LeaderboardPageComponent implements OnInit {
  public giocatori: Giocatore[];

  public classifica: Giocatore[];

  

  constructor(private giocatoreService: GiocatoreService) {}

  ngOnInit(): void {
    this.giocatoreService.findAll().subscribe((data) => {
      this.giocatori = data;
    });

  }

  public ordinaClassifica(): void {
    //funzione per ordinare i giocatori in ordine decrescente

    this.classifica = this.giocatori.sort((a: Giocatore, b: Giocatore) => {
      if (a.punteggioTotale > b.punteggioTotale) {
        return -1;
      } else {
        return 1;
      }
    });
  }



  public mostraTabella(){
    if (
      this.giocatori.length > 0 &&
      this.giocatori[0].nome !== "" &&
      this.giocatori[0].nome !== null
    ) {
      this.ordinaClassifica();
      return true;
    }else{
      return false;
    }
    }
  }

