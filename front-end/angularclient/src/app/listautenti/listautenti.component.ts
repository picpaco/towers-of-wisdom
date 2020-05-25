import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-listautenti',
  templateUrl: './listautenti.component.html',
  styleUrls: ['./listautenti.component.css']
})
export class ListautentiComponent implements OnInit {
  utenti:User[];
  
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.findAll().subscribe(data => {this.utenti = data;});
    
  }

}
