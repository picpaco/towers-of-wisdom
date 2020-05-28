export class Giocatore {
  private id: string;
  private nome: string;
  private punteggioTotale: number;
  private partiteVinte : number;
  private partitePerse : number;
  private percentualeVittorie : string;
  private partiteGiocate : number;

  public constructor(){}


  public getNome():string{
    return this.nome;
  }

}

