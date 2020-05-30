import { Injectable } from "@angular/core";
import {Adapter} from "./Adapter";

export class Carta {
  private selected: boolean;
  private symbol:string;
  private value:string;
  private id:number;

  public constructor(symbol:string,value:string) {
    this.selected = false;
    this.symbol=symbol;
    this.value=value;
  }

  public getValue():string{

    return this.value;
  }

  public getSymbol():string{
    return this.symbol;
  }

  public getInitial():string{
    return this.symbol.slice(0,1);
  }

  public setId(id:number){
    this.id=id;
  }

  public getId():string{
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
   providedIn: "root"
 })
 export class CartaAdapter implements Adapter<Carta> {
   adapt(item: any): Carta {
     return new Carta(item.simbolo,item.valore);
   }
 }