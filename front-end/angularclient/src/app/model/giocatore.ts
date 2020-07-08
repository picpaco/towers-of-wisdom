import { Adapter } from "./Adapter";
import { Injectable } from "@angular/core";

export class Giocatore {
  nome: string;
  numeroPartiteTotali: number;
  numeroVittorie: number;
  posizione: number;
  mano: any;
  numeroSconfitte: number;

  public constructor(
    nome: string,
    numeroPartiteTotali: number,
    numeroVittorie: number,
    numeroSconfitte: number
  ) {
    this.nome = nome;
    this.numeroPartiteTotali = numeroPartiteTotali;
    this.numeroVittorie = numeroVittorie;
    this.numeroSconfitte = numeroSconfitte;
  }

  public getPosizione(): number {
    return this.posizione;
  }

  public getNome(): string {
    return this.nome;
  }

  public getNumeroPartiteTotali(): number {
    return this.numeroPartiteTotali;
  }

  public getNumeroVittorie(): number {
    return this.numeroVittorie;
  }

  public getPercentualeVittorie(): string {
    return (
      ((this.numeroVittorie * 100) / this.numeroPartiteTotali).toFixed() + "%"
    );
  }

  public getNumeroSconfitte(): number {
    return this.numeroSconfitte;
  }
}

@Injectable({
  providedIn: "root",
})
export class GiocatoreAdapter implements Adapter<Giocatore> {
  adapt(item: any): Giocatore {
    return new Giocatore(
      item.nome,
      item.numeroPartiteTotali,
      item.numeroVittorie,
      item.numeroSconfitte
    );
  }
}
