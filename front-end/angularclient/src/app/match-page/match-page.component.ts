import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
import { Giocatore } from "../model/giocatore";
import { Carta, CartaAdapter } from "../model/Carta";
import { ActivatedRoute } from "@angular/router";
import {
  MazzoCopertoService,
  ManoService,
  MazzoScartiService,
} from "../service/mano.service";
import { asyncScheduler } from "rxjs";
import { AuthenticationService } from "../service/authentication.service";
import { DatiPartitaService } from "../service/Dati-partita.service";

@Component({
  selector: "app-match-page",
  templateUrl: "./match-page.component.html",
  styleUrls: ["./match-page.component.css"],
})
export class MatchPageComponent implements OnInit {
  public nomeGiocatore = this.autenticazione.getNomeGiocatore();
  public mano: Carta[] = [];
  public mazzoCoperto: Carta[];
  public carteRimanentiDaPescare: number = 26;
  public mazzoScarti: Carta[];
  public isTurnoGiocatore:boolean=false;

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private cartaAdapter: CartaAdapter,
    private autenticazione: AuthenticationService,
    private datiPartita: DatiPartitaService
  ) {}

  ngOnInit() {
    this.riceviDatiPartita();
    this.mostraTorriAvversario();
    this.inizializzaMazzoScarti();
    this.mostraMano();
  }
  private riceviDatiPartita() {
    let testoJson;
    let manoJson: Carta[];

    let cartaGiocataBot: Carta = undefined;
    this.activatedRoute.data.subscribe((data: { datiPartita: any }) => {
      testoJson = data;
    });
    console.log(testoJson);
    manoJson = testoJson["datiPartita"]["manoGiocatore"];
    if (testoJson["datiPartita"]["turnoBot"] === true) {
      this.isTurnoGiocatore=false;
      cartaGiocataBot = this.cartaAdapter.adapt(
        testoJson["datiPartita"]["cartaGiocataBot"]
      );
      console.log("Il bot ha giocato la carta:");
      console.log(cartaGiocataBot);
      console.log("-------------------");
      if (testoJson["datiPartita"]["cartaAvversarioGiocataSuTorre"] === true) {
        this.giocaCartaTorriAvversario(cartaGiocataBot);
      } else {
        if (this.mazzoScarti === undefined) {
          this.mazzoScarti = [cartaGiocataBot];
        } else {
          this.mazzoScarti.unshift(cartaGiocataBot);
        }
      }
    }else{
      this.mostraMessaggioDiAvviso("Tocca a te!");
      this.isTurnoGiocatore=true;
    }
    this.mano = manoJson.map((item) => this.cartaAdapter.adapt(item));
    this.mostraMazzoScarti();
  }


  
  giocaCartaTorriAvversario(cartaGiocataBot: Carta) {
    let torreDaGiocare = this.getNumeroDellaTorre(cartaGiocataBot.getSymbol());
    if (this.torriAvversario[torreDaGiocare] === undefined) {
      this.torriAvversario[torreDaGiocare] = [cartaGiocataBot];
    } else {
      this.torriAvversario[torreDaGiocare].push(cartaGiocataBot);
    }

    console.log(this.torriAvversario);
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
      if (carta.getValue() !== "P") {
        sicuro = true;
      }
    } else {
      /*se la torreCopia ha dei valori vuol dire che la torre esiste e bisogna controllare l'ordine delle carte*/

      if (carta.getValue() === "P") {
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

  public giocatoreGiocaSullaTorre(torre: string) {
    this.isTurnoGiocatore=true;
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
                this.isTurnoGiocatore=false;
              
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
      if(!this.isTurnoGiocatore){
      this.BotGiocaLaSuaMossa();
      }
      this.mostraMano();
      this.mostraTorri();
    } else {
      this.mostraMessaggioDiAvviso(
        "Pesca dal mazzo scarti o dal mazzo coperto!"
      );
      this.deselezionaLaCartaSelezionata();
    }
  }

  private giocaCartaSullaTorre(torreDaVisualizzare: string) {
    this.nascondiMessaggioDiAvviso();
    let copiaMano: [Carta]; //una copia del mazzo per inserire tutte quelle carte non selezionate
    let indexTorre = this.getNumeroDellaTorre(torreDaVisualizzare);
    this.mano.forEach((carta, index) => {
      if (carta.isSelected()) {
        carta.setSelected(false);
        if (this.torriGiocatore[indexTorre] === undefined) {
          this.torriGiocatore[indexTorre] = [carta];
        } else {
          this.torriGiocatore[indexTorre].push(carta);
        }
        this.giocatoreGiocaSuTorre_Back_End(carta);
      } else {
        //le tre carte della mano non selezionata saranno memorizzate nella copia
        if (copiaMano === undefined) {
          copiaMano = [carta];
        } else {
          copiaMano.push(carta);
        }
      }
    });
    console.log("inserita carta nella torre :" + torreDaVisualizzare);
    console.log(this.torriGiocatore);
    this.mano = undefined; //infine il mazzo nuovo sarà composto solo da tre carte
    this.mano = copiaMano;
  }

  public giocatoreGiocaSuTorre_Back_End(carta: Carta): void {
    //si fa un post per aggiornare il backend
    let func = () => {
      console.log(carta);
      this.datiPartita.giocatoreGiocaCartaSuTorre(carta).subscribe();
    };
    asyncScheduler.schedule(func, 150);
  }

  public giocatoreScartaSuScarti_Back_End(carta: Carta): void {
    let func = () => {
      console.log(carta);
      this.datiPartita.giocatoreScartaCartaSuScarti(carta).subscribe();
    };
    asyncScheduler.schedule(func, 150);
  }

  public giocatorePescaDaMazzoScarti_Back_End(carta: Carta): void {
    let func = () => {
      console.log(carta);
      this.datiPartita
        .selezionaLaCartaDaPescareDalMazzoScarti(carta)
        .subscribe();
    };
    asyncScheduler.schedule(func, 150);
  }

  private mostraTorri() {
    //questa funzione serve per calcolare il punteggio di ogni torre,gestire i markers e visualizzare la torre.
    this.calcolaPuntaggio();
    this.gestisciMarkers();
    this.mostraTorriGiocatore();
  }

  private mostraTorriGiocatore() {
    this.torriGiocatore.forEach((torre, indexTorre) => {
      if (torre != undefined) {
        torre.forEach((carta, index) => {
          let classe = carta.getSymbol();
          let valore = carta.getValue();
          let image = carta.getImage();
          $(document).ready(function () {
            $(".carte-delle-torri:eq(" + indexTorre + ") div:eq(" + index + ")")
              .css({ border: "1px solid white" })
              .addClass(classe)
              .text(valore);
            $(".carte-delle-torri:eq(" + indexTorre + ") img:eq(" + index + ")")
              .attr("src", "../../assets/images/" + image + ".png")
              .css({ visibility: "visible" });
          });
        });
      }
    });
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
          if (this.torriGiocatore[indexTorre][indexCarta].getValue() === "P") {
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
  public async giocatorePescaDalMazzoCoperto() {
    /*questo metodo viene richiamata nel template attraverso l'attributo (click)  */
    let cartaPescata: Carta;

    if (this.mano.length === 3) {
      this.datiPartita.pescaDalMazzoCoperto().subscribe((data) => {
        cartaPescata = this.cartaAdapter.adapt(data);
        console.log(cartaPescata);
      });
      let func = () => {
        console.log("carta pescata dal mazzo coperto: ");
        // console.log(manoNuovaJson);

        this.mano.push(cartaPescata);
        this.carteRimanentiDaPescare -= 1;
        this.mostraMano();
      };
      asyncScheduler.schedule(func, 500);
    } else {
      this.mostraMessaggioDiAvviso("Devi giocare la tua carta");
    }
  }

  
  private async BotGiocaLaSuaMossa() {
    /*questo metodo viene richiamata nel template attraverso l'attributo (click)  */
    let testoJson:any;

      let func = () => {

        let cartaGiocataBot =undefined;

        console.log("Il bot gioca la sua mossa...");
        if(testoJson.turnoBot === true){
          cartaGiocataBot = this.cartaAdapter.adapt(
            testoJson["cartaGiocataBot"]
          );
          console.log("Carta giocata dal bot:");
          console.log(cartaGiocataBot);
        if(testoJson["cartaAvversarioGiocataSuTorre"] === true){
          console.log("---Il bot ha giocato su una torre!---");
          this.giocaCartaTorriAvversario(cartaGiocataBot);
          this.carteRimanentiDaPescare-=1;
        }else{
          console.log("---Il bot ha giocato sul mazzo scarti!---");
          if (this.mazzoScarti === undefined) {
            this.mazzoScarti = [cartaGiocataBot];
          } else {
            this.mazzoScarti.push(cartaGiocataBot);
          }
        }
      }
      //console.log(testoJson);
      this.mostraTorriAvversario();
      //this.mostraMazzoScarti();
      this.mostraCarteScartate();
      };
     
      this.datiPartita.giocaBot().subscribe((data) => {
        testoJson = data
      });
  
      asyncScheduler.schedule(func, 1000);
      

    
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
        this.BotGiocaLaSuaMossa();
      } else {
        this.mostraMessaggioDiAvviso("Nessuna carta selezionata!");
        this.deselezionaLaCartaSelezionata();
      }
    }

    this.mostraMano();
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
        let image = this.mazzoScarti[0].getImage();
        $(document).ready(function () {
          $(".mazzo-scarti >div:eq(0)").css({ border: "transparent" });
          $(".mazzo-scarti div div").addClass(classe);
          $(".pannello-degli-scarti").css({ visibility: "hidden" });
          $(".mazzo-scarti div div img").attr(
            "src",
            "../../assets/images/" + image + ".png"
          );
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
        //controlla se nella mano è presente una carta selezionata
        this.mostraMessaggioDiAvviso("Pesca dal mazzo coperto!");
        this.deselezionaLaCartaSelezionata();
      } else {
        let copiaManoScarti: [Carta];
        //una copia per tenere tutte le carte scartate che non sono state selezionate
        this.mazzoScarti.forEach((carta) => {
          //si cicla nel mazzo scarti per cercare la carta selezionata tramite Id
          if (carta.getId() === cartaId) {
            this.mano.push(carta);
            this.giocatorePescaDaMazzoScarti_Back_End(carta);
            //this.salvaCartaSulMazzoScartiBackEnd(this.mazzoScarti[index]);
          } else {
            if (copiaManoScarti === undefined) {
              copiaManoScarti = [carta];
            } else {
              copiaManoScarti.push(carta);
            }
          }
        });
        this.mazzoScarti = undefined;
        this.mazzoScarti = copiaManoScarti;

        this.mostraMano();
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
    if(this.mazzoScarti!=undefined){
    let m = this.mazzoScarti.length - 1;
    for (let index = m; index >= 0; index--) {
      let classe = this.mazzoScarti[index].getSymbol();
      let valore = this.mazzoScarti[index].getValue();
      let image = this.mazzoScarti[index].getImage();

      $(document).ready(function () {
        $(".pannello-degli-scarti div:eq(" + index + ")")
          .addClass(classe)
          .text(valore)
          .css({
            transform: "rotate(3deg)",
          })
          .attr("id", "id" + index)
          .append("<img class= 'imgcarta'>");
        $(".pannello-degli-scarti div:eq(" + index + ") img")
          .attr("src", "../../assets/images/" + image + ".png")
          .css({
            height: "30px",
            width: "40px",
            position: "relative",
            bottom: "10px",
          });
      });
      this.mazzoScarti[index].setId(index);
    }
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
    let image = this.mazzoScarti[0].getImage();
    $(document).ready(function () {
      $(".mazzo-scarti div div").removeClass(classePrec);
      $(".mazzo-scarti div div").addClass(classe);
      $(".mazzo-scarti div div img").attr(
        "src",
        "../../assets/images/" + image + ".png"
      );
    });
  }

  private scartaLaCarta(): void {
    let copiaMano: [Carta];
    //si ha una copia per prendere tutte le carte che non sono state selezionate
    if (this.isSelectedUnaCartaDalMazzo()) {
      //controlla se una carta dalla mano è stata selezionata
      for (let index = 0; index < this.mano.length; index++) {
        //si cicla per trovare la carta da scartare nella mano
        if (this.mano[index].isSelected()) {
          //se questa carta è selezionata viene scartata
          this.mano[index].setSelected(false);
          this.giocatoreScartaSuScarti_Back_End(this.mano[index]);
          if (this.mazzoScarti === undefined) {
            this.mazzoScarti = [this.mano[index]];
          } else {
            if (this.mazzoScarti.length === 24) {
              this.mostraMessaggioDiAvviso(
                "Il mazzo degli scarti è pieno! gioca la tua carta"
              );
              this.deselezionaLaCartaSelezionata();
              if (copiaMano === undefined) {
                copiaMano = [this.mano[index]];
              } else {
                copiaMano.push(this.mano[index]);
              }
            } else {
              this.mazzoScarti.unshift(this.mano[index]);
            }
          }
          //this.scartaUnaCartaBackEnd(this.mano[index]); //si fa un post per aggiornare il backend
        } else {
          if (copiaMano === undefined) {
            copiaMano = [this.mano[index]];
          } else {
            copiaMano.push(this.mano[index]);
          }
        }
      }
      this.mano = undefined;
      this.mano = copiaMano;
      //la mano sarà nuovamente contenuta dal resto delle carte non selezionate
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
    //il primo elemento in mazzo scarti viene sempre visualizzato per primo
    //nel mazzo scarti non nel pannello degli scarti !
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
      this.giocatorePescaDaMazzoScarti_Back_End(carta);
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

  private mostraMano(): void {
    /*funzione per proiettare correttamente le carte del mazzo/mano,
    nei corrispettivi colori e valori,viene associata per ogni carta un suo unico ID
    settandolo nel'oggetto e aggiungendolo come attributo all'elemento div nel 
    template*/

    this.mano.forEach((carta, index = 0) => {
      //console.log(carta);
      $(document).ready(function () {
        let classe = carta.getSymbol();
        let image = carta.getImage();

        // console.log(image);
        $(".mazzo > div:eq(" + index + ")")
          .addClass(classe)
          .attr("id", "id" + index);
        $(".mazzo > div:eq(" + index + ") p img").attr(
          "src",
          "../../assets/images/" + image + ".png"
        );
      });
      this.mano[index].setId(index);
    });

    /* console.log("Il mio mazzo:");
    console.log(this.mazzo);*/
  }

  private mostraTorriAvversario() {

    this.torriAvversario.forEach((torre, indexTorre = 0) => {
      if (torre != undefined) {
        torre.forEach((carta, index = 0) => {
          let classe = carta.getSymbol();
          let valore = carta.getValue();
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
        });
      }
    });
  }
}
