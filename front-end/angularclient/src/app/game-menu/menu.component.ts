import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

private nomeGiocatore: string;

  constructor(private autenticazione: AuthenticationService) { 
    
  }

  ngOnInit() {
    console.log(this.autenticazione.getNomeGiocatore());
    this.nomeGiocatore = this.autenticazione.getNomeGiocatore();
  }

  public getNomeGiocatore(): string {
    return this.nomeGiocatore;
  }

}
