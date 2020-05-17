import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
declare const chat:any;


@Component({
  selector: "app-match-page",
  templateUrl: "./match-page.component.html",
  styleUrls: ["./match-page.component.css"],
})
export class MatchPageComponent implements OnInit {
  constructor() {}

  jQuerychat(){
    chat();
  }

  ngOnInit() {
    $(document).ready(function () {
      $(".chat").hide();
    });
  }
}
