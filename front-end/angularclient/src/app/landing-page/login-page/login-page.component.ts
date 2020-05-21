import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import{ DataService } from '../../data.service'
import { RestapiService } from '../restapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  username = "";
  password = "";
  controllo: boolean;
  bottoneLanding:boolean=true;
  message:any; 
 

  constructor(private data:DataService, private service:RestapiService, private router:Router ) {
   }


  ngOnInit() {
    
  }

  doLogin(){
    /*if (this.username.length < 8 || this.password.length < 8) {
      this.controllo = true;
    }else{*/
      let resp= this.service.login(this.username,this.password);
      resp.subscribe(data=>{
        //this.message=data;
        //this.router.navigate(["/menu-di-gioco"])
        console.log(data);
      });
      //this.controllo = false;
    //}
   
  }


  

  updateData(bottoneLanding: boolean){
    this.data.updateData(bottoneLanding);
    this.aggiornaStringa("Gioco di carte strategico per due persone")
  }

  aggiornaStringa(intro:string){
    this.data.aggiornaStringa(intro);
  }

 





 
}
