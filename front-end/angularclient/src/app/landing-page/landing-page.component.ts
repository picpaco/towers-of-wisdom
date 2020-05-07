import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  title:string;
 bottoneLanding:boolean=true;
 bottoneIndietro:boolean=false;

  constructor() { 
    this.title="Towers of wisdom";
  }


  nascondi() {
    this.bottoneLanding=false;
    this.bottoneIndietro=true;
    
  }

  visualizza(){
    this.bottoneLanding=true;
    this.bottoneIndietro=false;

  }

  ngOnInit() {
  }

}
