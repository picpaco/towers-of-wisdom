export class Carta {
  private position: string;
  private selected: boolean;

  public constructor(pos: string) {
    this.position = pos;
    this.selected = false;
  }

  public isSelected(): boolean {
    return this.selected;
  }

  public setSelected(sel: boolean): void {
    this.selected = sel;
  }

  public getPosition(): string {
    return this.position;
  }
}
