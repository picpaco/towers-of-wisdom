import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { LandscapeComponent } from './landscape/landscape.component';

import { ListagiocatoriComponent } from './listagiocatori/listagiocatori.component';
import { FormgiocatoreComponent } from './formgiocatore/formgiocatore.component';

const routes: Routes = [
  { path: 'login.component.html', component: LoginComponent },
  { path: 'landscape.component.html', component: LandscapeComponent },

  { path: 'giocatori', component: ListagiocatoriComponent },
  { path: 'aggiungigiocatore', component: FormgiocatoreComponent },
];

// configures NgModule imports and exports

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingRoutes {}
