import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import{ DataService } from '../../data.service'

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
  bottoneLanding:boolean=true;
 

  constructor(private data:DataService) {
   
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

  updateData(bottoneLanding: boolean){
    this.data.updateData(bottoneLanding);
    this.aggiornaStringa("Gioco di carte strategico per due persone")
  }

  aggiornaStringa(intro:string){
    this.data.aggiornaStringa(intro);
  }

 
  




 
}
