import { Adapter } from './Adapter';
import { Injectable } from '@angular/core';

 export class Giocatore {
  nome: string;
  numeroPartiteTotali: number;
	numeroVittorie: number;

   posizione: number;
//   // private punteggioTotale: number;
//   // private partiteVinte: number;
//   // private partitePerse: number;
//   // private percentualeVittorie: string;
//   // private partiteGiocate: number;
 mano:any;

 public constructor(nome: string, numeroPartiteTotali: number,	numeroVittorie: number) {
    this.nome = nome;
    this.numeroPartiteTotali = numeroPartiteTotali;
    this.numeroVittorie = numeroVittorie;
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
        return ((this.numeroVittorie*100)/this.numeroPartiteTotali).toFixed()+"%";
      }

 }


 @Injectable({
    providedIn: "root",
  })
  export class GiocatoreAdapter implements Adapter<Giocatore> {
     adapt(item: any): Giocatore {
         
         return (new Giocatore(item.nome,item.numeroPartiteTotali,item.numeroVittorie)) 
     }
  }
