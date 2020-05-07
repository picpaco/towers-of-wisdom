import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListagiocatoriComponent } from './listagiocatori/listagiocatori.component';
import { FormgiocatoreComponent } from './landing-page/formgiocatore/formgiocatore.component';

import { LoginPageComponent } from './landing-page/login-page/login-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { DemoComponent } from './demo/demo.component';
import { RegoleGiocoComponent } from './regole-gioco/regole-gioco.component';
import {  GameComponent } from './game-menu/game.component'
import { MatchPageComponent } from './match-page/match-page.component';




const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,

    children:[

      {path:'login', component: LoginPageComponent}, 

      {path:'registrazione', component: FormgiocatoreComponent},

    ]
  },

  { path: 'giocatori', component: ListagiocatoriComponent },

  { path: 'demo', component:DemoComponent },

  { path: 'menu di gioco', component: GameComponent},

  { path: 'regole', component: RegoleGiocoComponent },

  { path: 'match', component: MatchPageComponent},
 
  { path: '**', component: PageNotFoundComponent}
];




@NgModule({
  imports: [RouterModule.forRoot(routes), ],
  exports: [RouterModule],
})



export class AppRoutingModule { }
export const routingComponents = [ListagiocatoriComponent, 
                                  FormgiocatoreComponent, 
                                  GameComponent,
                                  LoginPageComponent,
                                  PageNotFoundComponent,
                                  LandingPageComponent,
                                  RegoleGiocoComponent,
                                  MatchPageComponent,
                                  DemoComponent,
                                  ]
