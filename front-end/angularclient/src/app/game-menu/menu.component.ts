import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

private nomeGiocatore: string=this.autenticazione.getNomeGiocatore();

  constructor(private autenticazione: AuthenticationService,private route:Router) { 
    
  }

  ngOnInit() {

  }

  public getNomeGiocatore(): string {
    return this.nomeGiocatore;
  }



}
