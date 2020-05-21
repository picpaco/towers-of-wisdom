export class Giocatore {
  private id: string;
  private nome: string;
  private email: string;
  private password:string;
  private punteggioTotale: number;
  private partiteVinte : number;
  private partitePerse : number;
  private percentualeVittorie : string;
  private partiteGiocate : number;

  public constructor(nome:string){
    this.nome=nome;
  }

  public getNome():string{
    return this.nome;
  }

}

