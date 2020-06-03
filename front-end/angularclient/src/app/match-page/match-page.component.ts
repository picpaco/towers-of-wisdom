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
  public torreQuadratoAvversario: Carta[];
  public torreTriangoloAvversario: [Carta];
  public torreCerchioAvversario: [Carta];
  public torreAncoraAvversario: [Carta];
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
    this.torreQuadratoAvversario = [
      new Carta("Quadrato", "7"),
      new Carta("Quadrato", "6"),
      new Carta("Quadrato", "5"),
      new Carta("Quadrato", "4"),
      new Carta("Quadrato", "3"),
      new Carta("Quadrato", "2"),
      new Carta("Quadrato", "1"),
      new Carta("Punta", "P"),
    ];

    this.mostraTorriAvversario();
    this.mostraMazzo();
    this.inizializzaMazzoScarti();
    this.riempiMazzoCoperto(); //funzione che riempe il mazzoCoperto
  }
  private mostraTorriAvversario() {//da rifare
    if (this.torreQuadratoAvversario !== undefined) {
      for (
        let index = 0;
        index < this.torreQuadratoAvversario.length;
        index++
      ) {
        let classe = this.torreQuadratoAvversario[index].getSymbol();
        let valore = this.torreQuadratoAvversario[index].getValue();
        $(document).ready(function () {
          $(
            ".pannello-torri-del-giocatore-avversario .carte-delle-torri-avversario:eq(0) div:eq(" +
              index +
              ")"
          )
            .css({ border: "1px solid white" })
            .addClass("Quadrato")
            .text(valore);
        });
      }
      for (
        let index = 0;
        index < this.torreQuadratoAvversario.length;
        index++
      ) {
        let classe = this.torreQuadratoAvversario[index].getSymbol();
        let valore = this.torreQuadratoAvversario[index].getValue();
        $(document).ready(function () {
          $(
            ".pannello-torri-del-giocatore-avversario .carte-delle-torri-avversario:eq(1) div:eq(" +
              index +
              ")"
          )
            .css({ border: "1px solid white" })
            .addClass("Triangolo")
            .text(valore);
        });
      }
      for (
        let index = 0;
        index < this.torreQuadratoAvversario.length;
        index++
      ) {
        let classe = this.torreQuadratoAvversario[index].getSymbol();
        let valore = this.torreQuadratoAvversario[index].getValue();
        $(document).ready(function () {
          $(
            ".pannello-torri-del-giocatore-avversario .carte-delle-torri-avversario:eq(2) div:eq(" +
              index +
              ")"
          )
            .css({ border: "1px solid white" })
            .addClass("Cerchio")
            .text(valore);
        });
      }
      for (
        let index = 0;
        index < this.torreQuadratoAvversario.length;
        index++
      ) {
        let classe = this.torreQuadratoAvversario[index].getSymbol();
        let valore = this.torreQuadratoAvversario[index].getValue();
        $(document).ready(function () {
          $(
            ".pannello-torri-del-giocatore-avversario .carte-delle-torri-avversario:eq(3) div:eq(" +
              index +
              ")"
          )
            .css({ border: "1px solid white" })
            .addClass("Ancora")
            .text(valore);
        });
      }
    }
  }

  public giocaSullaTorre(torre: string) {
    /*questo metodo viene richiamata nel template attraverso l'attributo (click),sono ben 4 riquadri,nelle colonne
    che se premute richiamano qusta funzione passando il loro la torre a cui ci si riferisce es(Quadrato)*/
    let torreDaVisualizzare;
    if (this.mazzo.length === 4) {
      //per giocare una carta la mano deve essere di 4 carte
      if (this.isSelectedUnaCartaDalMazzo()) {
        //si controlla se una carta dal mazzo è stata selezionata
        for (let indexI = 0; indexI < this.mazzo.length; indexI++) {
          //si cicla per cercare la carta selezionata
          if (this.mazzo[indexI].isSelected()) {
            //si controlla se la carta è selezionata
            if (this.mazzo[indexI].getSymbol() === torre) {
              //si controlla se la carta corrisponde alla sua corrispettiva torre
              torreDaVisualizzare = this.giocaCartaSullaTorre(); //questo metodo permette la giocata su una torre restituendo poi un target
            } else {
              this.mostraMessaggioDiAvviso(
                "Non puoi inserire qui questa carta!"
              );
              this.deselezionaLaCartaSelezionata();
            }
          }
        }
      } else {
        this.mostraMessaggioDiAvviso("Nessuna carta selezionata!");
      }
      this.mostraMazzo();
      this.mostraTorri(torreDaVisualizzare);
    } else {
      this.mostraMessaggioDiAvviso(
        "Pesca dal mazzo scarti o dal mazzo coperto!"
      );
      this.deselezionaLaCartaSelezionata();
    }
  }
  private giocaCartaSullaTorre(): string {
    this.nascondiMessaggioDiAvviso();
    let copiaMazzo: [Carta]; //una copia del mazzo per inserire tutte quelle carte non selezionate
    let torreDaVisualizzare;
    for (let indexI = 0; indexI < this.mazzo.length; indexI++) {
      //si cicla per cercare la carta selezionata
      if (this.mazzo[indexI].isSelected()) {
        //se è la carta selezionata la si fà restituire la sua corrispettiva torre
        torreDaVisualizzare = this.mazzo[indexI].getInitial(); //restiruisce le iniziali della torre es(Quadrato come Q);
        this.mazzo[indexI].setSelected(false); //la si imposta non più selezionata
        switch (
          this.mazzo[indexI].getInitial() //tramite la iniziale,la carta viene inserita nella torre corrispettiva
        ) {
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
        }
      } else {
        //in caso la carta nel mazzo non è stata selezionata viene inserita nella copia
        if (copiaMazzo === undefined) {
          copiaMazzo = [this.mazzo[indexI]];
        } else {
          copiaMazzo.push(this.mazzo[indexI]);
        }
      }
    }
    this.mazzo = undefined; //infine il mazzo nuovo sarà composto solo da tre carte
    this.mazzo = copiaMazzo;
    return torreDaVisualizzare; //ora bisogna visualizzare da fuori la carta nella torre,e il mazzo.
  }
  private mostraTorri(torredaVisualizzare: string) {
    //questa funzione serve per visualizzare la torre richiesta ed gestire i markers
    this.calcolaPuntaggio();
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

  private calcolaPuntaggio() {//da rifare
    if (this.torreQuadrato != undefined && this.torreQuadrato.length > 0) {
      let punti = 0;
      for (let index = 0; index < this.torreQuadrato.length; index++) {
        punti += +this.torreQuadrato[index].getValue();
      }
      $(document).ready(function () {
        $("#1.punteggio").html("<div><div></div></div>").text(punti);
      });
    }

    if (this.torreTriangolo != undefined && this.torreTriangolo.length > 0) {
      let punti = 0;
      for (let index = 0; index < this.torreTriangolo.length; index++) {
        punti += +this.torreTriangolo[index].getValue();
      }
      if (this.torreTriangolo.length < 3) {
        $(document).ready(function () {
          $("#2.punteggio").html("<div><div></div></div>");
        });
      }
      $(document).ready(function () {
        $("#2.punteggio").text(punti);
      });
    }

    if (this.torreCerchio != undefined && this.torreCerchio.length > 0) {
      let punti = 0;
      for (let index = 0; index < this.torreCerchio.length; index++) {
        punti += +this.torreCerchio[index].getValue();
      }
      if (this.torreCerchio.length < 3) {
        $(document).ready(function () {
          $("#3.punteggio").html("<div><div></div></div>");
        });
      }
      $(document).ready(function () {
        $("#3.punteggio").text(punti);
      });
    }

    if (this.torreAncora != undefined && this.torreAncora.length > 0) {
      let punti = 0;
      for (let index = 0; index < this.torreAncora.length; index++) {
        punti += +this.torreAncora[index].getValue();
      }
      if (this.torreAncora.length < 3) {
        $(document).ready(function () {
          $("#4.punteggio").html("<div><div></div></div>");
        });
      }
      $(document).ready(function () {
        $("#4.punteggio").text(punti);
      });
    }
  }

  private mostraTorreAncora() {
    /*mostraTorreQuadrato,Triangolo,Cerchio;Ancora sono funzioni che in 
    base agli array corrispettivi mostrano graficamente di quante carte sono composte*/
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
    /*mostraTorreQuadrato,Triangolo,Cerchio;Ancora sono funzioni che in 
    base agli array corrispettivi mostrano graficamente di quante carte sono composte*/
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
    /*mostraTorreQuadrato,Triangolo,Cerchio;Ancora sono funzioni che in 
    base agli array corrispettivi mostrano graficamente di quante carte sono composte*/
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
    /*mostraTorreQuadrato,Triangolo,Cerchio;Ancora sono funzioni che in 
    base agli array corrispettivi mostrano graficamente di quante carte sono composte*/
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
    /*in caso un arrayTorre avesse una carta,il suo marker o il suo trateggio
    viene nascosto */
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
    /*ta togliere...*/
    this.mazzoCoperto = [
      new Carta("Quadrato", "6"),
      new Carta("Quadrato", "5"),
      new Carta("Quadrato", "4"),
      new Carta("Quadrato", "3"),
      new Carta("Quadrato", "2"),
      new Carta("Quadrato", "1"),
      new Carta("Quadrato", "1"),
      new Carta("Triangolo", "1"),
      new Carta("Triangolo", "2"),
      new Carta("Triangolo", "3"),
      new Carta("Ancora", "4"),
      new Carta("Cerchio", "5"),
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
      new Carta("Ancora", "3"),
      new Carta("Ancora", "5"),
    ];
  }

  private mostraMazzo(): void {
    /*funzione per proiettare correttamente le carte del mazzo/mano,
    nei corrispettivi colori e valori,viene associata per ogni carta un suo unico ID
    settandolo nel'oggetto e aggiungendolo come attributo all'elemento div nel 
    template*/

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
    this.deselezionaLaCartaSelezionata();
    if (this.mazzo.length === 3) {
      //per pescare dal mazzo coperto il mazzo deve avere sempre 3 carte
      this.mazzo.unshift(this.mazzoCoperto.shift());
      this.mostraMazzo();
      console.log("é stata pescata una carta dal mazzo coperto!");
      /*TO DO:animazione della carta che viene passata*/
    } else {
      this.mostraMessaggioDiAvviso(
        "Devi prima giocare la tua carta per pescare"
      );
      this.deselezionaLaCartaSelezionata();
    }
  }

  public scartaOppurePescaDalMazzoScarti() {
    /*questo metodo viene richiamata nel template attraverso l'attributo (click)  */
    /*funzione che viene invocata quando si cerca di scartare una carta selezionata 
    dal mazzo oppure quando si vuole pescare dal mazzo scarti */

    this.nascondiMessaggioDiAvviso();

    if (this.mazzo.length === 3) {
      /*se nel mazzo ci sono 3 carte
      vuol dire che il giocatore vuole pescare una carta scartata,
      e il giocatore non dovrebbe aver selezionato una carta quando la 
      si pesca dal mazzo scarti.*/
      if (this.isSelectedUnaCartaDalMazzo()) {
        this.mostraMessaggioDiAvviso("Pesca dal mazzo coperto!");
        this.deselezionaLaCartaSelezionata();
      } else {
        this.pescaCartaScartata();
      }
    }

    if (this.mazzo.length === 4 && this.isSelectedUnaCartaDalMazzo()) {
      /*se il mazzo é uguale a 4 vuol dire che il giocatore vuole scartare una carta selezionata.*/
      this.scartaLaCarta();
    } else {
      this.mostraMessaggioDiAvviso("Nessuna carta selezionata");
      this.deselezionaLaCartaSelezionata();
    }

    this.mostraMazzo();
    this.mostraCarteScartate();
  }

  private mostraCarteScartate() {
    /*funzione che mostra corretamente le ultime carte scartate nel pannello*/
    if (this.mazzoScarti != undefined) {
      if (this.mazzoScarti.length > 1) {
        //il pannello viene mostrato quando ci sono almeno due carte scartate
        this.mostraInPrimoPianoUltimaCartaScartata();
        $(document).ready(function () {
          $(".pannello-degli-scarti").css({ visibility: "visible" });
        });
        this.mostraMazzoScarti();
      }
      if (this.mazzoScarti.length === 1) {
        //se c'è solo una carta scartata il pannello si nasconde
        let classe = this.mazzoScarti[0].getSymbol();
        $(document).ready(function () {
          $(".mazzo-scarti >div:eq(0)").css({ border: "transparent" });

          $(".mazzo-scarti div div").addClass(classe);
          $(".pannello-degli-scarti").css({ visibility: "hidden" });
        });
      }
      if (this.mazzoScarti.length === 0) {
        //in caso vengono pescate tutte le carta scartate riappare il tratteggio
        this.inizializzaMazzoScarti();
      }
    }
  }

  public selezionaEPescaCartaDalMazzoScarti(cartaId: string) {
    if (this.mazzo.length === 3) {
      if (this.isSelectedUnaCartaDalMazzo()) {
        this.mostraMessaggioDiAvviso("Pesca dal mazzo coperto!");
        this.deselezionaLaCartaSelezionata();
      } else {
        let copiaMazzoScarti: [Carta];
        for (let index = 0; index < this.mazzoScarti.length; index++) {
          if (this.mazzoScarti[index].getId() === cartaId) {
            this.mazzo.push(this.mazzoScarti[index]);
          } else {
            if (copiaMazzoScarti === undefined) {
              copiaMazzoScarti = [this.mazzoScarti[index]];
            } else {
              copiaMazzoScarti.push(this.mazzoScarti[index]);
            }
          }
        }
        this.mazzoScarti = undefined;
        this.mazzoScarti = copiaMazzoScarti;

        this.mostraMazzo();
        this.mostraMazzoScarti();

        if (this.mazzoScarti.length === 1) {
          $(document).ready(function () {
            $(".pannello-degli-scarti").css({ visibility: "hidden" });
          });
        }
        if (this.mazzoScarti.length === 0) {
          this.inizializzaMazzoScarti();
        }
        let classe = this.mazzoScarti[0].getSymbol();
        $(document).ready(function () {
          $(".mazzo-scarti div div").removeClass(
            "Quadrato Triangolo Cerchio Ancora Punta"
          );
          $(".mazzo-scarti div div").addClass(classe);
        });
      }
    } else {
      this.mostraMessaggioDiAvviso("Gioca una carta");
      this.deselezionaLaCartaSelezionata();
    }
  }

  private mostraMazzoScarti() {
    let m = this.mazzoScarti.length - 1;
    for (let index = m; index >= 0; index--) {
      let classe = this.mazzoScarti[index].getSymbol();
      let valore = this.mazzoScarti[index].getValue();
      $(document).ready(function () {
        $(".pannello-degli-scarti div:eq(" + index + ")")
          .addClass(classe)
          .text(valore)
          .css({
            transform: "rotate(3deg)",
          })
          .attr("id", "id" + index);
      });
      this.mazzoScarti[index].setId(index);
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
    if (this.isSelectedUnaCartaDalMazzo()) {
      for (let index = 0; index < this.mazzo.length; index++) {
        if (this.mazzo[index].isSelected()) {
          this.mazzo[index].setSelected(false);
          if (this.mazzoScarti === undefined) {
            this.mazzoScarti = [this.mazzo[index]];
          } else {
            if (this.mazzoScarti.length === 18) {
              this.mostraMessaggioDiAvviso(
                "Il mazzo degli scarti è stato riempito! gioca la tua carta"
              );
              this.deselezionaLaCartaSelezionata();
              if (copiaMazzo === undefined) {
                copiaMazzo = [this.mazzo[index]];
              } else {
                copiaMazzo.push(this.mazzo[index]);
              }
            } else {
              this.mazzoScarti.unshift(this.mazzo[index]);
            }
          }
        } else {
          if (copiaMazzo === undefined) {
            copiaMazzo = [this.mazzo[index]];
          } else {
            copiaMazzo.push(this.mazzo[index]);
          }
        }
      }
      this.mazzo = undefined;
      this.mazzo = copiaMazzo;
      console.log("é stata scartata una carta!");
      console.log(this.mazzoScarti);
    } else {
      /* nessuna carta è stata selezionata mostra un messaggio...*/
      this.mostraMessaggioDiAvviso("Nessuna carta selezionata!");
    }
  }

  private isSelectedUnaCartaDalMazzo(): boolean {
    let selezionato = false;
    for (let index = 0; index < this.mazzo.length; index++) {
      if (this.mazzo[index].isSelected()) {
        selezionato = true;
      }
    }
    return selezionato;
  }

  private deselezionaLaCartaSelezionata() {
    for (let index = 0; index < this.mazzo.length; index++) {
      if (this.mazzo[index].isSelected()) {
        this.mazzo[index].setSelected(false);
      }
      $(document).ready(function () {
        $(".mazzo > div:eq(" + index + ")").css({ "box-shadow": "none" });
      });
    }
  }

  private pescaCartaScartata(): void {
    if (this.mazzoScarti != undefined && this.mazzoScarti.length > 0) {
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
    } else {
      let causa = false;
      causa = this.isSelectedUnaCartaDalMazzo();
      if (causa) {
        if (this.mazzoScarti != undefined && this.mazzoScarti.length > 0) {
          this.mostraMessaggioDiAvviso(
            "Pesca dal mazzo coperto o dal mazzo degli scarti!"
          );
        } else {
          this.mostraMessaggioDiAvviso("Pesca dal mazzo coperto!");
        }
      } else {
        this.mostraMessaggioDiAvviso("Non c'è nessuna carta da pescare!");
      }
      this.deselezionaLaCartaSelezionata();
    }
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
