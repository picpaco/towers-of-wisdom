import {Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs'



@Injectable({
    providedIn: 'root'
})
export class DataService {

    private content= new BehaviorSubject<boolean>(true);
    private contentString= new BehaviorSubject<string>("Gioco di carte strategico per due persone");
    public share= this.content.asObservable();
    public stringaCondivisa= this.contentString.asObservable();

    constructor(){ 


    }

    updateData(bottoneLanding: boolean){
        this.content.next(bottoneLanding);
    }

    aggiornaStringa(intro: string){
        console.log("sto aggiornando la stringa chiamando il form " + intro);
        this.contentString.next(intro);
    }

}