import { Component, OnInit } from '@angular/core';
import { GiocatoreService } from '../service/giocatore-service.service';
import { Carta } from '../model/Carta';
import { Giocatore } from '../model/giocatore';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor() { 
  }

  ngOnInit() {}
 

}
