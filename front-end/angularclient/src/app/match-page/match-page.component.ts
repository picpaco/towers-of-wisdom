import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
import { Giocatore } from "../model/giocatore";
import { Carta } from "../model/Carta";
import { GiocatoreService } from "../service/giocatore-service.service";
import { Mazzo } from "../model/Mazzo";
import { mainModule } from "process";

@Component({
  selector: "app-match-page",
  templateUrl: "./match-page.component.html",
  styleUrls: ["./match-page.component.css"],
})
export class MatchPageComponent implements OnInit {
  mazzoProva;

  public player: Giocatore;
  public mazzo: Carta[];
  public mazzoCoperto: Carta[];
  public mazzoScarti: Carta[];
  public torreQuadrato: [Carta]; //colore giallo 1 colonna da sinistra a destra
  public torreTriangolo: [Carta]; //colore azzuro aqua 2 colonna
  public torreCerchio: [Carta]; //colore rosa petalo 3 colonna
  public torreAncora: [Carta]; //colore arancio chiaro 4 colonna
  public torriDelGiocatore = [[Carta]];
  mano: any = [];

  constructor(private giocatoreService: GiocatoreService) {}

  ngOnInit() {
    /*  this.giocatoreService.findAll().subscribe((data) => {
      this.mano = data[0].mano;
    });
*/
    this.mazzo = [
      new Carta("Ancora", "1"),
      new Carta("Punta", "P"),
      new Carta("Quadrato", "7"),
    ];
    this.mostraMazzo();
    this.inizializzaMazzoScarti();
    this.riempiMazzoCoperto();//funzione che riempe il mazzoCoperto
  }

  public giocaSullaTorre(torre: string) {
     /*questo metodo viene richiamata nel template attraverso l'attributo (click)  */
    let torreDaVisualizzare;
    let contaCarteNonSelezionate = 0;
    if (this.mazzo.length === 4) {
      for (let indexI = 0; indexI < this.mazzo.length; indexI++) {
        if (this.mazzo[indexI].isSelected()) {
          if (this.mazzo[indexI].getSymbol() === torre) {
            torreDaVisualizzare = this.giocaCartaSullaTorre();
          } else {
            this.mostraMessaggioDiAvviso("Non puoi inserire qui questa carta!");
          }
        } else {
          contaCarteNonSelezionate += 1;
        }
      }
      if (contaCarteNonSelezionate === 4) {
        this.mostraMessaggioDiAvviso("Non hai selezionato la tua carta!");
      }
      this.mostraMazzo();
      this.mostraTorri(torreDaVisualizzare);
    } else {
      this.mostraMessaggioDiAvviso(
        "Devi pescare dal mazzo scarti o dal mazzo coperto!"
      );
    }
  }
  private giocaCartaSullaTorre(): string {
    this.nascondiMessaggioDiAvviso();
    let copiaMazzo: [Carta];
    let torreDaVisualizzare;
    for (let indexI = 0; indexI < this.mazzo.length; indexI++) {
      if (this.mazzo[indexI].isSelected()) {
        torreDaVisualizzare = this.mazzo[indexI].getInitial();
        this.mazzo[indexI].setSelected(false);
        switch (this.mazzo[indexI].getInitial()) {
          case "Q":
            if (this.torreQuadrato === undefined) {
              this.torreQuadrato = [this.mazzo[indexI]];
            } else {
              this.torreQuadrato.push(this.mazzo[indexI]);
            }
            break;
          case "T":
            if (this.torreTriangolo === undefined) {
              this.torreTriangolo = [this.mazzo[indexI]];
            } else {
              this.torreTriangolo.push(this.mazzo[indexI]);
            }
            break;
          case "C":
            if (this.torreCerchio === undefined) {
              this.torreCerchio = [this.mazzo[indexI]];
            } else {
              this.torreCerchio.push(this.mazzo[indexI]);
            }
            break;
          case "A":
            if (this.torreAncora === undefined) {
              this.torreAncora = [this.mazzo[indexI]];
            } else {
              this.torreAncora.push(this.mazzo[indexI]);
            }
            break;
          default:
            console.log(
              "sei nel default dello switch: non hai selezionato nessuna carta allora!"
            );
        }
      } else {
        if (copiaMazzo === undefined) {
          copiaMazzo = [this.mazzo[indexI]];
        } else {
          copiaMazzo.push(this.mazzo[indexI]);
        }
      }
    }
    this.mazzo = undefined;
    this.mazzo = copiaMazzo;
    return torreDaVisualizzare;
  }
  private mostraTorri(torredaVisualizzare: string) {
    this.gestisciMarkers();
    if (torredaVisualizzare === "Q") {
      this.mostraTorreQuadrato();
    }
    if (torredaVisualizzare === "T") {
      this.mostraTorreTriangolo();
    }
    if (torredaVisualizzare === "C") {
      this.mostraTorreCerchio();
    }
    if (torredaVisualizzare === "A") {
      this.mostraTorreAncora();
    }
  }
  private mostraTorreAncora() {
    if (this.mostraTorreAncora !== undefined) {
      for (let index = 0; index < this.torreAncora.length; index++) {
        let classe = this.torreAncora[index].getSymbol();
        let valore = this.torreAncora[index].getValue();
        $(document).ready(function () {
          $(
            ".pannello-torri-del-giocatore .carte-delle-torri:eq(3) div:eq(" +
              index +
              ")"
          )
            .css({ border: "1px solid white" })
            .addClass(classe)
            .text(valore);
        });
      }
    }
  }
  private mostraTorreCerchio() {
    if (this.mostraTorreCerchio !== undefined) {
      for (let index = 0; index < this.torreCerchio.length; index++) {
        let classe = this.torreCerchio[index].getSymbol();
        let valore = this.torreCerchio[index].getValue();
        $(document).ready(function () {
          $(
            ".pannello-torri-del-giocatore .carte-delle-torri:eq(2) div:eq(" +
              index +
              ")"
          )
            .css({ border: "1px solid white" })
            .addClass(classe)
            .text(valore);
        });
      }
    }
  }

