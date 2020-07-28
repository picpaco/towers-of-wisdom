import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserService} from'src/app/service/user.service';
import { AlertService} from'src/app/service/alert.service';
import { User } from 'src/app/model/user';

@Component({ templateUrl: 'formuser.component.html' })
export class FormuserComponent implements OnInit {
    user = new User;
    strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,15}');
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.userValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            username: ['', Validators.required],
            email:   ['', [Validators.required,Validators.email]],
            password: ['', [Validators.required,Validators.pattern(this.strongRegex)]],
            confermaPassword: ['',Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
       
        
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}

//Vecchio codice di userService
/*import { Component } from '@angular/core';
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


}*/