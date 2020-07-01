import { Injectable } from "@angular/core";
import { Adapter } from "./Adapter";


export class Carta {
  private selected: boolean;
  private symbol: string;
  private value: string;
  private id: number;


  public constructor(symbol: string, value: string) {
    this.selected = false;
    this.symbol = symbol;
    this.value = value;
    }

  public getValue(): string {

    return this.value;
  }

  public getSymbol(): string {
    return this.symbol;
  }

  public getInitial(): string {
    return this.symbol.slice(0, 1);
  }

 
  public getImage(): string {
    let img = "";
    if(this.value=="X2"){
      img = "ostrica-cima";
    } else if(this.getInitial() == "Q") {
      img = "octo-quadrato";
    } else if(this.getInitial() == "A") {
        img = "anchor-ancora";
    } else if(this.getInitial() == "T") { 
        img = "stella-triangolo";
    } else if(this.getInitial() == "C") {
      img="fish-cerchio";
    }
    return img;
  }

  public setId(id: number) {
    this.id = id;
  }

  public getId(): string {
    return this.id.toFixed();
  }

  public isSelected(): boolean {
    return this.selected;
  }

  public setSelected(sel: boolean): void {
    this.selected = sel;
  }
}

@Injectable({
  providedIn: "root",
})
export class CartaAdapter implements Adapter<Carta> {
  adapt(item: any): Carta {
    let simbol : string;
    let value : string;
    switch(item.simbolo) {
      case "A":
        simbol = "Ancora";
        break;
      case "Q":
        simbol = "Quadrato";
        break;
      case "C":
        simbol = "Cerchio";
        break;      
       case "T":
          simbol = "Triangolo";
          break;
    }
    switch(item.valore){
      case "UNO":
        value = "1";
        break;
        case "DUE":
        value = "2";
        break;
        case "TRE":
        value = "3";
        break;
        case "QUATTRO":
        value = "4";
        break;
        case "CINQUE":
        value = "5";
        break;
        case "SEI":
        value = "6";
        break;
        case "SETTE":
        value = "7";
        break;
        case "CIMA":
        value = "X2";
        break;
    }

    
    return new Carta(simbol, value);
  }

  
}