  private mostraTorreTriangolo() {
    if (this.torreTriangolo !== undefined) {
      for (let index = 0; index < this.torreTriangolo.length; index++) {
        let classe = this.torreTriangolo[index].getSymbol();
        let valore = this.torreTriangolo[index].getValue();
        $(document).ready(function () {
          $(
            ".pannello-torri-del-giocatore .carte-delle-torri:eq(1) div:eq(" +
              index +
              ")"
          )
            .css({ border: "1px solid white" })
            .addClass(classe)
            .text(valore);
        });
      }
    }
  }

 private mostraTorreQuadrato() {
    if (this.torreQuadrato !== undefined) {
      for (let index = 0; index < this.torreQuadrato.length; index++) {
        let classe = this.torreQuadrato[index].getSymbol();
        let valore = this.torreQuadrato[index].getValue();
        $(document).ready(function () {
          $(
            ".pannello-torri-del-giocatore .carte-delle-torri:eq(0) div:eq(" +
              index +
              ")"
          )
            .css({ border: "1px solid white" })
            .addClass(classe)
            .text(valore);
        });
      }
    }
  }

  private gestisciMarkers() {
    if (this.torreQuadrato !== undefined) {
      $(document).ready(function () {
        $("#marker1").hide();
      });
    }
    if (this.torreTriangolo !== undefined) {
      $(document).ready(function () {
        $("#marker2").hide();
      });
    }
    if (this.torreCerchio !== undefined) {
      $(document).ready(function () {
        $("#marker3").hide();
      });
    }
    if (this.torreAncora !== undefined) {
      $(document).ready(function () {
        $("#marker4").hide();
      });
    }
  }

  public stampaLunghezza() {
    for (let index = 0; index < this.mano.length; index++) {
      console.log(this.mano[index]);
    }
  }

  private riempiMazzoCoperto(): void {
    this.mazzoCoperto = [
      new Carta("Quadrato", "6"),
      new Carta("Triangolo", "5"),
      new Carta("Quadrato", "4"),
      new Carta("Cerchio", "3"),
      new Carta("Ancora", "2"),
      new Carta("Ancora", "6"),
      new Carta("Quadrato", "1"),
      new Carta("Ancora", "1"),
      new Carta("Triangolo", "2"),
      new Carta("Punta", "P"),
      new Carta("Ancora", "4"),
      new Carta("Ancora", "5"),
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
     /*questo metodo viene richiamata nel template attraverso l'attributo (click)  */
    //viene invocato quando il tasto con l'icona del messaggio viene premuto
    $(document).ready(function () {
      $(".chat").toggle();
    });
  }

  public nascondiChat() {
     /*questo metodo viene richiamata nel template attraverso l'attributo (click)  */
    //viene invocato quando il tasto con l'icona della x viene premuto nel pannello del messaggio
    $(document).ready(function () {
      $(".chat").hide();
    });
  }

  public selezionaCarta(cardId: string) {
     /*questo metodo viene richiamata nel template attraverso l'attributo (click)  */
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
     /*questo metodo viene richiamata nel template attraverso l'attributo (click)  */
    this.nascondiMessaggioDiAvviso();
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
     /*questo metodo viene richiamata nel template attraverso l'attributo (click)  */
    /*funzione che viene invocata quando si cerca di scartare una carta selezionata dal mazzo*/
    var scarta = true;
    this.nascondiMessaggioDiAvviso();

    if (this.mazzo.length === 3) {
      /*se nel mazzo ci sono 3 carte
      vuol dire che il giocatore vuole pescare l'ultima carta scartata.*/
      this.pescaCartaScartata();
      scarta = false;
    }

    if (this.mazzo.length === 4 && scarta === true) {
      /*se il mazzo é uguale a 4
      vuol dire che il giocatore vuole scartare una carta selezionata.*/
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
        $(".mazzo-scarti >div:eq(0)").css({ border: "transparent" });

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
      /* nessuna carta è stata selezionata mostra un messaggio...*/
      this.mostraMessaggioDiAvviso("Non hai selezionato la tua carta!");
    }
    this.mazzo = undefined;
    this.mazzo = copiaMazzo;
    console.log("é stata scartata una carta!");
    console.log(this.mazzoScarti);
  }

  private pescaCartaScartata(): void {
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
