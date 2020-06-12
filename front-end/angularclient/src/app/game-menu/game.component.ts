import { Component, OnInit } from '@angular/core';
import { GiocatoreService } from '../service/giocatore-service.service';
import { Carta } from '../model/Carta';
import { Giocatore } from '../model/giocatore';
import { AuthenticationService } from '../service/authentication.service';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

private nomeGiocatore: string;
private nome: any;

  constructor(private autenticazione: AuthenticationService, private giocatoreService : GiocatoreService) { 
    
  }

  ngOnInit() {
    console.log(this.autenticazione.getNomeGiocatore());
    this.nomeGiocatore = this.autenticazione.getNomeGiocatore();

    //this.giocatoreService.inviaDatiGiocatore(this.nomeGiocatore).subscribe();
  }
  public getNomeGiocatore(): string {
    return this.nomeGiocatore;
  }

}
