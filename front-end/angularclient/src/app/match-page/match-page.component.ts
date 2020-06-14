import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
import { Giocatore } from "../model/giocatore";
import { Carta, CartaAdapter } from "../model/Carta";
 import { ActivatedRoute } from "@angular/router";


@Component({
  selector: "app-match-page",
  templateUrl: "./match-page.component.html",
  styleUrls: ["./match-page.component.css"],
})
export class MatchPageComponent implements OnInit {
  public player: Giocatore;
  public mano: Carta[];
  public mazzoCoperto: Carta[];
  public mazzoScarti: Carta[];
  public manoT: Carta[] = [];

  public torriAvversario: Array<Carta[]> = [
    undefined,
    undefined,
    undefined,
    undefined,
  ];
  public torriGiocatore: Array<Carta[]> = [
    undefined,
    undefined,
    undefined,
    undefined,
  ]; /*Quadrato,Triangolo,Cerchio,Ancora */

  manoProva: Carta[] = []; //cambiare nome a manoProva

   constructor(
     private activatedRoute: ActivatedRoute,
     private cartaAdapter: CartaAdapter
   ) {}

  // constructor(private cartaAdapter: CartaAdapter) {}

  ngOnInit() {
     this.activatedRoute.data.subscribe((data: { manoProva: any}) => {
      this.manoProva = data.manoProva;
    });

    this.stampaManoJson();
    this.stampaManoTs();
    this.mostraTorriAvversario(); //dovrà essere invocata quando opportuno...
    this.inizializzaMazzoScarti();
    this.riempiMazzoCoperto(); //funzione che riempe il mazzoCoperto si toglierà
    this.mostraMazzo();
    
  }

  public stampaManoJson() {
    this.manoT = this.manoProva.map((item) => this.cartaAdapter.adapt(item));
    this.mano = this.manoT;
    console.log("--------Prova-Dati-Mano-json-------");
    console.log(this.manoProva);
    for (let index = 0; index < this.manoProva.length; index++) {
      console.log(
        this.manoProva[index]["simbolo"] + " " + this.manoProva[index]["valore"]
      );
    }
  }

  public stampaManoTs() {
    console.log("--------Prova-Dati-Mano-ts-------");
    console.log(this.manoT);
    for (let index = 0; index < this.manoT.length; index++) {
      console.log(
        this.manoT[index].getSymbol() + " " + this.manoT[index].getValue()
      );
    }
  }

  private getNumeroDellaTorre(torre: string): number {
    switch (torre) {
      case "Quadrato":
        return 0;
      case "Triangolo":
        return 1;
      case "Cerchio":
        return 2;
      case "Ancora":
        return 3;
    }
  }

  private controlloDisposizioneDelleCarteNelleTorri(
    torre: string,
    carta: Carta
  ): boolean {
    let sicuro = false;
    let index = this.getNumeroDellaTorre(torre); //esempio: la torre Triangolo si trova nella seconda posizione di torriGiocatore
    let torreCopia: Carta[];

    if (this.torriGiocatore[index] !== undefined) {
      //se una delle torri esiste ne prendi tutto il contenuto in una copia
      torreCopia = this.torriGiocatore[index];
    }
    if (torreCopia === undefined) {
      /*se la torreCopia è vuota vuol dire che la torre che mi serve non esiste ancora,
      e che quindi si può inserisce qualsiasi carta che non sia una Punta*/
      if (carta.getSymbol() !== "Punta") {
        sicuro = true;
      }
    } else {
      /*se la torreCopia ha dei valori vuol dire che la torre esiste e bisogna controllare l'ordine delle carte*/

      if (carta.getSymbol() === "Punta") {
        if (+torreCopia[torreCopia.length - 1].getValue() === 1) {
          sicuro = true;
        }
      } else {
        if (+carta.getValue() < +torreCopia[torreCopia.length - 1].getValue()) {
          sicuro = true;
        }
      }
    }

    return sicuro;
  }

