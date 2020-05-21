import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GiocatoreService } from '../../service/giocatore-service.service';
import { Giocatore } from '../../model/giocatore';

@Component({
  selector: 'app-formuser',
  templateUrl: './formuser.component.html',
  styleUrls: ['./formuser.component.css']
})
export class FormuserComponent {

  giocatore: Giocatore;
  comparePassword:string;
  
  constructor(private route: ActivatedRoute, private router: Router, private giocatoreService: GiocatoreService) {
   //this.giocatore = new Giocatore();
  }

  onSubmit() {
    this.giocatoreService.save(this.giocatore).subscribe((result) => this.gotoListaGiocatori());
  }

  gotoListaGiocatori() {
    this.router.navigate(['/giocatori']);
  }

}
