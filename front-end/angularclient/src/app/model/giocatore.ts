import { MazzoCoperto } from './MazzoCoperto';
import { Carta } from './Carta';

export class Giocatore {
  //private id: string;
  private nome: string;
  // private punteggioTotale: number;
  // private partiteVinte: number;
  // private partitePerse: number;
  // private percentualeVittorie: string;
  // private partiteGiocate: number;
   mano:Array<Carta>;

  public constructor() { }


  public getNome(): string {
    return this.nome;
  }

  public getMano():Array<Carta>{
    return this.mano;
  }

  
}

