import { Carta } from './Carta';
import { Injectable } from '@angular/core';
import { Adapter } from './Adapter';

export class DatiPartita {
    private mano: Carta[];

    public constructor(mano: Carta[]) {
        this.mano = mano;
    }

    public setMano(nuovaMano: Carta[]): void {
        this.mano = nuovaMano;
    }

    public getMano(): Carta[] {
        return this.mano;
    }

}



