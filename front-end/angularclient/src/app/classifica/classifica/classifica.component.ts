import { Component, OnInit } from "@angular/core";
import { EmailValidator } from "@angular/forms";
import { getMaxListeners } from "process";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-classifica',
  templateUrl: './classifica.component.html',
  styleUrls: ['./classifica.component.css']
})
export class ClassificaComponent implements OnInit {

  constructor( private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

}
