import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
import { Giocatore } from "../model/giocatore";
import { Carta } from "../model/Carta";

@Component({
  selector: "app-match-page",
  templateUrl: "./match-page.component.html",
  styleUrls: ["./match-page.component.css"],
})
export class MatchPageComponent implements OnInit {
  public player: Giocatore;

  public mazzo: Carta[];

  constructor() {}

  ngOnInit() {
    //this.player = new Giocatore("Julian");
    this.mazzo = [
      new Carta("sinistra"),
      new Carta("centro"),
      new Carta("destra"),
    ];
    console.log(this.mazzo);
  }

  public showMessage() {
    //viene invocato quando il tasto con l'icona del messaggio viene premuto
    $(document).ready(function () {
      $(".chat").toggle();
    });
  }

  public hideMessage() {
    //viene invocato quando il tasto con l'icona della x viene premuto nel pannello del messaggio
    $(document).ready(function () {
      $(".chat").hide();
    });
  }

  public toggleCard(card: string) {
    //funzione per selezionare/deselezionare graficamente le carte con una animazione su e giu;

    console.log(this.mazzo);

    this.mazzo.forEach((carta) => {
      if (carta.getPosition() === card && !carta.isSelected()) {
        $(document).ready(function () {
          $(".carta-di-" + card).css({
            "box-shadow":
              "1px 1px 3px white,-1px 1px 3px white,1px -1px 3px white,-1px -1px 3px white"
          });
        });
        carta.setSelected(true);
      } else {
        $(document).ready(function () {
          $(".carta-di-" + carta.getPosition()).css({ "box-shadow":"none" });
        });
        carta.setSelected(false);
      }
    });
  }
}
