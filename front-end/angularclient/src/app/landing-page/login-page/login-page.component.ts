import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  username = 'stefano89';
  password = 'stefanorusso';
  invalidLogin: boolean = false;
  bottoneLanding: boolean = true;
 


  constructor(private data: DataService, private loginservice: AuthenticationService, private router: Router) {
  }


  ngOnInit() {}


  checkLogin() {


    // (this.loginservice.authenticate(this.username, this.password).subscribe(
    //   data => {
    //     console.log(data);
    //     if (this.username.length >= 8 && this.password.length >= 8){
    //     this.router.navigate(['/menu-di-gioco'])
    //     this.invalidLogin = false
    //     }
    //   },
    //   error => {
    //     if (this.username.length < 8 || this.password.length < 8) {
    //       this.invalidLogin = true
    //     }

    //   }
    // )
    // );

    (this.loginservice.authenticate(this.username, this.password).subscribe(
      data => {
        console.log(data);
        // if (this.username.length >= 8 && this.password.length >= 8){
        this.invalidLogin = false;
         this.router.navigate(['/menu-di-gioco'])
         
        // }
      },
      error => {
        // if (this.username.length < 8 || this.password.length < 8) {
          this.invalidLogin = true;
        // }

      }
    )
    );



  }


  updateData(bottoneLanding: boolean) {
    this.data.updateData(bottoneLanding);
    this.aggiornaStringa("Gioco di carte strategico per due persone")
  }

  aggiornaStringa(intro: string) {
    this.data.aggiornaStringa(intro);
  }








}
