export class Carta {
  private selected: boolean;
  private symbol:string;
  private Id:number;

  public constructor(symbol:string) {
    this.selected = false;
    this.symbol=symbol;
  }

  public getSymbol():string{
    return this.symbol;
  }

  public setId(id:number){
    this.Id=id;
  }

  public getId():string{
    return this.Id.toFixed();
  }

  public isSelected(): boolean {
    return this.selected;
  }

  public setSelected(sel: boolean): void {
    this.selected = sel;
  }

}
