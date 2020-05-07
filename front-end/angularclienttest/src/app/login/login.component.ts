import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Utente } from '../model/utente';
import { ConfigService } from '../service/config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    utente : Utente;
    password='';
    username='';

  constructor(   
    private route: ActivatedRoute,
    private router: Router,
    private utenteService: ConfigService,
    ) { 
      this.utente=new Utente();
    }

    onSubmit() {
      this.utenteService
        .save(this.utente);
    }

  ngOnInit(): void {
  }

}
