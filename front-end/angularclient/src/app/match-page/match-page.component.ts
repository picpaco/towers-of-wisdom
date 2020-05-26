import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
import { Giocatore } from "../model/giocatore";
import { Carta } from "../model/Carta";
import { delay } from "rxjs/operators";

@Component({
  selector: "app-match-page",
  templateUrl: "./match-page.component.html",
  styleUrls: ["./match-page.component.css"],
})
export class MatchPageComponent implements OnInit {
  public player: Giocatore;
  public mazzo: Carta[];
  public mazzoCoperto: Carta[];
  public mazzoScarti: Carta[];

  constructor() {}

  ngOnInit() {
    //this.player = new Giocatore("Julian");
    this.mazzo = [
      new Carta("Ancora", "1"),
      new Carta("Cerchio", "4"),
      new Carta("Punta", "P"),
    ];

    this.mostraMazzo();
    this.inizializzaMazzoScarti();
    this.riempiMazzoCoperto();
  }

  private riempiMazzoCoperto(): void {
    this.mazzoCoperto = [
      new Carta("Quadrato", "1"),
      new Carta("Triangolo", "2"),
      new Carta("Cerchio", "3"),
      new Carta("Triangolo", "4"),
      new Carta("Punta", "P"),
      new Carta("Quadrato", "6"),
      new Carta("Triangolo", "7"),
      new Carta("Ancora", "1"),
      new Carta("Ancora", "2"),
      new Carta("Punta", "P"),
      new Carta("Ancora", "4"),
      new Carta("Ancora", "5"),
      new Carta("Ancora", "6"),
      new Carta("Ancora", "7"),
      new Carta("Triangolo", "1"),
      new Carta("Triangolo", "2"),
      new Carta("Triangolo", "3"),
      new Carta("Triangolo", "4"),
      new Carta("Triangolo", "5"),
      new Carta("Triangolo", "6"),
      new Carta("Triangolo", "7"),
      new Carta("Cerchio", "1"),
      new Carta("Cerchio", "2"),
      new Carta("Cerchio", "3"),
      new Carta("Cerchio", "4"),
      new Carta("Cerchio", "5"),
      new Carta("Cerchio", "6"),
      new Carta("Cerchio", "7"),
      new Carta("Triangolo", "4"),
      new Carta("Triangolo", "1"),
      new Carta("Quadrato", "3"),
      new Carta("Quadrato", "5"),
    ];
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

    console.log("Il mio mazzo");
    console.log(this.mazzo);
  }

  public mostraChat() {
    //viene invocato quando il tasto con l'icona del messaggio viene premuto
    $(document).ready(function () {
      $(".chat").toggle();
    });
  }

  public nascondiChat() {
    //viene invocato quando il tasto con l'icona della x viene premuto nel pannello del messaggio
    $(document).ready(function () {
      $(".chat").hide();
    });
  }

  public selezionaCarta(cardId: string) {
    //funzione per selezionare/deselezionare graficamente le carte

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

  public peschaDalMazzoCoperto() {
    if (this.mazzo.length < 4 && this.mazzo.length > 2) {
      this.mazzo.unshift(this.mazzoCoperto.shift());
      this.mostraMazzo();
      console.log("é stata pescata una carta dal mazzo coperto!");
      /*TO DO:animazione della carta che viene passata*/
    } else {
      this.mostraMessaggioDiAvviso(
        "Devi prima giocare la tua carta per pescare"
      );
    }
  }

  public scartaOppurePescaDalMazzoScarti() {
    /*funzione che viene invocata quando si cerca di scartare una carta selezionata dal mazzo*/
    var scarta = true;
    this.nascondiMessaggioDiAvviso();



    if (this.mazzo.length === 3) {
      //se nel mazzo ci sono 3 carte
      //vuol dire che il giocatore vuole pescare l'ultima carta scartata.
      this.pescaUltimaCartaScartata();
      scarta = false;
    }

    if (this.mazzo.length === 4 && scarta === true) {
      //se il mazzo é uguale a 4
      //vuol dire che il giocatore vuole scartare una carta selezionata.
      this.scartaLaCarta();
    }

    this.mostraMazzo();
    this.mostraCarteScartate();
  }

  private mostraCarteScartate() {
    /*funzione che mostra corretamente le ultime carte scartate*/
    if (this.mazzoScarti.length > 1) {
      this.mostraInPrimoPianoUltimaCartaScartata();
    }
    if (this.mazzoScarti.length === 1) {
      let classe = this.mazzoScarti[0].getSymbol();
      $(document).ready(function () {
        $(".mazzo-scarti div").css({ border: "transparent" });

        $(".mazzo-scarti div div").addClass(classe);
      });
    }
    if (this.mazzoScarti.length === 0) {
      this.inizializzaMazzoScarti();
    }
  }

  private inizializzaMazzoScarti(): void {
    $(document).ready(function () {
      $(".mazzo-scarti div").css({ border: "2px dashed white" });
    });
  }

  private mostraInPrimoPianoUltimaCartaScartata(): void {
    let classePrec = this.mazzoScarti[1].getSymbol();
    let classe = this.mazzoScarti[0].getSymbol();
    $(document).ready(function () {
      $(".mazzo-scarti div div").removeClass(classePrec);
      $(".mazzo-scarti div div").addClass(classe);
    });
  }

  private scartaLaCarta(): void {
    let copiaMazzo: [Carta];
    let nonSelezionati = 0;
    for (let index = 0; index < this.mazzo.length; index++) {
      if (!this.mazzo[index].isSelected()) {
        nonSelezionati += 1;
        if (copiaMazzo === undefined) {
          copiaMazzo = [this.mazzo[index]];
        } else {
          copiaMazzo.push(this.mazzo[index]);
        }
      } else {
        if (this.mazzoScarti === undefined) {
          this.mazzo[index].setSelected(false);
          this.mazzoScarti = [this.mazzo[index]];
        } else {
          this.mazzoScarti.unshift(this.mazzo[index]);
        }
      }
    }
    if (nonSelezionati === 4) {
      //nessuna carta è stata selezionata mostra un messaggio...
      this.mostraMessaggioDiAvviso("Non hai selezionato la tua carta!");
    }
    this.mazzo = undefined;
    this.mazzo = copiaMazzo;
    console.log("é stata scartata una carta!");
    console.log(this.mazzoScarti);
  }

  private pescaUltimaCartaScartata(): void {
    if (this.mazzoScarti.length > 1) {
      let classePrec = this.mazzoScarti[1].getSymbol();
      let classe = this.mazzoScarti[0].getSymbol();
      $(document).ready(function () {
        $(".mazzo-scarti div div").removeClass(classe);
        $(".mazzo-scarti div div").addClass(classePrec);
      });
    }
    let carta = this.mazzoScarti.shift();
    carta.setSelected(false);
    this.mazzo.push(carta);
    console.log("é stata pescata una carta dal mazzo scarti!");
    console.log(this.mazzoScarti);
  }

  private mostraMessaggioDiAvviso(avviso: string): void {
    $(document).ready(function () {
      $(".messaggioDiAvviso").text(avviso).show();
      /*TO DO:animazione del messaggio*/
    });
  }

  private nascondiMessaggioDiAvviso(): void {
    $(document).ready(function () {
      $(".messaggioDiAvviso").hide();
      /*TO DO:animazione del messaggio*/
    });
  }
}
