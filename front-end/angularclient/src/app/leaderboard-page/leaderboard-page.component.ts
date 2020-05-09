import { Component, OnInit } from '@angular/core';
import { Giocatore } from '../model/giocatore';
import { GiocatoreService } from '../service/giocatore-service.service';


@Component({
  selector: 'app-leaderboard-page',
  templateUrl: './leaderboard-page.component.html',
  styleUrls: ['./leaderboard-page.component.css'],
})
export class LeaderboardPageComponent implements OnInit {

  public giocatori: Giocatore[];

  constructor(private giocatoreService: GiocatoreService) {}

  ngOnInit(): void {

    this.giocatoreService.findAll().subscribe((data) => {
      
      this.giocatori = data;

    });


  }

  
}