  private mostraTorriAvversario() {
    //solo per prova ma è da levare in futuro

    let Quadrato = [
      new Carta("Quadrato", "7"),
      new Carta("Quadrato", "6"),
      new Carta("Quadrato", "5"),
      new Carta("Quadrato", "4"),
      new Carta("Quadrato", "3"),
      new Carta("Quadrato", "2"),
      new Carta("Quadrato", "1"),
      new Carta("Punta", "P"),
    ];
    let Triangolo = [new Carta("Triangolo", "7"), new Carta("Triangolo", "5")];
    let Cerchio = [
      new Carta("Cerchio", "7"),
      new Carta("Cerchio", "5"),
      new Carta("Cerchio", "4"),
      new Carta("Cerchio", "3"),
      new Carta("Cerchio", "1"),
    ];
    let Ancora = [
      new Carta("Ancora", "7"),
      new Carta("Ancora", "6"),
      new Carta("Ancora", "5"),
      new Carta("Ancora", "3"),
      new Carta("Ancora", "2"),
      new Carta("Ancora", "1"),
      new Carta("Punta", "P"),
    ];

    this.torriAvversario = [Quadrato, Triangolo, Cerchio, Ancora];

    for (
      let indexTorre = 0;
      indexTorre < this.torriAvversario.length;
      indexTorre++
    ) {
      for (
        let index = 0;
        index < this.torriAvversario[indexTorre].length;
        index++
      ) {
        let classe = this.torriAvversario[indexTorre][index].getSymbol();
        let valore = this.torriAvversario[indexTorre][index].getValue();
        $(document).ready(function () {
          $(
            ".carte-delle-torri-avversario:eq(" +
              indexTorre +
              ") div:eq(" +
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

  public giocaSullaTorre(torre: string) {
    /*questo metodo viene richiamata nel template attraverso l'attributo (click),sono ben 4 riquadri,nelle colonne
    che se premute richiamano questa funzione passando il loro la torre a cui ci si riferisce es(Quadrato)*/
    if (this.mano.length === 4) {
      //per giocare una carta la mano deve essere di 4 carte
      if (this.isSelectedUnaCartaDalMazzo()) {
        //si controlla se una carta dal mazzo è stata selezionata
        for (let indexI = 0; indexI < this.mano.length; indexI++) {
          //si cicla per cercare la carta selezionata
          if (this.mano[indexI].isSelected()) {
            //si controlla se la carta è selezionata
            if (
              this.mano[indexI].getSymbol() === torre ||
              this.mano[indexI].getSymbol() === "Punta"
            ) {
              //si controlla se la carta corrisponde alla sua corrispettiva torre o una Punta
              if (
                this.controlloDisposizioneDelleCarteNelleTorri(
                  torre,
                  this.mano[indexI]
                )
              ) {
                //in caso la carta sia una Punta bisogna tener conto della torre
                console.log("gioca carta sulla torre");
                this.giocaCartaSullaTorre(torre);
                //questo metodo permette la giocata su una torre restituendo poi un target
              } else {
                this.mostraMessaggioDiAvviso("Giocata non valida!");
                this.deselezionaLaCartaSelezionata();
              }
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
      this.mostraTorri(torre);
    } else {
      this.mostraMessaggioDiAvviso(
        "Pesca dal mazzo scarti o dal mazzo coperto!"
      );
      this.deselezionaLaCartaSelezionata();
    }
  }

  private giocaCartaSullaTorre(torreDaVisualizzare: string) {
    this.nascondiMessaggioDiAvviso();
    let copiaMazzo: [Carta]; //una copia del mazzo per inserire tutte quelle carte non selezionate
    let indexTorre = this.getNumeroDellaTorre(torreDaVisualizzare);
    for (let indexI = 0; indexI < this.mano.length; indexI++) {
      //si cicla per cercare la carta selezionata
      if (this.mano[indexI].isSelected()) {
        //se è la carta selezionata la si inserisce alla sua corrispettiva torre
        this.mano[indexI].setSelected(false); //la si imposta non più selezionata
        if (this.torriGiocatore[indexTorre] === undefined) {
          this.torriGiocatore[indexTorre] = [this.mano[indexI]];
        } else {
          this.torriGiocatore[indexTorre].push(this.mano[indexI]);
        }
      } else {
        //le tre carte non selezionata saranno memorizzate nella copia
        if (copiaMazzo === undefined) {
          copiaMazzo = [this.mano[indexI]];
        } else {
          copiaMazzo.push(this.mano[indexI]);
        }
      }
    }
    console.log("inserita carta nella torre :" + torreDaVisualizzare);
    console.log(this.torriGiocatore);
    this.mano = undefined; //infine il mazzo nuovo sarà composto solo da tre carte
    this.mano = copiaMazzo;
  }

  private mostraTorri(torre: string) {
    //questa funzione serve per calcolare il punteggio di ogni torre,gestire i markers e visualizzare la torre.
    this.calcolaPuntaggio();
    this.gestisciMarkers();
    this.mostraTorre(torre);
  }
  private mostraTorre(torre: string) {
    let indexTorre = this.getNumeroDellaTorre(torre);
    console.log("sono dentro mostraTorre" + indexTorre);
    if (this.torriGiocatore[indexTorre] != undefined) {
      for (
        let index = 0;
        index < this.torriGiocatore[indexTorre].length;
        index++
      ) {
        let classe = this.torriGiocatore[indexTorre][index].getSymbol();
        let valore = this.torriGiocatore[indexTorre][index].getValue();
        $(document).ready(function () {
          $(".carte-delle-torri:eq(" + indexTorre + ") div:eq(" + index + ")")
            .css({ border: "1px solid white" })
            .addClass(classe)
            .text(valore);
        });
      }
    }
  }

  private calcolaPuntaggio() {
    for (
      let indexTorre = 0;
      indexTorre < this.torriGiocatore.length;
      indexTorre++
    ) {
      if (this.torriGiocatore[indexTorre] != undefined) {
        let punti = 0;
        for (
          let indexCarta = 0;
          indexCarta < this.torriGiocatore[indexTorre].length;
          indexCarta++
        ) {
          if (
            this.torriGiocatore[indexTorre][indexCarta].getSymbol() === "Punta"
          ) {
            punti = punti * 2;
          } else {
            punti += +this.torriGiocatore[indexTorre][indexCarta].getValue();
          }
        }
        $(document).ready(function () {
          $("#" + indexTorre + ".punteggio").html("<div><div></div></div>");
          $("#" + indexTorre + ".punteggio").text(punti);
        });
      }
    }
  }

  private gestisciMarkers() {
    /*in caso un Torre avesse una carta,il suo marker o il suo trateggio
    viene nascosto */
    for (let index = 0; index < this.torriGiocatore.length; index++) {
      if (this.torriGiocatore[index] !== undefined) {
        $(document).ready(function () {
          $(".carte-delle-torri:eq(" + index + ") div:eq(8)").css({
            border: "transparent",
          });
        });
      }
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
      new Carta("Punta", "P"),
      new Carta("Triangolo", "7"),
      new Carta("Cerchio", "1"),
      new Carta("Cerchio", "2"),
      new Carta("Cerchio", "3"),
      new Carta("Cerchio", "4"),
      new Carta("Cerchio", "5"),
      new Carta("Punta", "P"),
      new Carta("Cerchio", "7"),
      new Carta("Triangolo", "4"),
      new Carta("Triangolo", "1"),
      new Carta("Punta", "P"),
      new Carta("Ancora", "5"),
    ];
  }

  private mostraMazzo(): void {
    /*funzione per proiettare correttamente le carte del mazzo/mano,
    nei corrispettivi colori e valori,viene associata per ogni carta un suo unico ID
    settandolo nel'oggetto e aggiungendolo come attributo all'elemento div nel 
    template*/

    this.mano.forEach((carta, index = 0) => {
      $(document).ready(function () {
        let classe = carta.getSymbol();
        $(".mazzo > div:eq(" + index + ")")
          .addClass(classe)
          .attr("id", "id" + index);
      });
      this.mano[index].setId(index);
    });

    /* console.log("Il mio mazzo:");
    console.log(this.mazzo);*/
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

    this.mano.forEach((carta, index = 0) => {
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
    if (this.mano.length === 3) {
      //per pescare dal mazzo coperto il mazzo deve avere sempre 3 carte
      this.mano.unshift(this.mazzoCoperto.shift());
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

    if (this.mano.length === 3) {
      /*se nel mazzo ci sono 3 carte
      vuol dire che il giocatore vuole pescare una carta scartata,
      e il giocatore non dovrebbe aver selezionato una carta quando la 
      si pesca dal mazzo scarti.*/
      if (this.isSelectedUnaCartaDalMazzo()) {
        this.mostraMessaggioDiAvviso("Non puoi scartare con tre carte!");
        this.deselezionaLaCartaSelezionata();
      } else {
        this.pescaCartaScartata();
      }
    }

    if (this.mano.length === 4) {
      /*se il mazzo é uguale a 4 vuol dire che il giocatore vuole scartare una carta selezionata.*/
      if (this.isSelectedUnaCartaDalMazzo()) {
        this.scartaLaCarta();
      } else {
        this.mostraMessaggioDiAvviso("Nessuna carta selezionata!");
        this.deselezionaLaCartaSelezionata();
      }
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
    if (this.mano.length === 3) {
      if (this.isSelectedUnaCartaDalMazzo()) {
        this.mostraMessaggioDiAvviso("Pesca dal mazzo coperto!");
        this.deselezionaLaCartaSelezionata();
      } else {
        let copiaMazzoScarti: [Carta];
        for (let index = 0; index < this.mazzoScarti.length; index++) {
          if (this.mazzoScarti[index].getId() === cartaId) {
            this.mano.push(this.mazzoScarti[index]);
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
      for (let index = 0; index < this.mano.length; index++) {
        if (this.mano[index].isSelected()) {
          this.mano[index].setSelected(false);
          if (this.mazzoScarti === undefined) {
            this.mazzoScarti = [this.mano[index]];
          } else {
            if (this.mazzoScarti.length === 24) {
              this.mostraMessaggioDiAvviso(
                "Il mazzo degli scarti è pieno! gioca la tua carta"
              );
              this.deselezionaLaCartaSelezionata();
              if (copiaMazzo === undefined) {
                copiaMazzo = [this.mano[index]];
              } else {
                copiaMazzo.push(this.mano[index]);
              }
            } else {
              this.mazzoScarti.unshift(this.mano[index]);
            }
          }
        } else {
          if (copiaMazzo === undefined) {
            copiaMazzo = [this.mano[index]];
          } else {
            copiaMazzo.push(this.mano[index]);
          }
        }
      }
      this.mano = undefined;
      this.mano = copiaMazzo;
      console.log("é stata scartata una carta!");
      console.log(this.mazzoScarti);
    } else {
      /* nessuna carta è stata selezionata mostra un messaggio...*/
      this.mostraMessaggioDiAvviso("Nessuna carta selezionata!");
    }
  }

  private isSelectedUnaCartaDalMazzo(): boolean {
    let selezionato = false;
    for (let index = 0; index < this.mano.length; index++) {
      if (this.mano[index].isSelected()) {
        selezionato = true;
      }
    }
    return selezionato;
  }

  private deselezionaLaCartaSelezionata() {
    for (let index = 0; index < this.mano.length; index++) {
      if (this.mano[index].isSelected()) {
        this.mano[index].setSelected(false);
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
      this.mano.push(carta);
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
