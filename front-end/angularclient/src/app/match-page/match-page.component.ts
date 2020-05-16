import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";

@Component({
  selector: "app-match-page",
  templateUrl: "./match-page.component.html",
  styleUrls: ["./match-page.component.css"],
})
export class MatchPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    $(document).ready(function () {
      $(".chat").hide();

      $("button i.fa-comment-dots").click(function () {
        $(".chat").show();
      });

      $(".chat button.close-chat").click(function () {
        $(".chat").hide();
      });
    });
  }
}
