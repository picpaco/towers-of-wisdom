import { Component, OnInit, Input } from "@angular/core";
import { DataService } from "../landing-page/data.service";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/service/authentication.service";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"],
})
export class LoginPageComponent implements OnInit {
  username = "";
  password = "";
  invalidLogin = false;

  @Input() error: string | null;

  constructor(
    private data: DataService,
    private loginservice: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {

  }
  private playAudio() {
    let audio = new Audio();
    audio.src = "../../assets/music/glug.wav";
    audio.load();
    audio.play();
  }

  checkLogin() {
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

  updateData(bottoneLanding: boolean) {
    this.data.updateData(bottoneLanding);
    this.aggiornaStringa("Gioco di carte strategico per due persone");
  }

  aggiornaStringa(intro: string) {
  
    this.data.aggiornaStringa(intro);
  }
}
