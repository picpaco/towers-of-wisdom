import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  title: string;
  bottoneLanding: boolean
  intro: string;

 

  constructor(private data:DataService ) {
    this.title = "Towers of wisdom";
  }


  nascondi() {
    this.bottoneLanding = false;
    this.intro="Accedi per giocare gratis";
  }

  

 
  

  ngOnInit() {
    this.data.share.subscribe(x=>this.bottoneLanding=x);
    this.data.stringaCondivisa.subscribe(nuovaStringa=>this.intro=nuovaStringa);
  }

}
