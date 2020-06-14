import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListagiocatoriComponent } from './listagiocatori/listagiocatori.component';

import { LoginPageComponent } from './landing-page/login-page/login-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { DemoComponent } from './demo/demo.component';
import { RegoleGiocoComponent } from './regole-gioco/regole-gioco.component';
import { MenuComponent } from './game-menu/menu.component'
import { MatchPageComponent } from './match-page/match-page.component';
import { LeaderboardPageComponent } from './leaderboard-page/leaderboard-page.component'
import { FormuserComponent } from './landing-page/formuser/formuser.component';
import { FormgiocatoreComponent } from './formgiocatore/formgiocatore.component';
import { ListautentiComponent } from './listautenti/listautenti.component';
import { MazzoResolverService } from './service/manoResolver.service';




const routes: Routes = [
  
  {
    path: '',
    component: LandingPageComponent,

    children:[

      {path:'login', component: LoginPageComponent}, 

      {path:'registrazione', component: FormuserComponent},

    ]
  },

  { path: 'aggiungigiocatore', component: FormgiocatoreComponent},

  { path: 'giocatori', component: ListagiocatoriComponent },

  { path: 'listautenti', component: ListautentiComponent },

  { path: 'demo', component:DemoComponent },

  { path: 'menu-di-gioco', component: MenuComponent},

  { path: 'regole', component: RegoleGiocoComponent },

   { path: 'match', component: MatchPageComponent, resolve: { manoProva: MazzoResolverService} },

  // { path: 'match', component: MatchPageComponent },

  { path: 'risultati-finali', component: LeaderboardPageComponent},
 
  { path: '**', component: PageNotFoundComponent}

];



@NgModule({
  imports: [RouterModule.forRoot(routes), ],
  exports: [RouterModule],
})



export class AppRoutingModule { }
export const routingComponents = [ListagiocatoriComponent, 
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
                                  ListautentiComponent
                                  ]


                                  
// const routes: Routes = [
//   { path: 'users', component: UsersComponent, resolve: { users: UserResolverService } }
//   ];
//   @NgModule({
//     imports: [
//     CommonModule,
//     FormsModule,
//     HttpClientModule,
//     RouterModule.forRoot(routes)],
//     exports: [RouterModule]
//   })
//   export class AppRoutingModule { }