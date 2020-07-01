import { Component, OnInit } from '@angular/core';
import { Carta } from '../model/Carta';
import * as $ from "jquery";

@Component({
  selector: 'app-regole-gioco',
  templateUrl: './regole-gioco.component.html',
  styleUrls: ['./regole-gioco.component.css']
})
export class RegoleGiocoComponent implements OnInit {

  public torri: Array<Carta[]> = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined
  ];

  constructor() { }

  ngOnInit() {
    this.esempioTorri();
  }

/*Quadrato,Triangolo,Cerchio,Ancora */
  private esempioTorri() {
    let esempioTorre1:Carta[]=[
      new Carta("Quadrato","7"),
      new Carta("Quadrato","6"),
      new Carta("Quadrato","5"),
      new Carta("Quadrato","4"),
      new Carta("Quadrato","3"),
      new Carta("Quadrato","2"),
      new Carta("Quadrato","1"),
      new Carta("Quadrato","X2"),
  ]

  let esempioTorre2:Carta[]=[
    new Carta("Triangolo","7"),
    new Carta("Triangolo","5"),
    new Carta("Triangolo","3"),
    new Carta("Triangolo","1"),
    new Carta("Triangolo","X2"),
]

let esempioTorre3:Carta[]=[
  new Carta("Cerchio","3"),
  new Carta("Cerchio","2"),
  new Carta("Cerchio","1"),
  new Carta("Cerchio","X2"),
]

let esempioTorre4:Carta[]=[
  new Carta("Ancora","1"),
  new Carta("Ancora","X2"),
]

let esempioTorre5:Carta[]=[
  new Carta("Triangolo","4")
]

  this.torri[0]=esempioTorre1;
  this.torri[1]=esempioTorre2;
  this.torri[2]=esempioTorre3;
  this.torri[3]=esempioTorre4;
  this.torri[4]=esempioTorre5;
    this.torri.forEach((torre, indexTorre = 0) => {
      if (torre != undefined) {
        torre.forEach((carta, index = 0) => {
          let classe = carta.getSymbol();
          let valore = carta.getValue();
          let image = carta.getImage();
          $(document).ready(function () {
            $(".carte-delle-torri:eq(" + indexTorre + ") div:eq(" + index + ")")
              .css({ border: "1px solid white" })
              .addClass(classe)
              .text(valore);
            $(".carte-delle-torri:eq(" + indexTorre + ") img:eq(" + index + ")")
              .attr("src", "../../assets/images/" + image + ".png")
              .css({ visibility: "visible" });
          });
        });
      }
    });
  }

}
