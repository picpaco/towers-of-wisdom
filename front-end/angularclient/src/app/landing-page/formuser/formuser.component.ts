import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-formuser',
  templateUrl: './formuser.component.html',
  styleUrls: ['./formuser.component.css']
})
export class FormuserComponent {

  utente: User;
  passwordConfermata:boolean=false;
  
  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {
   this.utente = new User();
  }

  onSubmit() {
    // this.userService.save(this.utente).subscribe((result) => this.gotoListaGiocatori());

    this.userService.save(this.utente).subscribe((result)=>this.gotoLogin());
  }


  gotoLogin() {
    this.router.navigate(['/listautenti']);
  }


}