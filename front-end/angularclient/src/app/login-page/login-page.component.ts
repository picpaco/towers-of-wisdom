import { Component, OnInit, Input } from "@angular/core";
import { DataService } from "../landing-page/data.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "src/app/service/authentication.service";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  ReactiveFormsModule,
} from "@angular/forms";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"],
})
export class LoginPageComponent implements OnInit {
  username: string;
  password: string;
  invalidLogin = false;
  strongRegex = new RegExp("^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.{8,15})");
  loginForm: FormGroup;
  returnUrl: string;
  submitted: boolean;
  @Input() error: string | null;

  constructor(
    private formBuilder: FormBuilder,
    private data: DataService,
    private route: ActivatedRoute,
    private loginservice: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required], //Validators.minLength(5),Validators.maxLength(15)],
      password: ["", Validators.required], //Validators.pattern(this.strongRegex)]
    });
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  private playAudio() {
    let audio = new Audio();
    audio.src = "../../assets/music/glug.wav";
    audio.load();
    audio.play();
  }

  /*CheckLoginFrontEnd(){
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],//,Validators.minLength(5),Validators.maxLength(15)],
      password: ['', Validators.required],//,Validators.pattern(this.strongRegex)]
      
  });
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }*/

  // checkLogin() {
  //   //this.CheckLoginFrontEnd();
  //   console.log("in checkLogin(): " + this.username + " " + this.password);

  //   this.loginservice.authenticate(this.username, this.password).subscribe(
  //     (data) => {
  //       this.router.navigate(["menu-di-gioco"]);
  //       this.invalidLogin = false;
  //     },
  //     (error) => {
  //       this.invalidLogin = true;
  //       this.error = error.message;
  //       console.log(this.error);
  //     }
  //   );
  // }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    console.log("in checkLogin(): " + this.username + " " + this.password);

    this.loginservice.authenticate(this.username, this.password).subscribe(
      (data) => {
        this.router.navigate(["menu-di-gioco"]);
        this.invalidLogin = false;
      },
      (error) => {
        this.invalidLogin = true;
        this.error = error.message;
        console.log(this.error);
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  updateData(bottoneLanding: boolean) {
    this.data.updateData(bottoneLanding);
    this.aggiornaStringa("Gioco di carte strategico per due persone");
  }

  aggiornaStringa(intro: string) {
    this.data.aggiornaStringa(intro);
  }
}
