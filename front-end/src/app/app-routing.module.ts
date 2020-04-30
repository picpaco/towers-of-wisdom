import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListagiocatoriComponent } from './listagiocatori/listagiocatori.component';
import { FormgiocatoreComponent } from './formgiocatore/formgiocatore.component';
const routes: Routes = [
  { path: 'giocatori', component: ListagiocatoriComponent },
  { path: 'aggiungigiocatore', component: FormgiocatoreComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
