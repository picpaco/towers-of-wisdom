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

  giocatori:Giocatore[];

  constructor(private giocatoreService:GiocatoreService) { }

  ngOnInit() {
    this.giocatoreService.findAll().subscribe(data => {this.giocatori = data;});
    console.log('Sto dentro il metodo ngOnInit');
    console.log(this.giocatori[0].mano);
  }



 

}
