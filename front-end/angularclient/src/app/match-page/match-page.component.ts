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
      new Carta("Quadrato"),
      new Carta("Cerchio"),
      new Carta("Ancora"),
      new Carta("Triangolo"),
    ];
    this.mostraMazzo();
    console.log(this.mazzo);
  }
  private mostraMazzo(): void {
    /*funzione per proiettare corretamente le carte,
    nei corrispettivi colori e a associare per una un id*/
    this.mazzo.forEach((carta, index = 0) => {
      $(document).ready(function () {
        let classe = carta.getSymbol();
        $(".mazzo > div:eq(" + index + ")")
          .addClass(classe)
          .attr("id", "id" + index);
      });
      this.mazzo[index].setId(index);
    });
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

  public toggleCard(cardId: string) {
    //funzione per selezionare/deselezionare graficamente le carte con una animazione su e giu;

    console.log(this.mazzo);

    this.mazzo.forEach((carta, index = 0) => {
      if (carta.getId() === cardId && !carta.isSelected()) {
        $(document).ready(function () {
          $(".mazzo > div:eq(" + index + ")").css({
            "box-shadow":
              "1px 1px 3px white,-1px 1px 3px white,1px -1px 3px white,-1px -1px 3px white",
          });
        });
        carta.setSelected(true);
      } else {
        $(document).ready(function () {
          $(".mazzo > div:eq(" + index + ")").css({ "box-shadow": "none" });
        });
        carta.setSelected(false);
      }
    });
  }
}
