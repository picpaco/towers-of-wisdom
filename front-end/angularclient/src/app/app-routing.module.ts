import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListagiocatoriComponent } from "./listagiocatori/listagiocatori.component";

import { LoginPageComponent } from "../app/login-page/login-page.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

import { LandingPageComponent } from "./landing-page/landing-page.component";
import { DemoComponent } from "./demo/demo.component";
import { RegoleGiocoComponent } from "./regole-gioco/regole-gioco.component";
import { MenuComponent } from "./game-menu/menu.component";
import { MatchPageComponent } from "./match-page/match-page.component";
import { LeaderboardPageComponent } from "./leaderboard-page/leaderboard-page.component";
import { FormuserComponent } from "./landing-page/formuser/formuser.component";
import { FormgiocatoreComponent } from "./formgiocatore/formgiocatore.component";
import { ListautentiComponent } from "./listautenti/listautenti.component";
import { ManoResolverService } from "./service/manoResolver.service";
import { AuthGaurdService } from "./service/auth-gaurd.service";
import { LogoutComponent } from "./logout/logout.component";
import { DatiPartitaResolverService } from "./service/Dati-partita.service";

const routes: Routes = [
  {
    path: "",
    component: LandingPageComponent,

    children: [
      { path: "login", component: LoginPageComponent },

      { path: "registrazione", component: FormuserComponent },
    ],
  },

  { path: "aggiungigiocatore", component: FormgiocatoreComponent },

  { path: "giocatori", component: ListagiocatoriComponent },

  { path: "listautenti", component: ListautentiComponent },

  { path: "demo", component: DemoComponent },

  {
    path: "menu-di-gioco",
    component: MenuComponent,
    canActivate: [AuthGaurdService],
  },

  { path: "regole", component: RegoleGiocoComponent },

  {
    path: "match",
    component: MatchPageComponent,
    resolve: { datiPartita: DatiPartitaResolverService },
    canActivate: [AuthGaurdService],
  },

  // { path: 'match', component: MatchPageComponent},

  {
    path: "classifica",
    component: LeaderboardPageComponent,
    canActivate: [AuthGaurdService],
  },

  {
    path: "logout",
    component: LogoutComponent,
    canActivate: [AuthGaurdService],
  },

  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [DatiPartitaResolverService],
})
export class AppRoutingModule {}
export const routingComponents = [
  ListagiocatoriComponent,
  FormgiocatoreComponent,
  MenuComponent,
  LoginPageComponent,
  PageNotFoundComponent,
  LandingPageComponent,
  RegoleGiocoComponent,
  MatchPageComponent,
  LeaderboardPageComponent,
  DemoComponent,
  FormuserComponent,
  ListautentiComponent,
  LogoutComponent,
];
