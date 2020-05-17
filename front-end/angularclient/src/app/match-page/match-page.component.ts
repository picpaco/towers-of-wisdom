import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";

@Component({
  selector: "app-match-page",
  templateUrl: "./match-page.component.html",
  styleUrls: ["./match-page.component.css"],
})
export class MatchPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

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
