import { Carta } from './Carta';

export abstract class Mazzo {
    protected listaCarte: Array<Carta>;

    protected getListaCarte(): Array<Carta> {
        return this.listaCarte;
    }

    public isVuoto(): boolean {
        let vuoto: boolean;
        if (this.listaCarte.length === 0) {
            vuoto = true;
        }else{
            vuoto = false;
        }
        return vuoto;
    }

    public dimensione():number{
        return this.listaCarte.length;
    }

}

