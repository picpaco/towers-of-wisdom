import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  username = "";
  password = "";
  controllo: boolean;
  percorso:string;

  constructor() {
   
    
   }


  ngOnInit() {
  }


  controlloCredenziali() {
    if (this.username.length < 8 || this.password.length < 8) {
      this.controllo = true;
      this.percorso="/login"
    }else{
      this.controllo = false;
      this.percorso="/menu-di-gioco"
    }
  }

 
}
