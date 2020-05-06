import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListagiocatoriComponent } from './listagiocatori/listagiocatori/listagiocatori.component';
import { FormgiocatoreComponent } from './formgiocatore/formgiocatore.component';

@NgModule({
  declarations: [
    AppComponent,
    ListagiocatoriComponent,
    FormgiocatoreComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
