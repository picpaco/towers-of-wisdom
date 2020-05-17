import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../landing-page/restapi.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  users:any;
  constructor(private service: RestapiService) { }

  ngOnInit() {
  }

  getUsers(){
    let resp= this.service.getUsers();
    resp.subscribe(data=>this.users=data);
  }

}
