import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
import { Giocatore } from '../model/giocatore';

@Component({
  selector: "app-match-page",
  templateUrl: "./match-page.component.html",
  styleUrls: ["./match-page.component.css"],
})
export class MatchPageComponent implements OnInit {

  player:Giocatore;

  constructor() {}

  ngOnInit() {
    this.player=new Giocatore('Julian');
  }

  public showMessage() {
    $(document).ready(function () {
      $(".chat").toggle();
    });
  }

  public hideMessage() {
    $(document).ready(function () {
      $(".chat").hide();
    });
  }
}
