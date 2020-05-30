import { Component, OnInit } from '@angular/core';
import { Giocatore } from '../model/giocatore';
import { GiocatoreService } from '../service/giocatore-service.service';
import { Carta } from '../model/Carta';

@Component({
selector: 'app-listagiocatori',
templateUrl: './listagiocatori.component.html',
styleUrls: ['./listagiocatori.component.css']
})

export class ListagiocatoriComponent implements OnInit {
  giocatori: Giocatore[];
  mano:any;

  
  constructor(private giocatoreService: GiocatoreService) { }

  ngOnInit() {
    this.giocatoreService.findAll().subscribe(data => {this.giocatori = data});
    this.giocatoreService.findAll().subscribe(data => {this.mano = data[0].mano});
  }
}