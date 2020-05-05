import { Component, OnInit } from '@angular/core';
import { Giocatore } from '../model/giocatore';
import { GiocatoreService } from '../service/giocatore-service.service';
@Component({
selector: 'app-listagiocatori',
templateUrl: './listagiocatori.component.html',
styleUrls: ['./listagiocatori.component.css']
})
export class ListagiocatoriComponent implements OnInit {
giocatori: Giocatore[];
constructor(private giocatoreService: GiocatoreService) { }
ngOnInit() {
this.giocatoreService.findAll().subscribe(data => {
this.giocatori = data;
});
}
}