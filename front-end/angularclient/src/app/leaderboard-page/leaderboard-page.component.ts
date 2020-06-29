import { Component, OnInit } from "@angular/core";
import { Giocatore, GiocatoreAdapter } from "../model/giocatore";
import { GiocatoreService } from "../service/giocatore-service.service";
import { EmailValidator } from "@angular/forms";
import { getMaxListeners } from "process";
import { ActivatedRoute } from "@angular/router";
import { asyncScheduler } from "rxjs";
import { strict } from "assert";

@Component({
  selector: "app-leaderboard-page",
  templateUrl: "./leaderboard-page.component.html",
  styleUrls: ["./leaderboard-page.component.css"],
})
export class LeaderboardPageComponent implements OnInit {
  public giocatori: Giocatore[];

  public classifica: Giocatore[];

  public show: Boolean;

  constructor(
    private giocatoreAdapter: GiocatoreAdapter,
    private giocatoreService: GiocatoreService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.riceviRisultatiPartiteDTO();
  }

  private async riceviRisultatiPartiteDTO() {
    let testoJson: any;
    let func = () => {
      let size: number = testoJson["length"];
      for (let i = 0; i < size; i++) {
        console.log(testoJson[i.toString()]);
        if (this.giocatori == undefined) {
          this.giocatori = [
            this.giocatoreAdapter.adapt(testoJson[i.toString()]),
          ];
        } else {
          this.giocatori.push(
            this.giocatoreAdapter.adapt(testoJson[i.toString()])
          );
        }
      }
      console.log(this.giocatori);
    };
    this.giocatoreService.risultatiPartite().subscribe((data) => {
      testoJson = data;
    });
    asyncScheduler.schedule(func, 1000);
  }
}
